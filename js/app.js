document.addEventListener('DOMContentLoaded', () => {

  const btnLocation = document.querySelector('.btn-location');

  btnLocation.addEventListener('click', async e => {
    const coords = await getLocationCoords();

    console.log(coords);
  })

  init();
});

function getLocationCoords() {
  return new Promise(resolve => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => 
        resolve({
          success: true,
          coords: position.coords,
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

function init() {
  
}