// World Geographies doc:
// http://developer.factual.com/display/docs/World+Geographies
var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.get('/t/world-geographies?select=neighbors&filters={"factual_id":{"$eq":"08ca0f62-8f76-11e1-848f-cfd5bf3ef515"}}', function (error, res) {
  console.log(res.data);
});
