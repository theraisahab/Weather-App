const apikey = 'a7a0d4097c6a4554a43114828242808';

const cityInput = document.querySelector('.input');
const btn = document.querySelector('#btn');
const weatherResult = document.querySelector('#weatherResult');

async function getData(apikey, city) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=yes`);
    return await response.json();
}

btn.addEventListener('click', async () => {
    const city = cityInput.value;
    weatherResult.innerHTML = '';  // Clear previous results

    if (!city) {
        weatherResult.innerHTML = '<p class="text-danger">Please enter a city name.</p>';
        return;
    }

    try {
        const data = await getData(apikey, city);
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherResult.innerHTML = '<p class="text-danger">Error fetching weather data. Please try again.</p>';
    }
});

function displayWeather(data) {
    const { location, current } = data;
    const weatherHTML = `
        <h3>Weather in ${location.name}, ${location.country}</h3>
        <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${current.condition.text}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
    `;
    weatherResult.innerHTML = weatherHTML;
}
