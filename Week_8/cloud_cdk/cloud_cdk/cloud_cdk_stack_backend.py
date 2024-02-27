from aws_cdk import (
    aws_apigatewayv2 as api,
    aws_apigatewayv2_integrations as integrations,
    aws_lambda,
    aws_dynamodb as dynamodb,
    aws_iam as iam,
    Stack,
)
from constructs import Construct

class CloudBackCdkStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create DynamoDB Table
        self.table = dynamodb.Table(self, 
                                    "acm-cloud-table", 
                                    table_name="aws-cloud-database-test", 
                                    partition_key=dynamodb.Attribute(name="username", type=dynamodb.AttributeType.STRING))

        # Create Lambda Role
        lambda_role = iam.Role(
            self,
            'cdk-lambda-role',
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name("AWSLambda_FullAccess"),
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonDynamoDBFullAccess"),
            ]
        )

        # Create Lambda Function
        self.lambda_fn = aws_lambda.Function(self,
                                             "acm-cloud-lambda",
                                             role=lambda_role,
                                             runtime=aws_lambda.Runtime.NODEJS_LATEST,
                                             handler='index.handler',
                                             code=aws_lambda.Code.from_asset('dynamo-handler'))

        # Create Lambda Integration for API
        self.api_integration = integrations.HttpLambdaIntegration("acm-cloud-api-lambda", handler=self.lambda_fn)

        # Create API Gateway
        self.gateway = api.HttpApi(self, "acm-cloud-http-api")
        self.gateway.add_routes(methods=[api.HttpMethod.GET], path='/allusers', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.GET], path='/login/{username}/{password}', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.POST], path='/addfriend/{username}/{password}', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.POST], path='/removefriend/{username}/{password}', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.GET], path='/users/{usernames}', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.PUT], path='/user', integration=self.api_integration)
        self.gateway.add_routes(methods=[api.HttpMethod.DELETE, api.HttpMethod.GET], path='/user/{username}', integration=self.api_integration)
