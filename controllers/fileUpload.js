const File = require("../models/File");

//localFileUpload -> handler function

exports.localFileUpload = async (req, res)=>{
     try{
        //fetch file from request
        const file = req.files.file;
        console.log("File aagyi jee", file);

        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);

        //add path to move function
        file.mv(path, (err) =>{
            console.log(err);
        });

        //create a successfull response
        res.json({
            success:true,
            message:"local file Uploaded successfully",
        });
     }catch(error){
        console.log("not able to upload file on server");
        console.log(error);
     }
}