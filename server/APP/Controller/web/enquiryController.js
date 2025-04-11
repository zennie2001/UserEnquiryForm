const { enquiryModel } = require("../../Model/enquiry.model");


let enquiryInsert = (req, res)=>{
   let {name, email, phone , message} = req.body;
   let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message
   })
   enquiry.save().then(()=>{
    res.send({
        status:1,
        message:"Enquiry saved"
    })
   
   })
}

let enquiryList = async (req, res)=>{
    let enquiry = await enquiryModel.find()
    res.send({
        status:1,
        enquiryList:enquiry
    })
}


let enquiryDelete= async(req, res)=>{
    let enquiryId = req.params.id
    let deleteEnquiry = await enquiryModel.deleteOne({_id:enquiryId})
    res.send({
        status:1,
        message:"Enquiry Deleted",
        delRes:deleteEnquiry
    })
}


let enquirySingleRow= async(req, res)=>{
    let enqId = req.params.id
    let enquiry = await enquiryModel.findOne({_id:enqId})
    res.send({
        status:1,
        message:"Selected enquiry",
        enquiryRow: enquiry
    })
}

let enquiryUpdate= async(req, res)=>{
    let enquiryId = req.params.id
    let {name, email, phone , message} = req.body;
    let updateObj = {
     name,
     email,
     phone,
     message
    }
    let updateRes =  await enquiryModel.updateOne({_id:enquiryId}, updateObj)
    res.send({
        status:1,
        message:"Enquiry updated",
        updateRes
    })

}

module.exports={enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate}