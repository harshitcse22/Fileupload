// app create
const express = require("express");
const app = express();

//port find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krna hai
app.use(express.json());
const fileupload  = require("express-fileupload");
app.use(fileupload());

//db se connect krna h
const db = require("./config/database");
db.connect();

//cloud se connct krna h 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mont krna h
const Upload = require("./routes/FileUpload");
app.use("api/v1/upload", Upload);

//activate server
app.listen(PORT, () =>{
    console.log(`App is running at ${PORT}`);
})