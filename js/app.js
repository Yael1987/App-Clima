document.addEventListener('DOMContentLoaded', () => {

  const btnLocation = document.querySelector('.btn-location');
  const dateDiv = document.querySelector(".current-date");
  const locationDiv = document.querySelector(".location-info");
  const currentWeatherDiv = document.querySelector(".weather")

  btnLocation.addEventListener('click', async e => {
    const coords = await getLocationCoords();

    if (!coords.success) {
      console.log('Location access denied');
      return;
    }

    const weatherInfo = await getWeatherInfo(coords.data);

    // const {zoneName } = await getTimeZone(coords.data);
    const { timezone, current } = weatherInfo;
    
    if (!timezone) {
      console.log('Time zone not available');
      return;
    }

    const localTime = formatDate(new Date(), timezone);
    dateDiv.innerHTML = localTime;

    const cityInfo = await getCityByCoords(coords.data);

    const { city, country } = cityInfo.address;

    locationDiv.innerHTML = `Cd ${city} / ${country}`

    currentWeatherDiv.innerHTML = `${current.temp}&deg;`;

    console.log(weatherInfo);
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
  // url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=143328e49e68626ede078c0fb85e7c8d`;
  url = `https://api.openweathermap.org/data/3.0/onecall?lat=19.477489&lon=-99.045768&appid=143328e49e68626ede078c0fb85e7c8d&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      timezone: data.timezone,
      current: data.current
    };
  } catch (error) {
    console.log(error);
  }
}

async function getCityByCoords({lat, lng}) {
  // const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=19.400481&lon=-99.009125&zoom=10`;
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=19.477489&lon=-99.045768&zoom=10`;

  try {
    const response = await fetch(url);
    const data = response.json();

    return data;

  } catch (error) {
    
  }
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