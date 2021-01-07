const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = require('./config/keys');

MongoClient.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true }, (err,client) =>{
    if(err) throw err;
    console.log('mongo')
    const db = client.db('mall');
})


const app = express()
const PORT = process.env.PORT || 4000


app.use(cors())
app.use(express.json())


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

app.get('/products',(req,res) => {
    db.collection('products').find().toArray((err,values) => {
        if(err) throw err;
        res.json(values);
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

if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*',(req,res) => {
        res.send(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => console.log('Your port is listening at 4000'))