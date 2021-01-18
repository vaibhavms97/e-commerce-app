const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const path = require('path');

const app = express()
const url = "mongodb+srv://mall:mall@cluster0.lx97d.mongodb.net/mall?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json())
var ObjectId = require('mongodb').ObjectID

const PORT = 4000

//firebase db////////////////////////////////////////////////////////////////
var admin = require('firebase-admin');

var serviceAccount = require("./Accountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-245f2-default-rtdb.firebaseio.com"
});
const firedb = admin.database();
var prod = firedb.ref('/0/products');
/////////////////////////////////////////////////////////////////////////////

MongoClient.connect(process.env.MONGODB_URI || url, { useUnifiedTopology: true ,useNewUrlParser: true }, (err,client) =>{
    if(err) throw err;
    console.log('mongo')
    db = client.db('mall');
})

app.get('/login',(req,res) => {
    db.collection('users').find().toArray((err,values) => {
        if(err) throw err;
        res.json(values);
    })
})

app.post('/postLoginDetails',(req,res) =>{
    db.collection('users').insertOne(req.body,(err,values) => {
        if(err) throw err;
        res.send({message:'User added successfully', userValues:values})
    })
})

// app.get('/products',(req,res) => {
//     db.collection('products').find().toArray((err,values) => {
//         if(err) throw err;
//         res.json(values);
//     })
// })

app.get('/products', (req, res) => {
    prod.once('value', function (snap) {
      res.status(200).json(snap.val())
    })
})


app.post('/addToCart',(req,res) => {
    db.collection('users').findOneAndUpdate({'_id': new ObjectId(req.body.userId)},{$set:{cart:req.body.products}},{w:1}, function(err,values){
        if(err) throw err;
        res.send({message:'Added to cart'})
    })
    // console.log(req.params.id)
})

app.get('/getUser',(req,res) => {
    db.collection('users').find({'_id': new ObjectId(req.query['userId'])}).toArray((err,values) => {
        if(err) throw err;
        res.json(values);
    })
    // console.log(req.query['userId']);
})

app.post('/postProducts',(req,res) =>{
    db.collection('aproducts').insertOne(req.body,(err,values) => {
        if(err) throw err;
        res.send({message:'products added successfully', userValues:values})
    })
    console.log(req.body)
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => console.log('Your port is listening at '+PORT))