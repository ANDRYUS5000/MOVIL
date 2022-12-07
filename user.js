const { Schema, model} = require("mongoose")
//Comment
const User=Schema({
    email:{
        type: String,
        require:true,
        unique:true
    },
    pass:{
        type: String,
        require:true
    },
})

module.exports=model('Usuario', User)
