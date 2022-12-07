const { Schema, model} = require("mongoose")

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
//Moduele
module.exports=model('Usuario', User)
