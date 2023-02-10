const express = require('express');
const ejs = require('ejs');
const requests = require('request');
const path = require('path');
require('dotenv').config();

const app = express();

//Static Files 
app.use(express.static('public'));

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// set the view engine to ejs
app.set('Views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

let API_CALL = (callback, movies) =>{
    const  API = process.env.API_KEY;
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API+'&query=';
    requests(url + movies, (error, response, body) =>{

        if(response.statusCode === 200){
            callback(JSON.parse(body));
        }
        else if(response.statusCode === 404){
            console.log("Not Found!");
        }
        else{
            console.log(error);
        }
    }); 
}


app.get('/', function (req, res) {
    res.render('search');
});

app.post('/', function (req, res) {
    API_CALL((Callback_doneAPI) =>{
        res.render('movies', {
        data: Callback_doneAPI,
        userInput:req.body.searchBar,
      });
    },req.body.searchBar);
  });
  


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})