"use strict";

const weatherForm = document.getElementById("form-1");
const locationInput = document.getElementById("location");
const card = document.querySelector(".card");
const apiKey = "";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const coordinates = locationInput.value;

    if (coordinates) {
        try {
            const { lat, lon } = parseCoordinates(coordinates);
            const weatherData = await getWeatherData(lat, lon);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Failed to fetch weather data.");
        }
    } else {
        displayError("Please enter latitude and longitude.");
    }
});

async function getWeatherData(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { main, weather } = data;


    card.innerHTML = "";

    
    const tempElement = document.createElement("p");
    tempElement.textContent = `Temperature: ${main.temp} K`;

    const descElement = document.createElement("p");
    descElement.textContent = `Description: ${weather[0].description}`;

    
    card.appendChild(tempElement);
    card.appendChild(descElement);
}

function parseCoordinates(coordinates) {
    const [lat, lon] = coordinates.split(",");
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.innerHTML = ""; 
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
