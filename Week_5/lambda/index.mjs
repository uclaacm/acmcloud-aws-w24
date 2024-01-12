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
    let body, user;
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

        case "GET /allusers":
            body = await dynamo.send(
                new ScanCommand({ TableName: tableName })
            );
            body = body.Items;
            break;

        case "GET /login/{username}/{password}":
            const response = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
                    },
                })
            );
            
            body = { 'valid': response.Item['password'] === event.pathParameters.password ? true : false };
            break;
        case "POST /addfriend/{username}/{friend}":
            user = await dynamo.send(
                new GetCommand({
                    TableName: tableName,
                    Key: {
                        username: event.pathParameters.username,
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
            const user = await dynamo.send(
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
            break;

        case "PUT /user":
            let requestJSON = JSON.parse(event.body);
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
