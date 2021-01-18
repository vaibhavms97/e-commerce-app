const express = require('express');
const cors = require('cors');
var admin = require('firebase-admin');

var serviceAccount = require("./Accountkey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-245f2-default-rtdb.firebaseio.com"
});
const db = admin.database();

const app = express()
app.use(cors())
app.use(express.json())

var user = db.ref('/0/users');
var prod = db.ref('/0/products');
var ref = db.ref('/')

app.get('/login', (req, res) => {
  user.once('value', function (snap) {
    res.status(200).json(snap.val())
  })
})

app.get('/products', (req, res) => {
  prod.once('value', function (snap) {
    res.status(200).json(snap.val())
  })
})

app.post('/postLoginDetails',(req,res) =>{
    var userRef = ref.child("/0/users");
    var postUserRef = userRef.push();
    postUserRef.set(req.body,(err)=>{
      if(err){
        res.status(300).json({"msg":"Something went wrong","error":err});
      }
      else{
        res.status(200).json({"msg":"user created sucessfully","key":postUserRef.key});
      }
    })
})

app.post('/postProducts',(req,res) =>{
  var userRef = ref.child("/0/products")
  userRef.push(req.body,(err)=>{
    if(err){
      res.status(300).json({"msg":"Something went wrong","error":err});
    }
    else{
      res.status(200).json({"msg":"products added sucessfully"});
    }
  })
})

app.post('/addToCart',(req,res) => {
  var userRef = ref.child("/0/users");
  var updateRef = userRef.child(req.body.userId);
  updateRef.update({"cart":req.body.products})
})

app.get('/getUser',(req,res) => {
  var userId = req.query['userId']
  var userCart = ref.child("0/users/"+userId)
  userCart.once('value', function (snap) {
    res.status(200).json(snap.val())
  })
  // db.collection('users').find({'_id': new ObjectId(req.query['userId'])}).toArray((err,values) => {
  //     if(err) throw err;
  //     res.json(values);
  // })

})

// app.post('/addToCart',(req,res) => {
//   db.collection('users').findOneAndUpdate({'_id': new ObjectId(req.body.userId)},{$set:{cart:req.body.products}},{w:1}, function(err,values){
//       if(err) throw err;
//       res.send({message:'Added to cart'})
//   })
//   // console.log(req.params.id)
// })



app.listen(4000, () => console.log('Your port is listening at 4000'))