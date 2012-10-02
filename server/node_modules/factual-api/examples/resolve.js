// resolve api doc:
// http://developer.factual.com/display/docs/Places+API+-+Resolve

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

// resovle from name and address
factual.get('/places/resolve?values={"name":"huckleberry","address":"1014 Wilshire Blvd"}', function (error, res) {
  console.log(res.data);
});


// resolve from name and location
factual.get('/places/resolve?values={"name":"huckleberry","latitude":34.023827,"longitude":-118.49251}', function (error, res) {
  console.log(res.data);
});
