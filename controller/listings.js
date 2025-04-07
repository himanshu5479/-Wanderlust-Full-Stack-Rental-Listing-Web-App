const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm=(req, res) => {
    
    res.render("listings/new.ejs");
  };

  module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
    populate:{
      path:"author",
    },})
    .populate("owner"); // Populate reviews
    if(!listing){
      req.flash("error","Listing you are trying to access does not exist!");
      res.redirect("/listings");
    }
   
    res.render("listings/show.ejs", { listing });


  };
  module.exports.createListing=async (req, res, next) => {
    try {
      const data = req.body.listing;
  
      // Provide default values for the image field if missing
     
      let url=req.file.path;
      let filename=req.file.filename;
      
  
      const newListing = new Listing(data);
      newListing.owner=req.user._id;
      newListing.image={url,filename};
      await newListing.save();
      req.flash("success","New Listing Created");
      res.redirect("/listings");
    } catch (error) {
      next(error);
    }
  };
  module.exports.renderEditForm= async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you are trying to access does not exist!");
      res.redirect("/listings");
    }
   let originamImageUrl=listing.image.url;
   originamImageUrl= originamImageUrl.replace("/upload","/upload/h_250,w_350");
    res.render("listings/edit.ejs", { listing,  originamImageUrl });
  };
  module.exports.updateListing=async (req, res) => {
      let { id } = req.params;
      let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
     
     if(typeof req.file !=="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
     }
      req.flash("success","List updated!");
      res.redirect(`/listings/${id}`);
    };
    module.exports.destroyListing=async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","Successfully Deleted!");
        res.redirect("/listings");
      };
