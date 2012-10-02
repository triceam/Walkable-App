
window.POIUtil = {
    getCalculatedColor: function(poi) {

        var percent;
        if ( poi.travel_time_seconds > 0 ) {
            percent = poi.travel_time_seconds / 1200;
        }
        else {
            percent = poi["$distance"] / 3200;
        }

        if ( percent >=  0.75) {
            return "e87562";
        }
        else if (percent >= 0.4) {
            return "e8da62";
        }
        else return "52bf27";

    }
}