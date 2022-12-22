// ask permission when page load
document.addEventListener("DOMContentLoaded", function() {

    geoFindMe();

})


function geoFindMe() {

    // to show status of user location acquiration
    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    // if successfully get location
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
        status.textContent = 'Failed to retrieve your location';
    }
  
    // getCurrentPosition(success, error, options) - options, long maximumAge, long timeout, boolean enableHighAccuracy
    // maximumAge - device cache position, timeout, if enableHighAccuracy true - get best position, default false
    if (!navigator.geolocation) {
        Content = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
