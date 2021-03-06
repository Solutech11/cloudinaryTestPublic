const express = require('express')

const fileupload = require('express-fileupload');

const cloudinary= require('cloudinary')

const app = express()
const port = 3000

cloudinary.config({
    cloud_name:'******',
    api_key: '******',
    api_secret:'******'
})

//fileupload setup to save in temp
app.use(fileupload({useTempFiles:true}));
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/upload',async(req,res)=>{
    const upload = req.files.awayu

    function uploader() {
        return new Promise(function(resolve,reject) {
            cloudinary.uploader.upload(upload.tempFilePath, function(result,err) {
                if (err) {
                    console.log(err);
                }
                resolve(result);
            })
        })
    }

    var data = await uploader();
    res.send(data.url)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
