import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "aws-cloud-database-test";

export const handler = async (event, context) => {
    let body, user, requestJSON;
    let statusCode = 200;
    const headers = { "Content-Type": "application/json" };

    try {
    switch (event.routeKey) {
        case "DELETE /user/{username}":
            await dynamo.send(
                new DeleteCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            body = `Deleted item ${event.pathParameters.username}`;
            break;

        case "GET /user/{username}":
            body = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            body = body.Item;
            break;
            
        case "GET /users/{usernames}":
            requestJSON = JSON.parse(event.pathParameters.usernames);
            body = await dynamo.send(
                new ScanCommand({ TableName: tableName })
            );
            body = body.Items.filter((user) => requestJSON.includes(user.username));
            break;

        case "GET /allusers":
            body = await dynamo.send(
                new ScanCommand({ TableName: tableName })
            );
            body = body.Items.map((details) => details.username);
            break;

        case "GET /login/{username}/{password}":
            body = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            body = body.Item.password === event.pathParameters.password ? body.Item : (statusCode = 401);
            break;
            
        case "POST /addfriend/{username}/{friend}":
            // Updating user
            user = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            user.Item['friends'].push(event.pathParameters.friend);
            await dynamo.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        ...user.Item,
                    },
                })
            );
            
            // Updating friend
            user = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.friend,
                    },
                })
            );
            user.Item['friends'].push(event.pathParameters.username);
            await dynamo.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        ...user.Item,
                    },
                })
            );
            
            
            break;     

        case "POST /removefriend/{username}/{friend}":
            // Updating user
            user = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            user.Item['friends'] = user.Item['friends'].filter(x => x != event.pathParameters.friend);
            await dynamo.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        ...user.Item,
                    },
                })
            );
            
                        
            // Updating friend
            user = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.friend,
                    },
                })
            );
            user.Item['friends'] = user.Item['friends'].filter(x => x != event.pathParameters.username);
            await dynamo.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        ...user.Item,
                    },
                })
            );
            break;

        case "PUT /user":
            requestJSON = JSON.parse(event.body);
            await dynamo.send(
                new PutCommand({
                    TableName: tableName,
                    Item: {
                        ...requestJSON,
                    },
                })
            );
            body = `Put item ${requestJSON.username}`;
            break;
        default:
            throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
