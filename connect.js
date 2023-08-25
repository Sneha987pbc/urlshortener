const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
// mongoose.set("strict", true);

async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = connectToMongoDB;