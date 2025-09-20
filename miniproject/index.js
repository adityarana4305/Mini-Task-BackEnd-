const express = require('express');
const path = require('path');
const app = express ();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(error,files)=>{
        res.render('index',{files:files});
    });
})
app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        console.log(filedata)
        res.render('detail',{filename:req.params.filename,filedata:filedata});
    })
})
app.get('/edit/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        console.log(filedata)
        res.render('edit',{filename:req.params.filename,filedata:filedata});
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.description,(err)=>{
        res.redirect('/')
    });
})
app.post('/edit',(req,res)=>{
    fs.writeFile(`./files/${req.body.newtitle.split(' ').join('')}.txt`,req.body.editarea,(err)=>{
        res.redirect('/');
    });
})



app.listen(3000,()=>{
    console.log("server is alive");
})