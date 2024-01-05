# Week 2: Using a Virtual Machine

In this tutorial, we'll be creating a React site locally, then deploying it using an EC2 virtual machine, and nginx as a proxy server.

## Running a Custom Website Locally

Before beginning, be sure to install [Node](https://nodejs.org/) and a [text editor](https://code.visualstudio.com/) of your choice. For this tutorial, we'll be using React to create a website - to follow along, either clone this repo or follow the steps below

1. Run the command `npm create vite@latest` in your project directory
2. Give your project a name when prompted (ex: ec2-react-demo)
3. Select `React` as the project framework
4. Select `JavaScript` as the framework variant

After acquiring the site code, you'll need to run `npm install` to install the site dependencies. Finally, to test the site locally, run `npm run dev` and navigate to the link provided (CTRL + Click).

## Deploying Our Website With Amazon EC2

Before starting, you'll need to create an [AWS Account](https://portal.aws.amazon.com/billing/signup#/start/email) - we'll use this account in future weeks as well. All resources provisioned in this tutorial are covered under the AWS Free Tier, but be sure to **clean up your resources** after completing the following steps.

1. Sign in to the [AWS Portal](https://signin.aws.amazon.com/)
2. Click on the **Services** menu and search for **EC2**
3. Click the orange **Launch instance** button
4. Provide your EC2 instance a name (ex: acmcloud-ec2-react)
5. Under Key Pair, select **Proceed without a key pair** (or optionally create a new key pair to SSH with)
6. Under Network Settings check **Allow HTTP traffic from the internet** and **Allow HTTPS traffic from the internet**
7. Click **Launch instance**

After you instance has transitioned from the **Provisioning** to **Running** state, we can proceed to add our required dependencies to the Virtual Machine with the following steps

1. Click on the instance's instance ID, then click the **Connect** button in the top right
2. Under the EC2 Instance Connect panel, click **Connect** (this allows us to SSH with our AWS credentials and browser - an alternative is to use an SSH key pair and connect locally)
3. Run `sudo yum update` to update the packages of the EC2 instance
4. Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash` to install node version manager (nvm)
5. Run `. ~/.nvm/nvm.sh`, then `nvm install --lts` to install the latest version of node
6. Run `sudo yum install git` to install git on our EC2 instance

Finally, we can proceed to pulling in our site code and setting up a proxy server as follows

1. Run `git clone https://github.com/uclaacm/acmcloud-aws-w24.git` to clone our custom website (alternatively, clone your own public repo)
2. Run `cd acmcloud-aws-w24` to move into the new directory, and run `npm install` to install the site dependencies
3. Run `npm run build` to create a production build of the site under a new `dist/` directory 
4. Create a target hosting directory by running `sudo mkdir /var/cloud-react`
5. Copy over our production build by running `sudo cp -R dist/ /var/cloud-react/`
6. Install the nginx proxy server by running `sudo yum -y install nginx`
7. Open the nginx proxy server configuration file by running `sudo nano /etc/nginx/nginx.conf` and replace the `server` section with the following code (or use the full `nginx.conf` file in this repo)

```Nginx
server {
    listen       80;
    listen       [::]:80;
    root         /var/cloud-react/dist;
    
    location / {
        try_files $uri /index.html;
    }
}
```
8. Start the nginx proxy server by running `sudo systemctl start nginx`

After completing these steps, return to the EC2 instance console page and navigate to the **private IP** to view the deployed site. Be sure to use `http` instead of `https` since we have not set up an SSL Certificate. 

## Additional Resources
* Node + Vite [quickstart](https://vitejs.dev/guide/)
* Installing Node on EC2 [documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)
