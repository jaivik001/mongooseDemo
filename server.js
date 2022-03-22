const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');

require('dotenv').config;
require('./Connections/MongooseConnection');

app.use(bodyParser.urlencoded({extended: true}));
// increasing the limit : else giving error Request entity too large.
app.use(bodyParser.json({
  limit: '100mb'
}));

app.get('/signup' , function(req , res){
  res.send('Signup Successfuly')
})


app.listen(process.env.PORT);
console.log("Run at Port:", process.env.PORT);

require('./routes');