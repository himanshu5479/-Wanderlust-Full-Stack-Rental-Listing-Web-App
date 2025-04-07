const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js"); // Ensure this file exists

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controller/reviews.js");

// Reviews route
router.post("/",isLoggedIn, validateReview ,wrapAsync(reviewController.createRoute));
  //Delete Review route
  router.delete("/:reviewId",isLoggedIn ,isReviewAuthor,wrapAsync(reviewController.destroyRoute));

  module.exports=router;   