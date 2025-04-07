const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

// Define a sub-schema for the image field
const imageSchema = new Schema({
    filename: {
        type: String,
        default: "default.jpg",
    },
    url: {
        type: String,
        default: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    },
});

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
      url:String,
      filename:String,  
    },
    price: Number,
    location: String,
    country: String,
    reviews: [ // This should be inside the schema definition
        {
            type: Schema.Types.ObjectId,
            ref: 'Review' // Reference to the 'Review' model
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id :{$in : listing.reviews}});
  }
});

// Create the model for listings
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
