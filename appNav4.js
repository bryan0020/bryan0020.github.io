var x = document.getElementById("location");
var coor;

x.innerHTML = "";

window.setInterval(
    function () {
        getLocation();
    }, 
    1000
);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    coor = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    x.innerHTML = coor;
}
