"use strict";

document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});

document.getElementById("form-1").addEventListener("submit",async function(e){
    e.preventDefault()
    const weatherData = await getweatherData();
    console.log(weatherData);
    displayWeather(weatherData);
});




const getweatherData = async () => {
    const response = await fetch("http://api.weather.gov/alerts/");
    const data = await response.json();
    const instructions = data.features[0].properties.headline;
    return instructions
};

