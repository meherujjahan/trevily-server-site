const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
require('dotenv').config()
const app = express()
const ObjectId = require('mongodb').ObjectId;
const port =process.env.PORT || 5000

//middleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daplg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
console.log(uri)
client.connect(err => {
    //console.log()
  const collection = client.db("test").collection("devices");
 
  //client.close();
});

app.get('/', (req, res) => {
  res.send('Hello  World! ??????')
})

app.listen(port, () => {
  console.log(` listening on port`, port)
})