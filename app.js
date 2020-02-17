var express = require('express');
var app = express();
var request = require('request');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('search.ejs');
});



app.get('/results', function(req, res){
    var query = req.query.search;
    var link = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(link, function(error, response, body){
        var data = JSON.parse(body);
        if(!error&&response.statusCode == 200)
            res.render("results.ejs", {data: data});
    });
});


app.listen(3000, function(){
    console.log('movie app started'); 
});