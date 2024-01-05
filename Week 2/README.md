# Week 2: Management and Scaling with Elastic Beanstalk

In this tutorial, we'll be containerizing our React site (which has now been fleshed out a bit to resemble a sample full stack application), then deploying it using an Elastic Beanstalk. AWS's Elastic Beanstalk service will allow us to both load balance and scale our server, using EC2 virtual machines as the underlying compute resource.

## Dockerizing Our Site

Before beginning, be sure to install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and a [text editor](https://code.visualstudio.com/) of your choice. For this tutorial, we'll be containerizing the React website present in thie repo, but the following steps will work with any react site you've created (with minor modifications).

1. Open Docker Desktop (which will also run docker in the background). Create and login to your docker account through the UI (alternatively this can be done through the command line)
2. Navigate to your project directory.  Run `docker version` to confirm docker is running
3. Run `docker build -t [username]/[docker image name] .` to create an image (provide your own username and image name)
4. Run `docker image ls` to list all images on your device and confirm the image built successfully 
5. Run `docker run -p 3000:80 [username]/[docker image name]` to run the docker image you created locally as a container
6. Navigate to `localhost:3000` and view your site

Once we've created an image from our code, we'll want to share this image publically to be used. In our case, we'll use dockerhub (think github but for images instead of code), and will take the following steps.

1. Stop the container (if it's still running from before). This can be done with the `docker container stop [container id]` command or through docker desktop
2. Run the command `docker push [username]/[docker image name]` to push the image to dockerhub

## Deploying Our Website With Amazon Elastic Beanstalk

Before starting, you'll need to create an [AWS Account](https://portal.aws.amazon.com/billing/signup#/start/email) - or reuse the one you've created in the previous week. All resources provisioned in this tutorial are covered under the AWS Free Tier, but be sure to **clean up your resources** after completing the following steps. Before we work with Elastic Beanstalk, we'll have to create an IAM role with the following steps

1. Open the AWS console and navigate to the IAM page
2. Click the "Create role" button
3. Click "EC2" under use cases, then and click "next"
4. Add the `AWSElasticBeanstalkWebTier`, `AWSElasticBeanstalkWorkerTier`, and `AWSElasticBeanstalkMulticontainerDocker` permissions to the role. Then click "next"
5. Give your role a name (ex: EC2ElasticBeanstalkProfile)
6. Click "create role" at the bottom

Now we can take the following steps to provision our Elastic Beanstalk environment

1. Sign in to the [AWS Portal](https://signin.aws.amazon.com/)
2. Click on the **Services** menu and search for **Elastic Beanstalk**
3. Click the orange **Create environment** button
4. Provide your Elastic Beanstalk environment and application each names (ex: acm-cloud-demo)
5. Under Platform, select **Docker** from the dropdown menu
6. Under Application Code, select **Upload your code**, then click the **Local file** option
7. Click **Choose file** and upload the `Dockerrun.aws.json` file in the repo. This file specifies the docker image to use, as well as the port mapping
8. Scroll down and click **next**. Click "Create and use new service role"
9. Select the IAM Role you'd created from the EC2 instance profile dropdown
10. Click the "skip to review" button and press "submit"

After a couple minutes, your Elastic Beanstalk application should transition from the pending to the Ok state. Proceed to click the **Domain** listed and view the deployed application.

## Scaling with Elastic Beanstalk

Although load balancing is made simple with Elastic Beanstalk, doing so can exceed the free tier, so we'll just be discussing how it can be done below.

1. Scroll to the environment in the left panel and click **Configuration**
2. Under Instance traffic and scaling, note the Environment type is **Single instance**. By clicking edit, we have the option of changing this to **Load balanced**
3. With **Load balanced** selected, we can provide a minimum and maximum number of instances to scale between, as well as a variety of options to configure the trigger for scaling up and down

Notably another benefit of provisioning a load balancer, Elastic Beanstalk also makes registering an SSL certificate (required by sites that use `https` for security) simpler.

## Additional Resources
* Docker [guide](https://docker-curriculum.com/)
* Using Docker with Elastic Beanstalk [documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.html)
