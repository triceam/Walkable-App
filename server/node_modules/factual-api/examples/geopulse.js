// geopulse api doc:
// http://developer.factual.com/display/docs/Places+API+-+Geopulse 

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/places/geopulse', {geo:{"$point":[34.06021,-118.41828]}}, function (error, res) {
  console.log(res.data);
});
