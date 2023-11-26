const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    todo:{
        type:String,
        required: true
    },
    status: Boolean,

})

module.exports = mongoose.model("Todo", todoSchema)