function search() {
    var search = document.getElementById("country").value;

    var url = `https://restcountries.com/v3.1/name/${search}`;

    fetch(url)
    .then(res => res.json())
    .then(data => process(data));
}

function process(data) {
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = "";

    data.forEach(country => {
        var countryCard = document.createElement("div");
        countryCard.className = "country-card";

        countryCard.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <button class="btn btn-primary btn-more-details" onclick="forecast('${country.name.common}')">More Details</button>
        `;

        oldContent.appendChild(countryCard);
    });
}

function forecast(countryName) {
    var key = "1544085b4f6144eebb085843240312";

    var url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${countryName}&days=1&aqi=no&alerts=no`;

    fetch(url)
    .then(res => res.json())
    .then(data => process_forecast(data));
}

function process_forecast(data) {
    var oldContent = document.getElementById("displayArea1");
    oldContent.textContent = ""; // Clear previous content

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h3>Weather Information for ${data.location.name}</h3>
        <p><strong>Max Temp:</strong> ${data.forecast.forecastday[0].day.maxtemp_c} °C</p>
        <p><strong>Min Temp:</strong> ${data.forecast.forecastday[0].day.mintemp_c} °C</p>
        <p><strong>Condition:</strong> ${data.forecast.forecastday[0].day.condition.text}</p>
        <img src="https:${data.forecast.forecastday[0].day.condition.icon}" alt="Weather Condition">
    `;

    oldContent.appendChild(newDiv);
}