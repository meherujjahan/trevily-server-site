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

async function run() {
  try {
      await client.connect()
      // console.log('connect')
      const database = client.db('travel_service');
      const serveCollection = database.collection('services');
      const orderCollection = database.collection('orders');
      //insert all data

    app.get('services', async (req, res)=>{
      const cursor = serveCollection.find({});
      const services = await cursor.toArray();
      res.send(services)
    })
    //insert one data
    app.get('/services', async (req, res) => {
      const cursor = serveCollection.find({});
      const services = await cursor.toArray();
      res.send(services)
    })
      
  }
  finally{
    //await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello  World! ??????')
})

app.listen(port, () => {
  console.log(` listening on port`, port)
})