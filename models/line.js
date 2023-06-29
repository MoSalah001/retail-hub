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
        type: Boolean,
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
    }
})

module.exports = mongo.model('Line',lines,'Line')