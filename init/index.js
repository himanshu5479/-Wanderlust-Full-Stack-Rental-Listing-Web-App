const mongoose=require("mongoose");

const initData = require("./data.js");

const Listing = require("../models/listing.js");
const Mongo_URl="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>
{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main() 
{
    await mongoose.connect(Mongo_URl)
}

const initDB =async() =>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:'67f02177c53e833853259707'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
}
initDB();