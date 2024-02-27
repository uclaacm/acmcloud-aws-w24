from aws_cdk import (
    aws_codepipeline as codepipeline,
    aws_codepipeline_actions as actions,
    aws_codebuild as codebuild,
    aws_ecr as ecr,
    aws_elasticbeanstalk as eb,
    aws_iam as iam,
    Stack,
    SecretValue
)
from constructs import Construct

# TODO: Update these values
ACCOUNT_ID = ''
GITHUB_OWNER = ''
GITHUB_REPO = ''

class CloudFrontCdkStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create ECR repo
        self.ecr_repo = ecr.Repository(
            self,
            id='cdk-cloud-ecr-repo',
        )

        # Create GitHub Authentication connection (note: must manually initialize token)
        self.github_credentials = codebuild.GitHubEnterpriseSourceCredentials(
            self, 
            'cdk-cloud-git-token', 
            access_token=SecretValue.secrets_manager("cdk-cloud-token", json_field="token")
        )

        # Create GitHub repo connection details
        github_connection = codebuild.Source.git_hub(
            owner=GITHUB_OWNER,
            repo=GITHUB_REPO,
            webhook=True,
            webhook_filters=[
                codebuild.FilterGroup.in_event_of(codebuild.EventAction.PUSH).and_branch_is("main")
            ],
        )

        # Create CodeBuild execution role
        codebuild_role = iam.Role(
            self,
            'cdk-cloudbuild-role',
            assumed_by=iam.ServicePrincipal("codebuild.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name("AWSCodeBuildAdminAccess"),
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonS3FullAccess"),
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonEC2ContainerRegistryFullAccess"),
            ]
        )

        # Create CodeBuild project with GitHub repo connection
        self.codebuild = codebuild.Project(
            self,
            id="cdk-cloud-codebuild-project",
            project_name="cdk-cloud-codebuild",
            source=github_connection,
            build_spec=codebuild.BuildSpec.from_source_filename("Week_8/buildspec.yml"),
            environment_variables={
                'AWS_DEFAULT_REGION': codebuild.BuildEnvironmentVariable(value='us-east-1'),
                'AWS_ACCOUNT_ID': codebuild.BuildEnvironmentVariable(value=ACCOUNT_ID),
                'IMAGE_TAG': codebuild.BuildEnvironmentVariable(value='latest'),
                'IMAGE_REPO_NAME': codebuild.BuildEnvironmentVariable(value=self.ecr_repo.repository_name)
            },
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.AMAZON_LINUX_2_5
            ),
            role=codebuild_role
        )

        # # Create EB execution role
        # eb_role = iam.Role(
        #     self,   
        #     'cdk-eb-role',
        #     assumed_by=iam.ServicePrincipal("codebuild.amazonaws.com"),
        #     managed_policies=[
        #         iam.ManagedPolicy.from_aws_managed_policy_name("AWSElasticBeanstalkWebTier"),
        #         iam.ManagedPolicy.from_aws_managed_policy_name("AWSElasticBeanstalkWorkerTier"),
        #         iam.ManagedPolicy.from_aws_managed_policy_name("AWSElasticBeanstalkMulticontainerDocker"),
        #     ]
        # )
        # eb_instance_profile = iam.CfnInstanceProfile(self, id='acm-cloud-instance-profile', roles=[eb_role.role_name])

        # # TODO: Create default Elastic Beanstalk Docker Environment (here's a start)
        # self.cfn_application = eb.CfnApplication(self, "acm-cloud-eb-app", application_name="acm-cloud-eb-app")

        # self.cfn_environment = eb.CfnEnvironment(self, "acm-cloud-eb-env",
        #     application_name=self.cfn_application.application_name,
        #     option_settings=[eb.CfnEnvironment.OptionSettingProperty(
        #         namespace="aws:autoscaling:launchconfiguration",
        #         option_name="IamInstanceProfile",
        #         value=eb_instance_profile.attr_arn
        #     )],
        #     solution_stack_name="64bit Amazon Linux 2023 v4.2.2 running Docker",
        # )

        # # TODO: Creating CI/CD Pipeline (here's a start)
        # self.codepipeline = codepipeline.Pipeline(self, "cdk-cloud-code-pipeline")
        # self.codepipeline.add_stage(
        #     stage_name="cdk-pipeline-pull-code",
        #     actions=actions.GitHubSourceAction(
        #         oauth_token=SecretValue.secrets_manager("cdk-cloud-token", json_field="token"),
        #         owner=GITHUB_OWNER,
        #         repo=GITHUB_REPO,
        #     )
        #     output=
        #     action_name=""
        # )
        # # TODO: Make sure that artifacts are passed forward
        # self.codepipeline.add_stage(
        #     stage_name="cdk-pipeline-build",
        #     actions=actions.CodeBuildAction(
        #         action_name="cdk-pipeline-build-action",
        #         project=self.codebuild,
        #     )
        # )
        # self.codepipeline.add_stage(
        #     stage_name="cdk-pipeline-eb-deploy",
        #     actions=actions.ElasticBeanstalkDeployAction(
        #         application_name=""
        #     )
        # )