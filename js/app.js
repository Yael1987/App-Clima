document.addEventListener('DOMContentLoaded', () => {

  const btnLocation = document.querySelector('.btn-location');
  const dateDiv = document.querySelector(".current-date");
  const locationDiv = document.querySelector(".location-info");
  const currentWeatherDiv = document.querySelector(".weather")
  const hourlyWeatherDiv = document.querySelector(".weather-hours");
  const dailyWeatherDiv = document.querySelector(".weather-week");
  const btnSubmit = document.querySelector(".submit-search"); 
  const searchField = document.querySelector(".search-field");
  const nav = document.querySelector(".navigation")

  btnLocation.addEventListener('click', async e => {
    const coords = await getLocationCoords();

    if (!coords.success) {
      console.log('Location access denied');
      return;
    }

    const weatherInfo = await getWeatherInfo(coords.data);

    // const {zoneName } = await getTimeZone(coords.data);
    console.log(weatherInfo);
    const { timezone, current, hourly, daily } = weatherInfo;
    
    if (!timezone) {
      console.log('Time zone not available');
      return;
    }

    const localTime = formatDate(new Date(), timezone);
    dateDiv.innerHTML = localTime;

    const cityInfo = await getCityByCoords(coords.data);

    const { city, country, state } = cityInfo.address;

    locationDiv.innerHTML = `${city ? 'Cd ' + city : state} / ${country}`

    currentWeatherDiv.innerHTML = `${current.weather[0].description} \n ${current.temp}&deg;`;

    hourlyWeatherDiv.innerHTML = displayHourlyWeather(hourly.slice(1, 7));
    dailyWeatherDiv.innerHTML = displayDailyWeather(daily.slice(1, 7));
  })

  // searchField.addEventListener('input', async e => {

  //   if (nav.lastChild.classList.contains('suggestions')) {
  //     nav.removeChild(nav.lastChild);
  //   }

  //   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchField.value}&format=json`);
  //   const cityInfo = await response.json();

  //   const suggestDiv = document.createElement('div');
  //   suggestDiv.classList.add('suggestions');
    
  //   cityInfo.forEach(el => {
  //     suggestDiv.innerHTML += `<div>${el.display_name}</div>`;
  //   })

  //   if (suggestDiv) { 
  //     nav.appendChild(suggestDiv);
  //   }

  //   console.log(cityInfo);
  // })

  btnSubmit.addEventListener('click', async e => {
    e.preventDefault();

    if (searchField.value === '') {
      return;
    }

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchField.value}&format=json`);
    const cityData = await response.json();

    if (!cityData.length) {
      console.log('Sin resultados');
      return;
    }

    const weatherInfo = await getWeatherInfo({lat: cityData[0].lat, lng: cityData[0].lon});

    console.log(weatherInfo);
    const {timezone, current, hourly, daily} = weatherInfo;

    if (!timezone) {
      console.log("Time zone not available");
      return;
    }

    const localTime = formatDate(new Date(), timezone);
    dateDiv.innerHTML = localTime;

    const cityInfo = await getCityByCoords({lat: cityData[0].lat, lng: cityData[0].lon});

    const {city, country, state} = cityInfo.address;

    locationDiv.innerHTML = `${city ? "Cd " + city : state} / ${country}`;

    currentWeatherDiv.innerHTML = `${current.weather[0].description} \n ${current.temp}&deg;`;

    hourlyWeatherDiv.innerHTML = displayHourlyWeather(hourly.slice(1, 7));
    dailyWeatherDiv.innerHTML = displayDailyWeather(daily.slice(1, 7));

  })

  init();
});

function getLocationCoords() {
  return new Promise(resolve => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => 
        resolve({
          success: true,
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      ,
        error => 
          resolve({
            success: false,
            message: 'Geolocation permission denied'
          })
      );
      
    } else { 
      resolve({
        success: false,
        message: "Geolocation is not available for this navigator"
      }) 
    }
  })
}

// async function getTimeZone({lat, lng}) {
  
//   // url = `http://api.timezonedb.com/v2.1/get-time-zone?key=0Y8HW743422Q&format=json&by=position&lat=${lat}&lng=${lng}&lang=es`;
//   url = `http://api.timezonedb.com/v2.1/get-time-zone?key=0Y8HW743422Q&format=json&by=position&lat=19.477489&lng=-99.045768&lang=es`;
  
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data);

//     return data;

//   } catch (error) {
//     console.log(error);
//   }
// }

async function getWeatherInfo({lat, lng}) {
  url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=143328e49e68626ede078c0fb85e7c8d&lang=es`;
  // url = `https://api.openweathermap.org/data/3.0/onecall?lat=43.720904&lon=11.295997&appid=143328e49e68626ede078c0fb85e7c8d&units=metric&lang=es`;
  // url = `https://api.openweathermap.org/data/3.0/onecall?lat=34.685910&lon=135.516061&appid=143328e49e68626ede078c0fb85e7c8d&units=metric&lang=es`;
  // url = `https://api.openweathermap.org/data/3.0/onecall?lat=17.362959&lon=78.501018&appid=143328e49e68626ede078c0fb85e7c8d&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      timezone: data.timezone,
      current: data.current,
      hourly: data.hourly,
      daily: data.daily,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getCityByCoords({lat, lng}) {
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=19.400481&lon=-99.009125&zoom=8`;
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=43.720904&lon=11.295997&zoom=8`;
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=37.538793&lon=126.987019&zoom=8`;
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=34.685910&lon=135.516061&zoom=8`;
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=17.362959&lon=78.501018&zoom=8`;
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=8`;

  try {
    const response = await fetch(url);
    const data = response.json();

    return data;

  } catch (error) {
    
  }
}

function displayHourlyWeather(hourly) {
  let htmlRes = '';

  hourly.forEach(weatherEl => {
    const hour = new Date(weatherEl.dt * 1000).getHours();

    htmlRes += `
      <div class="weather-hour">${hour < 10 ? '0' + hour : hour}:00 / ${weatherEl.temp}&deg;</div>
    `
  })

  return htmlRes;
}

function displayDailyWeather(daily){
  let htmlRes = '';

  daily.forEach(weatherEl => {
    const day = new Date(weatherEl.dt * 1000);
    const formatedDate = new Intl.DateTimeFormat('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(day);

    htmlRes += `
      <div class="weather-day">${formatedDate}</div>
      <div class="weather-temps">Min: ${weatherEl.temp.min}&deg;, Max: ${weatherEl.temp.max}&deg;</div>
      <div class="weather-description">${weatherEl.weather[0].description}</div>
    `;
  });

  return htmlRes;
}

function formatDate(date, timeZone) {
  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone
  }

  const formatter = new Intl.DateTimeFormat('es-MX', options);

  return formatter.format(date);
}

function init() {
  
}