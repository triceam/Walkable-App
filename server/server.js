var express = require('express');
var app = express();

var request = require('request');

//factual nodejs api here: http://blog.factual.com/factual-node-js-driver
var Factual = require('factual-api');
var factual = new Factual('YOUR KEY', 'YOUR SECRET');

var FACTUAL_RADIUS_METERS = 20000;
var MAX_WALK_TIME_SECONDS = 1200;
var MAX_NON_WALKING_DISTANCE = 4000;

//travel time details here: http://www.traveltimeapp.com/
var TT_DATA_URL = "http://api.igeolise.com/time_filter";
var TT_MAPS_URL = "http://api.igeolise.com/time_map";
var TT_APP_ID = "YOUR APP ID";
var TT_APP_KEY = "YOUR APP KEY";


app.get('/', function(req, res){

    res.send( "Hello, use the API or go away!" );
});

app.get('/restaurants-api', function(req, res){

    var q = req.query["q"];
    var ll = req.query["ll"];
    var tokens = ll.split(",");
    var lat = 0, lon = 0;

    if (tokens.length == 2) {

        //todo, check if valid numbers & within appropriate bounds

        lat = parseFloat(tokens[0]);
        lon = parseFloat(tokens[1]);
    }
    else {
        //would be better to throw an error, but sending empty response for now
        writeEmptyResponse( res );
        return;
    }

    //http://api.v3.factual.com/t/restaurants-us
    //get source data points from factual
    factual.get('/t/restaurants-us',{q:q, sort:"$distance:asc", limit:50, geo:{"$circle":{"$center":[lat,lon],"$meters":FACTUAL_RADIUS_METERS}}, "include_count":"true"}, function (factual_error, factual_res) {
    
        if (!factual_res.data) {
            writeEmptyResponse( res );
            return;
        }

        var data = factual_res.data;
        var points = [];
        var map = {};

        for (var x=0; x<data.length; x++) {
            var item = data[x];
            points.push({
                id:  item.factual_id,
                lat: item.latitude,
                lng: item.longitude
            });
            map[item.factual_id] = item;
        }
        //console.log( points );


        if ( factual_res.data.length > 0 ) {

            var params = {
                "format": "json",
                "origin": {"lat": lat, "lng": lon},
                "travel_time": MAX_WALK_TIME_SECONDS,
                "mode": "walking_train",
                "points": points
            }

            var headers = {
                "X-app-id": TT_APP_ID,
                "X-app-key": TT_APP_KEY
            }


            //rank by walking distance (time in seconds)
            request({url:TT_DATA_URL, method:"POST", json:params, headers:headers}, function (tt_error, tt_res, tt_body) {

                var output = [];

                if (!tt_error && tt_res.statusCode == 200) {

                    var result = eval(tt_body);
                    //console.log( result.length )

                    if ( result.length > 0 ){
                        for (var x=0; x<result.length; x++) {
                            var item = result[x];
                            for ( var key in item ){
                                //console.log( key, item )
                                var target = map[key];
                                if ( target ){
                                    target[ "travel_time_seconds"] = item[key];
                                    target[ "travel_time_formatted"] = formatTime( item[key] );
                                    target[ "distance"] = formatDistance( target["$distance"] );
                                    output.push(target);
                                }
                            }
                        }

                        output = output.sort(function(a,b){return a.travel_time_seconds - b.travel_time_seconds});

                        delete params.points;
                        request({url:TT_MAPS_URL, method:"POST", json:params, headers:headers}, function (ttt_error, ttt_res, ttt_body) {
                            //console.log(ttt_body);

                            if (!tt_error && tt_res.statusCode == 200) {

                                var polygons = eval(ttt_body);
                                var result = {
                                    points: output,
                                    polygons: polygons
                                }

                                res.send(JSON.stringify(result));
                            }
                            else  {
                                writeEmptyResponse( res );
                            }
                        });
                    }
                    else {
                        writeNonWalkingResponse( data, map, res );
                    }


                }
                else  {

                    writeNonWalkingResponse( data, map, res );
                }

            });

        } else {
            writeEmptyResponse( res );
        }

    });

});

function writeEmptyResponse( res ) {
    var result = {
        points: [],
        polygons: []
    }
    res.send(JSON.stringify(result));
}

function writeNonWalkingResponse(data, map, res) {

    var output = [];

    for (var x=0; x<data.length; x++) {
        var item = data[x];

        if ( item && item["$distance"] < MAX_NON_WALKING_DISTANCE ){
            item[ "travel_time_seconds"] = -1;
            item[ "travel_time_formatted"] = formatTime( item );
            item[ "distance"] = formatDistance( item["$distance"] );
            output.push(item);
        }
    }

    output = output.sort(function(a,b){return a.distance - b.distance});

    var result = {
        points: output,
        polygons: []
    }
    res.send(JSON.stringify(result));
}

function formatTime( timeInSeconds ) {

    var mins = Math.floor( timeInSeconds/60 )+1;
    return mins + " mins";//, " + seconds + " sec";
}

function formatDistance( meters ) {

    var miles = meters * 0.000621371;
    return miles.toFixed(2);
}


app.listen(3000);
console.log('Listening on port 3000');