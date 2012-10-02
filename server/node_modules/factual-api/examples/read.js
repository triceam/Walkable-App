// read api doc:
// http://developer.factual.com/display/docs/Core+API+-+Read

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

// Fulltext search doc:
// http://developer.factual.com/display/docs/Core+API+-+Search+Filters
factual.get('/t/places?q=starbucks&include_count=true', function (error, res) {
  console.log("show "+ res.included_rows +"/"+ res.total_row_count +" rows:", res.data);
});

// Filter syntax:
// http://developer.factual.com/display/docs/Core+API+-+Row+Filters
factual.get('/t/places?q=starbucks&filters={"region":"CA"}', function (error, res) {
  console.log(res.data);
});

factual.get('/t/places?q=starbucks&filters={"$or":[{"region":{"$eq":"CA"}},{"locality":"newyork"}]}', function (error, res) {
  console.log(res.data);
});

// Geo filter doc:
// http://developer.factual.com/display/docs/Core+API+-+Geo+Filters
factual.get('/t/places?q=starbucks&geo={"$circle":{"$center":[34.041195,-118.331518],"$meters":1000}}', function (error, res) {
  console.log(res.data);
});
