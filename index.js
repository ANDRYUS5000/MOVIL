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

const app = express()
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
            .then(() =>{
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

app.get('/resmod/:em/:mod', async (req, res) => {
    const ema=req.params.em
    const uid= await User.find({email:ema})
    if(!uid){
        throw new Error(`esa chingadera no la quiero: ${ema} `)
    }else{
        const ps=req.params.mod
        if (uid[0].pass != ps) {
            await User.findOneAndUpdate(uid[0]._id,{pass:ps}, {new:true})
            console.log("actualizado");
        }else{
            console.log("no actualizado");
        }
    }
    res.redirect('/')
})

app.get('/resdel/:em', async (req, res) => {
    const ema=req.params.em
    const uid= await User.find({email:ema})
    if(!uid){
        throw new Error(`esa chingadera no la quiero: ${ema} `)
    }else{
        await User.findByIdAndDelete(uid[0]._id).then(()=>{
            console.log("eliminado");
        })
    }
    res.redirect('/')
})

app.listen("8082", () => {
    console.log('sus chinanigunz seran aportados atraves del puertito: 8082')
})