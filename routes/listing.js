const express=require("express");
const router = express.Router();
const multer  = require('multer');


const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js"); 
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controller/listings.js");
const{storage}=require("../cloudConfig.js");
const upload=multer({storage});
  
// Index Route - Display all listings
router
 .route("/")
 .get( wrapAsync(listingController.index))
 .post( isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));
 
   // New Listing Form Route
   router.get("/new",isLoggedIn,listingController.renderNewForm);
   
// Show Route - Display a specific listing
// Update Route - Update listing details

// Delete Route - Remove a listing

router
 .route("/:id")
 .get( wrapAsync(listingController.showListing))
 .put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
 .delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

  

   

  
  // Edit Route - Show edit form
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  


  module.exports=router;    