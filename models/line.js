const mongo = require('mongoose')

const lines = mongo.Schema({
    LineType: {
        type: String,
        required: true
    },
    LineTier:{
        type: String,
        required: true
    },
    LineVC:{
        type: String,
        required: true
    },
    LineMI:{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required: true
    },
    StaffID:{
        type: Number,
        required: true
    },
    Origin:{
        type: String,
        required: true
    }
})

module.exports = mongo.model('Line',lines,'Line')