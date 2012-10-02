// submit api doc:
// http://developer.factual.com/display/docs/Core+API+-+Submit

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.post('/t/global/submit', {
  values: JSON.stringify({
    name: "Factual North",
    address: "1 North Pole",
    latitude: 90,
    longitude: 0
  }),
  user: "a_user_id"
}, function (error, res) {
  console.log(res);
});
