const express = require("express");
const path = require('path')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const connectToMongoDB  = require("./connect")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middleware/auth")

const URL = require('./models/url')

const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user.js')

const app =  express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://snehak:jojo123@cluster0.o1hplgs.mongodb.net/url?retryWrites=true&w=majority').then(()=> console.log("connected to mongodb"))

app.set("view engine", "ejs")
// hmein index ko ye v batana h kii hmne ejs file khn rkhi h and for this we use path
app.set('views', path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // its mean kii hm form ka data v support krenge
app.use(cookieParser());


app.use("/url", restrictToLoggedinUserOnly ,urlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, staticRoute)

app.get("/test", async (req,res) => {
    // return res.end("<h1>Hey from server</h1>"); you can write like this but this is not a good approach
    // is res.end m tum pura html code likh skte ho for frontend
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
        // you can send the no of variables you want 
        //name: "nehh",
    });
})

app.get('/url/:shortId', async(req,res) => {
         const shortId  = req.params.shortId;
         const entry = await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
         );         
         res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));