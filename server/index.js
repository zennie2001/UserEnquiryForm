let express = require("express")
const mongoose = require("mongoose");
let cors = require('cors')
const enquiryRoutes = require("./APP/Routes/Web/enquiryRoutes");
require('dotenv').config()
let app = express();

app.use(cors())
app.use(express.json())

//http://localhost:8050/api/website/enquiry/insert
app.use("/api/website/enquiry", enquiryRoutes)



//connect mongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to MongoDB")
    app.listen(process.env.PORT)
})