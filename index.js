const express = require("express")
const AWS = require("aws-sdk")
const app = express()
const port = 2000;
app.use(express.json())

app.get("/", async (req, res) => {
    res.send({ message: "welcome to our server" })
})


const DB = AWS.config.update({
    accessKeyId: 'AKIAZQ3DUD2OQZLANC5O',
    secretAccessKey: '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',
    region: "us-east-1",
})

// if(DB?.connect){
//     console.log("connected to dynamoDB")
// }

const db = new AWS.DynamoDB.DocumentClient();

app.get("/users", async(req,res)=>{
    const params = {
        TableName : "blog-site"
    }

    const data = await db.get(params).promise()
    console.log(data);
    res.send(data)

})



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})