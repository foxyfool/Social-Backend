const express = require('express'); 
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//MIDDLEARE
app.use(express.json());

const blog = require("./routes/blog") // import route

app.use("/api/v1",blog) // mount

const  dbConnect = require("./config/database");
dbConnect();

app.listen(PORT,()=>{
    console.log(`App is started at PORT no: ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is homepage BBY </h1>`)
})

