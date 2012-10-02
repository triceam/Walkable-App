// monetize api doc:
// http://developer.factual.com/display/docs/Places+API+-+Monetize

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/places/monetize', {q:"Fried Chicken,Los Angeles"}, function (error, res) {
  console.log(res.data);
});
