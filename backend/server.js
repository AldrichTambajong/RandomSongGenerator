const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
//const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 5000;

//app.use(bodyParser.json());

/*var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + '.' +file.originalname.split('.')[file.originalname.split('.').length-1])
    }
});

var uploadMulter = multer({
    storage:storage
}).single('file');

app.post('/upload',function(req,res){
    uploadMulter(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null});
    });
});

app.get('/',function(req,res){
    res.sendFile(__dirname + "/eventlist.components.js");
});*/

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://atambajong1:Gopanthers12589@cluster0-efu82.mongodb.net/WebProgramming?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("MongoDB database connection established successfully");
})

const eventroute = require('./routes/events');
//const userroute = require('./routes/users');
app.use('/events',eventroute);
//app.use('/users',userroute);


app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});