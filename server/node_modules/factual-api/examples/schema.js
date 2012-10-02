// schema api doc:
// http://developer.factual.com/display/docs/Core+API+-+Schema

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/t/places/schema', function (error, res) {
  console.log(res.view);
});
