const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventclass: String,
    semester:String,
    optionalInfo:String,
    startDate: Date, 
    endDate:Date,
    meeting:String,
    from:String,
    to:String
},{
    timestamps:true,
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;