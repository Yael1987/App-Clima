const weatherThunderstorm = {
  //Tormenta clima
  200: {
    description: {
      full: ["Tormenta", "y", "lluvia ligera"],
      short: ["Tormeta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  201: {
    description: {
      full: ["Tormenta", "y", "lluvia"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  202: {
    description: {
      full: ["Tormenta", "y", "lluvia fuerte"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  210: {
    description: {
      full: ["Tormenta", "ligera"],
      short: ["Tormenta", "ligera"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  211: {
    description: {
      full: ["Tormenta"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  212: {
    description: {
      full: ["Tormenta", "fuerte"],
      short: ["Tormenta", "fuerte"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  221: {
    description: {
      full: ["Tormenta", "dispersa"],
      short: ["Tormenta", "dispersa"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  230: {
    description: {
      full: ["Tormenta", "y", "llovizna ligera"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  231: {
    description: {
      full: ["Tormenta", "y", "llovizna"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
  232: {
    description: {
      full: ["Tormenta", "y", "llovizna fuerte"],
      short: ["Tormenta"],
    },
    day: "cloud-bolt-sun",
    night: "cloud-bolt-moon",
  },
};

const weatherDrizzle = {
  //LLovizna clima
  300: {
    description: {
      full: ["Llovizna", "ligera"],
      short: ["Llovizna", "ligera"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  301: {
    description: {
      full: ["Llovizna"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  302: {
    description: {
      full: ["Llovizna", "fuerte"],
      short: ["Llovizna", "fuerte"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  310: {
    description: {
      full: ["Llovizna", "y", "lluvia"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  311: {
    description: {
      full: ["Llovizna", "y", "lluvia"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  312: {
    description: {
      full: ["Llovizna", "y", "lluvia"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  313: {
    description: {
      full: ["Llovizna", "y", "aguacero"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  314: {
    description: {
      full: ["Llovizna", "y", "aguacero fuerte"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  321: {
    description: {
      full: ["Llovizna", "intermitente"],
      short: ["Llovizna", "intermitente"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
};

const weatherRain = {
  //LLuvia
  500: {
    description: {
      full: ["Lluvia", "ligera"],
      short: ["Lluvia", "ligera"],
    },
    day: "cloud-sun-rain",
    night: "cloud-moon-rain",
  },
  501: {
    description: {
      full: ["Lluvia"],
      short: ["Lluvia"]
    },
    day: "cloud-rain",
    night: "cloud-rain",
  },
  502: {
    description: {
      full: ["Lluvia", "fuerte"],
      short: ["Lluvia", "fuerte"],
    },
    day: "cloud-rain",
    night: "cloud-rain",
  },
  503: {
    description: {
      full: ["Lluvia", "intensa"],
      short: ["Lluvia", "intensa"],
    },
    day: "cloud-showers-heavy",
    night: "cloud-showers-heavy",
  },
  504: {
    description: {
      full: ["Lluvia", "extrema"],
      short: ["Lluvia", "extrema"]
    },
    day: "cloud-showers-heavy",
    night: "cloud-showers-heavy",
  },
  511: {
    description: {
      full: ["Lluvia", "helada"],
      short: ["Lluvia", "helada"],
    },
    day: "cloud-rain",
    night: "cloud-rain",
  },
  520: {
    description: {
      full: ["Aguacero", "ligero"],
      short: ["Aguacero", "ligero"],
    },
    day: "cloud-sun-rain",
    night: "cloud-moon-rain",
  },
  521: {
    description: {
      full: ["Aguacero"],
      short: ["Aguacero"]
    },
    day: "cloud-showers-heavy",
    night: "cloud-showers-heavy",
  },
  522: {
    description: {
      full: ["Aguacero", "fuerte"],
      short: ["Aguacero", "fuerte"],
    },
    day: "cloud-showers-heavy",
    night: "cloud-showers-heavy",
  },
  531: {
    description: {
      full: ["Aguacero", "intermitente"],
      short: ["Aguacero", "intermitente"],
    },
    day: "cloud-showers-heavy",
    night: "cloud-showers-heavy",
  },
};

const weatherSnow = {
  //Snow
  600: {
    description: {
      full: ["Nieve", "ligera"],
      short: ["Nieve", "ligera"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  601: {
    description: {
      full: ["Nieve"],
      short: ["Nieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  602: {
    description: {
      full: ["Nieve", "abundante"],
      short: ["Nieve", "abundante"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  611: {
    description: {
      full: ["Aguanieve"],
      short: ["Aguanieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  612: {
    description: {
      full: ["Llovizna", "de", "aguanieve"],
      short: ["Aguanieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  613: {
    description: {
      full: ["Chubasco", "de", "aguanieve"],
      short: ["Aguanieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  615: {
    description: {
      full: ["Nieve", "y", "lluvia ligera"],
      short: ["Lluvia", "ligera"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  616: {
    description: {
      full: ["Nieve", "y", "lluvia"],
      short: ["Lluvia"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  620: {
    description: {
      full: ["Llovizna", "de", "nieve"],
      short: ["Llovizna"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  621: {
    description: {
      full: ["Chubazco", "de", "nieve"],
      short: ["Nieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  622: {
    description: {
      full: ["Tormenta", "de", "nieve"],
      short: ["Tormenta", "de nieve"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
};

const weatherAtmosphere = {
  //Atmosfera
  701: {
    description: {
      full: ["Niebla", "ligera"],
      short: ["Niebla", "ligera"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  711: {
    description: {
      full: ["Humo", "en", "el aire"],
      short: ["Humo"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  721: {
    description: {
      full: ["Neblina"],
      short: ["Neblina"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  731: {
    description: {
      full: ["Polvo", "en", "el aire"],
      short: ["Polvo"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  741: {
    description: {
      full: ["Niebla", "densa"],
      short: ["Niebla", "densa"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  751: {
    description: {
      full: ["Arena", "en", "el aire"],
      short: ["Arena"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  761: {
    description: {
      full: ["Polvo", "en", "el aire"],
      short: ["Polvo"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  762: {
    description: {
      full: ["Ceniza", "en", "el aire"],
      short: ["Ceniza"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  771: {
    description: {
      full: ["Tormenta", "breve"],
      short: ["Tormenta", "breve"],
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
  781: {
    description: {
      full: ["Tornado"],
      short: ["Tornado"]
    },
    day: "./src/img/icons/",
    night: "./src/img/icons/",
  },
};

const weatherClouds = {
  //Nubes
  800: {
    description: {
      full: ["Cielo", "despejado"],
      short: ["Cielo", "despejado"],
    },
    day: "sun",
    night: "moon",
  },
  801: {
    description: {
      full: ["Pocas nubes"],
      short: ["Pocas", "Nubes"],
    },
    day: "sun-cloud",
    night: "moon-cloud",
  },
  802: {
    description: {
      full: ["Nubes", "dispersas"],
      short: ["Nubes", "dispersas"],
    },
    day: "sun-cloud",
    night: "moon-cloud",
  },
  803: {
    description: {
      full: ["Nublado", "ligeramente"],
      short: ["Nublado", "ligeramente"],
    },
    day: "clouds-sun",
    night: "clouds-moon",
  },
  804: {
    description: {
      full: ["Nublado"],
      short: ["Nublado"],
    },
    day: "clouds",
    night: "clouds",
  },
};

const getWeatherDescription = (id, time, long = 'short') => {
  let dayTime;

  if (time < 6) {
    dayTime = "night";
  }else if (time >= 6 && time < 19) {
    dayTime = 'day';
  }else if (time >= 19 && time < 24) {
    dayTime = 'night';
  }

  if (id >= 200 && id < 300) {    
    return {
      description: weatherThunderstorm[id].description[long],
      iconUrl: weatherThunderstorm[id][dayTime],
    };
  }

  //Rain
  if (id >= 500 && id < 600) {
    return {
      description: weatherRain[id].description[long],
      iconUrl: weatherRain[id][dayTime]
    }
  }    

  //Clouds 
  if (id >= 800 && id <= 804) {
    return {
      description: weatherClouds[id].description[long],
      iconUrl: weatherClouds[id][dayTime]
    }
  }
}

export default getWeatherDescription;