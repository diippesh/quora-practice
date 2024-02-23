const express = require('express')
const app = express()
const port  = 8080
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
let posts = [
    {
        id:uuidv4(),
        username:"apna college",
        content:"i love coding",
    },
    {
        id:uuidv4(),

        username:"deepesh",
        content:"i love gyming",
    },
    {
        id:uuidv4(),

        username:"anshul",
        content:"i love pubg",
    },
]
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs")
})
app.post('/posts',(req,res)=>{
    let newPost= req.body;
    newPost.id=uuidv4();
    posts.push(newPost)
    res.redirect('/posts')
})

app.get('/posts/:id',(req,res)=>{
    let id = req.params;
    let post =  posts.find((p)=> p.id == id.id)
    if(post){
        res.render("show.ejs",{post})
    }
    else{   
        res.send('wrong id')
    }
})
app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id)
    console.log(newContent)
    post.content = newContent
    res.redirect('/posts')
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})
app.delete('/posts/:id',(req,res)=>{
    console.log('hello')
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id)
    res.redirect('/posts')
})
app.listen(port,()=>{
    console.log('app is listening')
})