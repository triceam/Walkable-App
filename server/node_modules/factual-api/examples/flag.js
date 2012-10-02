// flag api doc:
// http://developer.factual.com/display/docs/Core+API+-+Flag

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

factual.post('/t/global/21EC2020-3AEA-1069-A2DD-08002B30309D/flag', {
  problem: "duplicate",
  user: "a_user_id",
  comment: "I think this is identical to 9d676355-6c74-4cf6-8c4a-03fdaaa2d66a"
}, function (error, res) {
  if (!error) console.log("success");
});
