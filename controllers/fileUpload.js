const File = require("../models/File");

//localFileUpload -> handler function

exports.localFileUpload = async (req, res)=>{
     try{
        //fetch file 
        const file = req.files.file;
        console.log("File aagyi jee", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);

        file.mv(path, (err) =>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"local file Uploaded successfully",
        });
     }catch(error){
        console.log("not able to upload file on server");
        console.log(error);
     }
}