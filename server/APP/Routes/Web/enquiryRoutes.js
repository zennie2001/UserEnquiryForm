let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate } = require('../../Controller/web/enquiryController');

let enquiryRoutes= express.Router();

enquiryRoutes.post("/insert",enquiryInsert)
enquiryRoutes.get("/view", enquiryList)
enquiryRoutes.delete("/delete/:id", enquiryDelete)
enquiryRoutes.get("/single/:id", enquirySingleRow)
enquiryRoutes.put("/update/:id", enquiryUpdate)

module.exports = enquiryRoutes