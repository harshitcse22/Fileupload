const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

 function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
 }

  async function uploadFileToCloudinary(file, folder,quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

      if(quality){
        options.quality = quality;
      }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) =>{
     try{
        //data fetch
        const {name,tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg","jpeg","png"]; 
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format is supported',
            })
        }

        //file format supported hai
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "codehelp",90);
         console.log(response);
        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

       res.json({
         success:true,
         imageUrl:response.secure_url,
         message:"Image Successfully Uploaded",
       })

     }catch(error){
         console.log(error);
         res.status(400).json({
            success:false,
            message:"something went wrong"
         })
     }
}

// video upload handler

exports.videoUpload = async (req, res) =>{
    try{
    // data fetch
    const{ name, tags, email} = req.body;
    console.log(name,tags,email);

    const file = req.files.videoFile;
    console.log(file);
    
    //validation
      const supportedTypes = ["mp4","mov"]; 
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
         
        //TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format is supported',
            })
        }

        //file format supported hai
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "codehelp");
         console.log(response);

            //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
        })

       res.json({
         success:true,
         videoUrl:response.secure_url,
         message:"Video Successfully Uploaded",
       })

}catch(error){
     console.error(error);
     res.status(400).json({
        success:false,
        message:"Somethingg went wrong",
     })
   }
}

// imageSizeReducer

exports.imageSizeReducer = async (req, res) =>{
      try{
          // data fetch
    const{ name, tags, email} = req.body;
    console.log(name,tags,email);

    const file = req.files.imageFile;
    console.log(file);
    
    //validation
      const supportedTypes = ["jpg","jpeg","png"]; 
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
         
        //TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format is supported',
            })
        }

        //file format supported hai
        console.log("Uploading to codehelp");
        const response = await uploadFileToCloudinary(file, "codehelp");
         console.log(response);

            //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
             imageUrl:response.secure_url,
        })

       res.json({
         success:true,
         imageUrl:response.secure_url,
         message:"Video Successfully Uploaded",
       })
      }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
      }
}
