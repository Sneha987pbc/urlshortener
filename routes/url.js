const express = require("express");
const {handleGenerateNewShortURL, handleGethandleAnalytics} = require("../controllers/url");
const router = express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGethandleAnalytics)
module.exports = router;