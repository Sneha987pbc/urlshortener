// frontend show krne k liye staticRouter use krte h

const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
 
  if(!req.user) return res.redirect('/login')

  const allurls = await URL.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allurls,
  });
});


router.get('/signup', (req,res) => {
  return res.render("signup");
})

router.get('/login', (req,res,next) => {
  return res.render("login");
  next();
})

module.exports = router;
