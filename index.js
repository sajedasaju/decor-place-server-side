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
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log("decor user connected")
//     client.close();
// });


app.get('/', (req, res) => {
    res.send("decor place server running")
})

app.listen(port, () => {
    console.log("decor place running on port", port)
})