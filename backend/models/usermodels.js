const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    pantherId:Number,
    firstName: String,
    lastName: String,
    department:String,
    level:String,
    campus:String,
    degree:String,
    email:String,
    college: String,
    year:Number
},{
    timestamps: true,
});

const User = mongoose.model('User',userSchema);
module.exports = User;
