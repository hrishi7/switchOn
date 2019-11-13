
const TimeStamp = require('../models/TimeStamp');
const asyncHandler = require('../middleware/async');


//@desc     Save
//@route    Post /api/timestamp/
//@access   Public
exports.save = asyncHandler(async(req, res, next)=>{
    const timestamp = new Date();
    const value = Math.random(100);
    //Create timestamp
    const timestampObj = await TimeStamp.create({
        timestamp,value
    });
    // var io = req.app.get('socket');
    // io.emit('FromServer',timestampObj);
    res.status(200).json({
        success: true,
        timestampObj
    })
});

//@desc     get last inserted time stamp
//@route    Get /api/timestamp/
//@access   Public
exports.getlast = asyncHandler(async(req, res, next)=>{
    //Create timestamp
    const timestampObj = await TimeStamp.find({}).sort({timestamp:-1}).limit(1);
    // var io = req.app.get('socket');
    // io.emit('FromServer',timestampObj);
    res.status(200).json({
        success: true,
        timestampObj
    })
});






