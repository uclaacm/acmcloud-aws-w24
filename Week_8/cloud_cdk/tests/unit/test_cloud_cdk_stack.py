import aws_cdk as core
import aws_cdk.assertions as assertions

from cloud_cdk.cloud_cdk_stack import CloudCdkStack

# example tests. To run these tests, uncomment this file along with the example
# resource in cloud_cdk/cloud_cdk_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = CloudCdkStack(app, "cloud-cdk")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
