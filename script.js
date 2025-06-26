const apiKey = "a2c936d2b2a601ad620e911254129103";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // DEBUG: See actual API response

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `<p>City not found. (${data.message})</p>`;
      return;
    }

    const weatherHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Forecast:</strong> ${data.weather[0].description}</p>
    `;
    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "<p>Error fetching weather data.</p>";
  }
}
