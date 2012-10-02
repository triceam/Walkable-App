// multi api doc:
// http://developer.factual.com/display/docs/Core+API+-+Multi

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();


var readQuery = factual.requestUrl('/t/places', {q:"starbucks", geo:{"$circle":{"$center":[34.041195,-118.331518],"$meters":1000}}});
var facetsQuery = factual.requestUrl('/t/places/facets', {q:"starbucks", filters:{"region":"CA"}, select:"locality", "min_count":20, limit:5});
factual.get('/multi', {queries:{
  read: readQuery,
  facets: facetsQuery
}}, function (error, res) {
  console.log('read:', res.read.response);
  console.log('facets:', res.facets.response);
});
