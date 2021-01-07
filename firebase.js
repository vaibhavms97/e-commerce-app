var express = require('express');
var admin = require('firebase-admin');
const cors = require('cors');
const app = express()

var serviceAccount = require("./Accountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-245f2-default-rtdb.firebaseio.com"
});

var db = admin.database();

var user = db.ref('users');

addUser