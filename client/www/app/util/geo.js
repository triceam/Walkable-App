navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
    var lastCheckedPosition;
    var locationEventCount = 0;

    options = options || {};

    var checkLocation = function (position) {
        lastCheckedPosition = position;
        ++locationEventCount;
        // We ignore the first event unless it's the only one received because some devices seem to send a cached
        // location even when maxaimumAge is set to zero
        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 0)) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        } else {
            geoprogress(position);
        }
    }

    var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    }

    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
    }

    var foundPosition = function (position) {
        geolocationSuccess(position);
    }

    if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
    if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

    var watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    var timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
}