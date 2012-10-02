// geocode api doc:
// http://developer.factual.com/display/docs/Places+API+-+Reverse+Geocoder 

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/places/geocode', {geo:{"$point":[34.06021,-118.41828]}}, function (error, res) {
  console.log(res.data);
});
