#!/usr/bin/env python3
import os

import aws_cdk as cdk

from cloud_cdk.cloud_cdk_stack import CloudFrontCdkStack
from cloud_cdk.cloud_cdk_stack_backend import CloudBackCdkStack


# TODO: Update account id 
account_id = ''

app = cdk.App()
CloudFrontCdkStack(app, "CloudCdkStack", env=cdk.Environment(account=account_id, region='us-east-1'))
CloudBackCdkStack(app, "CloudBackCdkStack", env=cdk.Environment(account=account_id, region='us-east-1'))

app.synth()
