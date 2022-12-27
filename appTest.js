const watchId = '';

setInterval(function () {
    watchId = navigator.geolocation.watchPosition(
        position => console.log(position)
    );
}, 5000)

function buttonClickHandler(watchId) {
    // Cancel the updates when the user clicks a button.
    navigator.geolocation.clearWatch(watchId);
}
