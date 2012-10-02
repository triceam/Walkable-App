// diffs api doc:
// http://developer.factual.com/display/docs/Core+API+-+Diffs

var auth = require('./auth');
var Factual = require('../factual-api');
var factual = new Factual(auth.key, auth.secret);
factual.startDebug();

var now = new Date().getTime();
var start = now - 7*24*3600*1000; // last week

// callback to handle all the diffs
factual.get('/t/global/diffs?start='+start+'&end='+now, function (err, res) {
  console.log(res);
});

// callback to handle each diff
factual.get('/t/global/diffs?start='+start+'&end='+now, {
  customCallback: function (req) {

    req.on('response', function (response) {
      var data = "";

      var cb = function () {
        var idx;
        while (-1 != (idx = data.indexOf("\n"))) {
          var row = data.slice(0, idx);
          data = data.slice(idx + 1);
          if (row.length > 2) console.log(JSON.parse(row));
        }
      };

      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        data += chunk.toString();
        cb();
      });
      response.on('end', function () {
        if (data) cb();
      });
      response.on('close', function () {
        if (data) cb();
      });
      response.on('error', function (error) {
        console.log(error);
      });
    });

    req.end();
  }
});
