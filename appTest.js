let watchId = '';

setInterval(function () {
    watchId = navigator.geolocation.watchPosition(
        position => console.log(position)
    );
    console.log("SetInterval: " + watchId);
}, 5000)

function buttonClickHandler() {
    // Cancel the updates when the user clicks a button.
    navigator.geolocation.clearWatch(watchId);
    console.log("StopInterval: " + watchId);
}
