// crosswalk api doc:
// http://developer.factual.com/display/docs/Places+API+-+Crosswalk

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/t/crosswalk?filters={"factual_id":"57ddbca5-a669-4fcf-968f-a1c8210a479a","namespace":"yelp"}', function (error, res) {
  console.log(res.data);
});


factual.get('/t/crosswalk?filters={"namespace":"foursquare", "namespace_id":"4ae4df6df964a520019f21e3"}', function (error, res) {
  console.log(res.data);
});
