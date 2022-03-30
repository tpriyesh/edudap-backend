var express = require('express');
var app = express();
const port = process.env.PORT || 3000
const cors = require('cors');
var routes = require('./routes')
var mongoose = require('mongoose');
var MONGO_URL = 'mongodb+srv://edudapuser:edudappwd@cluster0.1wliu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose.connect(MONGO_URL, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false})

  
app.use('/api', routes)
app.use(express.static('public'))
app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(port, ()=>{
   console.log("app running at port "+port);
});
