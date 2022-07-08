// Source: https://github.com/ahmedelamine/nodejs-dynamoDB/blob/main/lib/ddbDocClient.js

const { config } = require("dotenv");
config();

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = "us-east-1";

const dbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

module.exports = dbClient;