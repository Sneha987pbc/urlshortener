const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},
 { timestamps: true}
)

const URL = mongoose.model("url",urlSchema);
module.exports = URL;





// : NOTE : The sparse property in email , is what tells my database to allow null values which will later be filled with unique values .

// var userSchema = new mongoose.Schema({
//   local: {
//     name: { type: String },
//     email : { type: String, require: true, index:true, unique:true,sparse:true}


// https://stackoverflow.com/questions/26711235/mongodb-can-not-create-unique-sparse-index-duplicate-key/34600171#34600171