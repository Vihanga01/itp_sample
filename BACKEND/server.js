const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
//reading url in .env file
require("dotenv").config();

//Define port
const PORT = process.env.PORT || 8080 ;


app.use(cors());
//app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//Connect database
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{

    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//open created database connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb Connection Succesfull");

})

//access to students.js 
const customerRouter = require("./routes/customers.js");

app.use("/customer",customerRouter);


//running port 8080
app.listen(PORT, () => {
    console.log('Server is up and Running on port: ', {PORT})
})
