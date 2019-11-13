const mongoose = require('mongoose');

const TimeStampSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default: Date.now
    },
    value:{
        type: Number,
        default:Math.random()
    }
});


module.exports = mongoose.model('TimeStamp', TimeStampSchema)