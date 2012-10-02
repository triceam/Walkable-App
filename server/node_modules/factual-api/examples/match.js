// Match api doc:
// http://developer.factual.com/display/docs/Places+API+-+Match 

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

// match from name and address
factual.get('/places/match?values={"name":"huckleberry","address":"1014 Wilshire Blvd"}', function (error, res) {
  console.log(res.data);
});


// match from name and location
factual.get('/places/match?values={"name":"huckleberry","latitude":34.023827,"longitude":-118.49251}', function (error, res) {
  console.log(res.data);
});
