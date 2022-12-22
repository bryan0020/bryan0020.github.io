document.addEventListener("DOMContentLoaded", function() {
    let id;
    let target;
    let options;

    function success(pos) {
        const crd = pos.coords;

        // to show status of user location acquiration
        const status = document.querySelector('#nav-status');
        status.textContent = '';

        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
            console.log('Congratulations, you reached the target');
            navigator.geolocation.clearWatch(id);

            status.textContent = 'Successfully reached your target location';
        }
    }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);

        status.textContent = 'Unable to reach your target location';
    }

    target = {
        latitude : 3.155647,    // default: 0
        longitude: 101.714997   // default: 0
    };

    options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, error, options);

})