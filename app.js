const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&appid=3603575ba23d394e69fe00c0f0c7a403&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            var weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherCountry = weatherData.sys.country;
            const weatherCity = weatherData.name;
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            const firstSentence = "<h1>The temperature in "+ weatherCity +", "+weatherCountry + " is "+temp + " degrees</h1></ br>";
            const secondSentence = "<p>The weather is currently  "+ weatherDescription + "</p>";
            res.write(firstSentence);
            res.write(secondSentence);
            res.write("<img src ="+ imageUrl + ">");
            res.send();
        })
    });

});

app.listen(8000,function() {
    console.log("Server is running on port 8000.");
});