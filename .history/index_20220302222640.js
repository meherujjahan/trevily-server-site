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
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const query = { _id: ObjectId(id) };
      const course = await serveCollection.findOne(query)
      res.json(course)
  })

    //insert one data
    app.post('/serve', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order)
      res.json(result)
    })

    //api get for order
    app.get('/myOrder', async (req, res) => {
      const cursor = orderCollection.find({});
      const myorder = await cursor.toArray();
      res.send(myorder)
    })
   //  DELETE ORDER 
   app.delete('/myOrder/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const result = await orderCollection.deleteOne(query)
    console.log('delete user', result)
    res.json(result)
    })
    app.post('/services', async (req, res) => {
      const service = req.body;
      const result = await serveCollection.insertOne(service)
      console.log('yahoo', result)
      res.json(result)
  })

  // update approve
  app.put('/myOrder/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const course = {
        $set: {
            status: 'Approved'
        },
    };
    const result = await orderCollection.updateOne(query, course)
    res.json(result)
    console.log(result)
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