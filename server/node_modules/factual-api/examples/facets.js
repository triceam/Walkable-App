// facets api doc:
// http://developer.factual.com/display/docs/Core+API+-+Facets

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

// show count(at least 20) of starbucks for each city in ca
factual.get('/t/places/facets?q=starbucks&filters={"region":"CA"}&select=locality&min_count=20&limit=5', function (error, res) {
  console.log(res.data);
});
