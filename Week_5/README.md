# Week 5: Continuous Integration and Deployment

In this tutorial, we'll be switching over from using DockerHub to using AWS's Elastic Container Registry service to host our container. We'll also be automating our deployment process using AWS Code Build and AWS Code Pipeline, allowing us to commit a change to our github repo and (after a couple minutes) see it reflected in our live site.

## Using Elastic Container Registry to Store Images

Before we can set up our deployment CI/CD, we first need to create an Elastic Container Registry to host our built image within AWS. To do so, we take the following steps

1. Open the AWS console and navigate to the ECR page
2. Click **Get started** under Create a repository
3. Give your repo a name (which will be the suffix to an AWS prefix) - you'll need this name later
4. Click **Create repository**
5. Fork a copy of this repo into your own GitHub account - this will let you commit modifications and see them deployed later
6. In the forked repo, replace the `[ACCOUNT ID]` and `[IMAGE REPO NAME]` fields in the `Dockerrun.aws.json` file and commit the change

## Using CodeBuild to Build Images

The following steps detail how we can automate the containerization and storage of our website.

1. Open the AWS console and navigate to the CodeBuild page
2. Click **Create project** button under Create AWS CodeBuild project
3. Give your project a name
4. Under Source, select `GitHub` under the dropdown menu
5. Select **Public repository** and authenticate with OAuth
6. Paste the repository url in the field, in our case `https://github.com/[Your Username]/acmcloud-aws-w24`
7. Under Environment select `Amazon Linux` as the Operating system, `Standard` for the runtime, and `aws/codebuild/amazonlinux2-x86_64-standard:5:0` for the image
8. Leave **New service role** selected and give the role a name (we'll need to add a permission to this in a second)
9. Expand the Additional configuration menu and add the following Environment variables
    * `AWS_DEFAULT_REGION`: `us-east-1`
    * `AWS_ACCOUNT_ID`: Enter your account id (you can find this by clicking your account name in the top right)
    * `IMAGE_TAG`: `latest`
    * `IMAGE_REPO_NAME`: Enter the repo name from the ECR steps
10. Under Buildspec, provide the Buildspec name as `Week_5/buildspec.yml`
11. Click **Create build project** to create the build project
12. After the project provisions, click on the build, navigate to the Build details tab, and scroll and click on the Service role
13. Add the `AmazonEC2ContainerRegistryFullAccess` AWS managed policy to the IAM role
14. Return to the build project and click `Start build` to manually trigger the build and confirm configuration

## Using CodePipeline to Deploy Images

Now that we are hosting our images with AWS, we can proceed to create an automate the deployment process when a new commit is detected in the GitHub repo.

1. Open the AWS console and navigate to the CodePipeline page
2. Click **Create pipeline** and give your pipeline a name
3. Leave **New service role** selected and give your service role a name
4. Under Source, select `GitHub (Version 1)` as the provider and authenticate with OAuth
5. Select the relevant repo and bracnch (for us `uclaacm/acmcloud-aws-w24` and the `main` branch), then click **Next**
6. Select `AWS CodeBuild` as the build provider, and select the build project created in the previous steps. then click **Next**
7. Select `AWS Elastic Beanstalk` as the deploy provider, and select the application and environment from "Week_3"
8. Click **Next** then scroll to the bottom of the screen and click **Create pipeline**
9. Return to the Elastic Beanstalk console and click **Configuration** for your environment to view your Service role. Find the Service role in IAM and add the `AmazonEC2ContainerRegistryFullAccess` permission to it
10. Navigate to the CodePipeline page. Then, commit a change to the linked GitHub repo and confirm the Source, Build, and Deploy steps function properly. Finally, view the updated site in the browser


## Additional Resources
* Docker [guide](https://docker-curriculum.com/)
* Using Docker with Elastic Beanstalk [documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html)
* AWS CodeBuild buildspec [reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
* AWS CodeBuild [example](https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html#sample-docker-files)
* Public AWS ECR image [gallery](https://gallery.ecr.aws/)
