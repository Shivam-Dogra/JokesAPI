const express = require('express')
const app = express()
const {jokes} = require('./data')
const portnumber = 8080;
const auth = require('../middleware/auth')
const bodyParse = require('body-parser') 
//middleware
//app.use(auth)
app.use(bodyParse.urlencoded({extended: true}))
//GET random joke
/*
app.get('/', auth, (req,res) => {
    res.status(200).send("Welcome to Jokes API.");
})
*/

app.get('/randomjoke', (req,res) => {
    const index = Math.floor((Math.random() * jokes.length) + 1 );
    res.status(200).json(jokes[index]);
})

app.get('/randomjoke/:id', (req,res) => {
    const {id} = req.params
    const customJokes = jokes.find((joke) => joke.id === Number(id))
    if(!customJokes){
        return res.json({success: true, text: "invalid joke id"})
    }
    else {
        return res.json(customJokes);
    }
})

app.get('/joketype', (req,res) => {
    const {type, limit} = req.query
    let jokeArray = [...jokes];
    if(type){
        let cleanText = (type.charAt(0).toUpperCase()) + type.slice(1)
        jokeArray = jokes.filter((joke) => joke.jokeType == cleanText);
    }
    if(limit){
        if(limit > 25){
            return res.status(200).json({success: true, text: "Sorry, we have only 25 jokes"})
        }
        else {
            jokeArray = jokeArray.slice(0,limit)
        }
    }
    if(jokeArray.length < 1){
        return res.status(200).json({success: true, text: "pass valid joke type like Sports, Puns, Math, Food, Wordplay"})
    }
    return res.status(200).json(jokeArray);

})

app.post('/randomjoke', (req,res) => {
    const addNewJoke = {
        id: jokes.length + 1,
        jokeText: req.body.text,
        jokeType: req.body.type
    };
    jokes.push(addNewJoke);
    res.json(addNewJoke);
})

app.listen(portnumber, () => {
    console.log(`Server started at ${portnumber}`);
})


