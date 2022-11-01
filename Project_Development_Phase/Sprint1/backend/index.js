const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRoute = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use("/users",usersRoute)

const uri = "mongodb://admin:admin2001@ac-3tdhyng-shard-00-00.mfjvorb.mongodb.net:27017,ac-3tdhyng-shard-00-01.mfjvorb.mongodb.net:27017,ac-3tdhyng-shard-00-02.mfjvorb.mongodb.net:27017/?ssl=true&replicaSet=atlas-kbcfwa-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected to db")
    }catch(error){
        console.log("error ", error)
    }
}


connect()

    
app.use(express.json());    
 
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));