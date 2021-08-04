var express = require('express');
var app = express();
var routes = require('./routes')
var mongoose = require('mongoose');
var MONGO_URL = 'mongodb://localhost:27017/edudap'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MONGO_URL, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false})

  
app.use('/api', routes)

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(80, ()=>{
   console.log("app running at port 3000!");
});
