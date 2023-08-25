// install npm i nanoid for installing short url generator

// nanoid is not working here

const shortid = require("shortid");
// const {nanoid} = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  // const shortId = nanoid(8);
  const shortId = shortid();
  if(!shortId) return res.status(400).json({error:"shortId not generated"})

  try{
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
}
catch(err){
  console.log(err +" In handleGenerateNewShortURL");
}


return res.render('home', {
  id: shortId ,
})
  // return res.json({ id: shortId });
  // ye json waali line ek json k form m return krega which we don't want
}

async function handleGethandleAnalytics(req, res) {
  const shortId = req.params.shortId;
  try{
  const result = await URL.findOne({ shortId });
  }catch(err){
    console.log(err + "in handleGethandleAnalytics");
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGethandleAnalytics,
};
