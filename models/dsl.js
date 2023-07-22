const mongo = require('mongoose')

const dsl = mongo.Schema({
    MSISDN: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    LL :{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    StaffID: {
        type: Number,
        required: true
    }
})

module.exports = mongo.model('Dsl',dsl,'Dsl')