const bodyParser = require('body-parser')
const express = require('express')
const app =  express()
const port = 3000

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//data
let posts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
      },
  ];
  
  let lastId = 3;
  
//CHALLENGE 1: GET All posts

app.get('/posts', (req,res) => {
    if(posts.length < 1) {
        return res.status(404).json({success: true, msg: "No posts found"}) 
    }
    else {
        return res.status(200).json(posts)
    }
})

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req,res) => {
    const {id} = req.params
    const searchPostByID = posts.find((post) => post.id === Number(id))
    if(!searchPostByID){
        return res.status(404).json({success: true, msg: "Provide correct ID"})
    }
    else {
        return res.status(200).json(searchPostByID);
    }
})

//CHALLENGE 3: POST a new post
app.post('/posts', (req,res) => {
    const newId = posts.length + 1
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date()
    }
    posts.push(newPost)
    res.status(201).json(posts)
})

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req,res) => {
    const searchPost = posts.find((post) => post.id === parseInt(req.params.id))
    if(!searchPost){
        return res.status(401).json({success: true, msg: "Provide correct ID"})
    }
    if(req.body.title) searchPost.title = req.body.title 
    if(req.body.content) searchPost.content = req.body.content
    if(req.body.author) searchPost.author = req.body.author

    res.status(200).json(searchPost)

})


//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });
  
    posts.splice(index, 1);
    res.json({ message: "Post deleted" });
  });
  

//listen
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
})