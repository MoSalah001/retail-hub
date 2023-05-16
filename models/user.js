const mongo = require('mongoose')

const users = mongo.Schema({
    StaffID: {
        type: Number,
        required: true
    },
    Pass : {
        type : String,
        required: true
    } ,
    CreationDate : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongo.model('user',users)