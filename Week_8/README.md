# Week 8: Infrastructure as Code


In this tutorial, we'll be translating the front end of our app to use AWS's Cloud Development Kit (CDK). To do so, we choose to leverage AWS's python Software Development Kit (SDK) - so write out application infrastructure using python.

## Setting up for Local Development

In order to run our code locally, you'll need to have a working version of [Python](https://www.python.org/downloads/) and will need to install the AWS Python [SDK](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html) with python. We recommend creating a python virtual environment in the project directory and installing your dependencies there.

Once you've set up your local environment, you'll need to create a new AWS User to represent your local computer - this will allow your computer to make API calls to AWS (similarly to how you click buttons on the AWS console), and to create, edit, and delete services. 

1. Navigate to the IAM page after signing into the AWS console
2. Click on **Users** on the left panel, then click **Create user**
3. Give your new user a name like `admin_cdk` and click **Next**
4. Select the radio button for **Attach policies directly** and check the box next to the `AdministratorAccess` policy
5. Finally, click **Next** and **Create user** to create the new user

Now that we have a new user, we have to store it's authentication details on your local computer, which is achievable with the following steps

1. Click on your newly created user and open the **Security credentials** tab
2. Scroll down and click **Create access key**. Select **Command Line Interface (CLI)** and click **Next** twice
3. Copy the Access key and Secret access key values and click **Next**
4. Open the `~/.aws/config` file on your computer - note that this will be in your home directory (likely under your user folder)
5. Paste the following code into the file after replacing the two indicated fields

```
[dev-admin]
aws_access_key_id=[REPLACE WITH ACCESS KEY]
aws_secret_access_key=[REPLACE WITH SECRET ACCESS KEY]
```
6. Finally, to get started with CDK, run the following command in a terminal `npm install -g aws-cdk`
7. Confirm the installation by running `cdk --version`

## Deploying the App with CDK

Now that we've configured our local environment, we'll go ahead and configure our application to run in our AWS account with the following steps

1. Update the `ACCOUNT_ID`, `GITHUB_OWNER`, and `GITHUB_REPO` in the `Week_8/cloud_cdk/cloud_cdk/cloud_cdk_stack.py` file with your account details and forked version of this repo
2. Update the `ACCOUNT_ID` in the `Week_8/cloud_cdk/app.py` folder with your account details

Now, we'll go ahead and spin up our resources with the following steps

1. Open the `Week_8/cloud_cdk` folder in a terminal and run the command `cdk bootstrap --profile dev-admin`
2. Run the command `cdk deploy --all --profile dev-admin` to create both our front and back end

After the command has finished running, we can navigate to AWS and see that most of our resources have been created (in this case we are not using CodePipeline due CDK limitations). To spin up our site, simply trigger a new build with the CDK CodeBuild project and create a new Elastic Beanstalk instance with a Dockerfile, referencing the CDK ECR Repository. 

Finally, we can clean up our resources by running the command `cdk destroy --all --profile dev-admin`