const mongoose = require("mongoose")
const express = require('express');
const User =require('./user')
const formidable = require('formidable');

try {
     mongoose.connect('mongodb+srv://admin:1234@cluster0.kfowgwb.mongodb.net/database', {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("ESTA VIVAAAAAAAAA!!!!!!!!!")
} catch (error) {
    console.log("sumakina da error nmm: ",error)
    throw new Error("sumakina da error nmm")
}

app = express()

app.use(express.static('public'))
app.use(express.json())



app.post('/resrol', async(req, res)=>{
    const f = formidable({multiples:false});
    f.parse(req, async(err, fields, files) =>{
        if (err) {
            next(err);
            return
        }
        else{
            const r=new User({
                email:fields.email,
                pass:fields.contraseña
            })
            await r.save()
            .then(async() =>{
                console.log("YES")
                res.redirect('/')
            })
            .catch(err => {
                console.log("NOPE")
                console.log(err);
            });
        }
    })
})

app.listen("8082", () => {
    console.log('sus chinanigunz seran aportados atraves del puertito: 8082')
})