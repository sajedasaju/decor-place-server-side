const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();


//middleware
app.use(cors());
app.use(express.json());
//user: decorPlaceUser
//password: t2SkuEAQoWy7OxIl



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.en8wd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db("decorPlace").collection('product');

        //find all inventories
        app.get('/inventory', async (req, res) => {
            const query = req.query;
            const cursor = inventoryCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)

        })

        //get inventory id wise
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const inventory = await inventoryCollection.findOne(query);

            res.send(inventory)
        })

        //delete single inventory
        app.delete('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await inventoryCollection.deleteOne(query);

            res.send(result)

        })

        //post or add inventory
        app.post('/inventory', async (req, res) => {
            const newInventory = req.body;
            const result = await inventoryCollection.insertOne(newInventory);
            res.send(result);
        })

        //update user
        app.put('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const updatedInventory = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    quantity: updatedInventory.quantity
                },
            };
            const result = await inventoryCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })


    }
    finally {

    }

}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send("decor place server running")
})

app.listen(port, () => {
    console.log("decor place running on port", port)
})