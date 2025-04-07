const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createRoute=async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        
        // Create and save the new review
        let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
         
        await newReview.save();  // Save the review to the database
        
        // Push the review's ObjectId to the listing's reviews array
        listing.reviews.push(newReview._id);
        
        // Save the updated listing
        await listing.save();
        req.flash("success","New Review Added!");
        
        // Redirect to the listing's show page after saving the review
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while saving the review.");
    }
  };
  module.exports.destroyRoute=async(req,res)=>{
    let {id , reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
     await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review deleted!");
     res.redirect(`/listings/${id}`);
  
  };