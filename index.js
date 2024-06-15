const express = require("express")
const AWS = require("aws-sdk")
// import AWS from "aws-sdk"
const { DynamoDBClient, ListBackupsCommand, DynamoDB, ScanCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
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
        
    }
});

const DB = DynamoDBDocumentClient.from(client)

// console.log(DB);
AWS.config.update({
    accessKeyId: 'AKIAZQ3DUD2OQZLANC5O',
    secretAccessKey: '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',
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

app.get("/users", async (req, res) => {
    const params = {
        TableName: "blog-site"
    }
    const data = await db.scan(params).promise()

    res.send(data)
})

app.get('/user', async(req,res)=>{
    const params = new ScanCommand({
        TableName : "test-blog"
    })
    const data = await DB.send(params)
    res.send(data)
})

// getData()

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})