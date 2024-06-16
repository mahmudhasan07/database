const express = require("express")
const AWS = require("aws-sdk")
require('dotenv').config()
// import AWS from "aws-sdk"
const { DynamoDBClient, ListBackupsCommand, DynamoDB, ScanCommand, GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
// const { DynamoDBDocumentClient, GetCommand, DynamoDBDocument, PutCommand } = require("@aws-sdk/lib-dynamodb");
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
// const { EC2 } = require('@aws-sdk/client-ec2');
const app = express()
const port = 2000;
app.use(express.json())

app.get("/", async (req, res) => {
    res.send({ message: "welcome to our server" })
})

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.API_KEY,
        secretAccessKey: process.env.ACCESS_KEY,
    }
});

// const DB = DynamoDBClient.from(client)
// console.log(process.env.API_KEY);

// console.log(DB);
AWS.config.update({
    accessKeyId: process.env.API_KEY,
    secretAccessKey: process.env.ACCESS_KEY,
    region: "us-east-1",
})

// if(DB?.connect){
//     console.log("connected to dynamoDB")
// }

const db = new AWS.DynamoDB.DocumentClient();

// app.get("/users", async (req, res) => {
//     const params = new ScanCommand({
//         TableName: "blog-site",
//     });

//     const data = await DB.send(params)
//     // console.log(data);
//     res.send(data)

// })

// app.get("/users/:id", async (req, res) => {
//     const id = req.params.id

//     res.send(data)

// })


const getData = async () => {
    // const params = new GetCommand({
    //     TableName: "blog-site",
    //     Key: { Id: { S: "01" } }
    // });

    // const params = new GetCommand({
    //     TableName: "test-blog",
    //     Key : {
    //         nodeId : {S : "11"}
    //     }

    // })

    const params = {
        TableName: "test-blog",
    }

    const data = await db.scan(params).promise()
    console.log(data);
}

// getData()

app.get("/users", async (req, res) => {
    const params = {
        TableName: "blog-site"
    }
    const data = await db.scan(params).promise()

    res.send(data)
})

app.post('/users', async (req, res) => {
    const body = req.body
    // console.log(body);
    const params = {
        TableName: "blog-site",
        Item: body
    }
    const data = await db.put(params).promise()
    console.log(data);
    res.send(data)
})

app.get('/user', async (req, res) => {
    const params = new ScanCommand({
        TableName: "test-blog"
    })
    const data = await client.send(params)
    res.send(data)
})

app.post("/user", async(req,res)=>{
    const body = req.body
    const params = new PutItemCommand({
        TableName : "test-blog",
        Item : body
    })
    
})



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})