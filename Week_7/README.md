# Week 7: Databases and Serverless

In this tutorial, we'll be implementing the back-end of our full-stack application, making use of DynamoDB as a non-relational, NoSQL database solution, and using Lambda and API Gateway as an API for our database. Finally, we'll be modifying our front-end code from earlier weeks to use our new back-end implementation.

This tutorial was adapted from AWS's [documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) for creating a serverless API.

## Creating a DynamoDB Table

To create our database with DynamoDB, we'll take the following steps

1. Open the DynamoDB [console](https://console.aws.amazon.com/dynamodb/)
2. Choose **Create table**
3. Give your table a name, and for Partition key, enter `username`
4. Click **Create table**

## Using Lambda as an API

Before we can set up our deployment CI/CD, we first need to create an Elastic Container Registry to host our built image within AWS. To do so, we take the following steps

1. Sign in to the Lambda console at https://console.aws.amazon.com/lambda.
2. Click **Create function** and give your function a name
3. Under Permissions choose **Change default execution role**
4. Select **Create a new role** from AWS policy templates
5. Give your role a name and select **Simple microservice permissions**
6. Click **Create function**
7. Open the `index.mjs` file in the browser text editor. Paste in the content from the `/lambda/index.mjs` file in this repo
8. Click **Deploy** to save the changes

## Using API Gateway for API Routing

Finally for this tutorial we'll be making use of another AWS service to act as an endpoint for our Lambda function. Although it's possible to use Lambda as an endpoint directly, using API Gateway allows AWS to handle balancing requests and 

1. Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway.
2. Choose **Create API**, and then for HTTP API, choose **Build**
3. Give your API a name and click **Next**
4. Click **Next** to skip configuring routes, and **Next** to leave the default stage unchanged
5. Choose **Create** to create your API Gateway
6. Select the API you just created, and select **Routes**
7. Click **Create**  to create a new route
8. Select `PUT` for the method and enter `/user/{username}` for the path
9. Click **Create**
10. Repeat steps 7, 8, and 9 for the following routes
    * `DELETE` request, with path `/user/{username}`
    * `PUT` request, with path `/user`
    * `GET` request with path `/users/{usernames}`
    * `POST` request with path `/removefriend/{username}/{friend}`
    * `POST` request with path `/addfriend/{username}/{friend}`
    * `GET` request with path `/login/{username}/{password}`
    * `GET` request with path `/allusers`

Now that we've created our routes, we'll need to connect API Gateway to our Lambda function with the following steps

1. Select **Integrations**, then select **Manage integrations** and **Create**
2. Skip Attach this integration to a route. You complete that in a later step.
3. For Integration type, choose **Lambda function** and select the Lambda function created earlier in this tutorial
4. Click **Create**
5. Under the Integrations page, select the `/users/{usernames}` route
6. Select the Lambda integration from the Choose an existing integration dropdown and press  **Attach integration**
7. Repeat step 6 for all the other routes

## Connecting to API Gateway from React

Now that we've got our backend up and running, let's look at the changes made to connect to it from our react site.

* `src/profiles.js` - this file has been modified to contain a series of calls to the API
* `src/pages/Login.jsx`, `src/pages/Signup.jsx` - these files call a new function in the `profile.js` file to attempt to login/signup
* `src/pages/Home.jsx`, `src/components/friendTiles.jsx` - these files now make use of the useEffect Hook to update data

## Additional Resources
* AWS back-end [tutorial](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)
* Using React useState() and useEffect [Hooks](https://react.dev/reference/react)
* DynamoDB [documentation](https://docs.aws.amazon.com/dynamodb/)
* Lambda [documentation](https://aws.amazon.com/lambda/)
* API Gateway [documentation](https://aws.amazon.com/api-gateway/)