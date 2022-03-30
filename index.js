var express = require('express');
var app = express();
// const port = process.env.PORT || 5000
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
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
