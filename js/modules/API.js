export default class API {
  constructor() {
  }

  callGeolocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position =>
            resolve({
              success: true,
              data: {
                // lat: position.coords.latitude,
                // lng: position.coords.longitude,
                position
              },
            }),
          error =>
            resolve({
              success: false,
              message: "Geolocation permission denied",
            })
        );
      } else {
        resolve({
          success: false,
          message: "Geolocation not supported for this browser"
        })
      }
    });
  }
}