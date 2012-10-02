var fs = require('fs');
var path = require("path");

var qs    = require('querystring');
var OAuth = require('oauth').OAuth;

var DRIVER_VERSION = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), 'utf8')).version;
var FACTUAL_API_BASE_URI = 'http://api.v3.factual.com';
var DRIVER_HEADER = 'factual-nodejs-driver-' + DRIVER_VERSION;

var Requester = function (key, secret) {
  var customHeaders = {
    "Accept": "*/*",
    "Connection": "close",
    "User-Agent": "Node authentication",
    "X-Factual-Lib": DRIVER_HEADER
  };
  this.oauth = new OAuth(null, null, key, secret, '1.0', null, 'HMAC-SHA1', null, customHeaders);
  this.debug = false;
};

Requester.prototype = {

  startDebug: function () {
    this.debug = true;
  },

  stopDebug: function () {
    this.debug = false;
  },

  setBaseURI: function (baseURI) {
    this.baseURI = baseURI;
  },

  get: function () {
    var req = this.parseRequestArgs(arguments);
    req.method = 'get';
    return this.request(req);
  },

  url: function () {
    var req = this.parseRequestArgs(arguments);
    this.setFullUrl(req);
    return req.url;
  },

  post: function () {
    var req = this.parseRequestArgs(arguments);
    req.method = 'post';
    return this.request(req);
  },

  put: function () {
    var req = this.parseRequestArgs(arguments);
    req.method = 'put';
    return this.request(req);
  },

  delete: function () {
    var req = this.parseRequestArgs(arguments);
    req.method = 'delete';
    return this.request(req);
  },

  request: function (req) {
    if (this.urlRequest(req.method)) {
      this.setFullUrl(req);
      var callback = req.callback ? this.getCallback(req) : null;
      var oauthReq = this.oauth[req.method](req.url, null, null, callback);
    } else {
      var callback = req.callback ? this.getCallback(req) : null;
      var oauthReq = this.oauth[req.method](req.url, null, null, req.raw.query, "application/x-www-form-urlencoded", callback);
    }

    if (req.customCallback) {
      req.customCallback(oauthReq);
    }
  },

  setFullUrl: function (req) {
    if (req.data) {
      var connector = req.url.match(/\?/) ? '&' : '?';
      req.url += connector + req.data;
      req.data = null;
    }
  },

  parseRequestArgs: function (args) {
    var req = {};
    req.raw = {};
    req.raw.path = args[0];
    var path = encodeURI(args[0]);
    req.url = path.match(/^\//) ? (this.baseURI || FACTUAL_API_BASE_URI) + path : path;

    if (args.length == 2) {
      req.data = null;
    } else {
      req.raw.query = args[1];
      req.data = this.getDataString(args[1]);
    }

    var lastArg = args[args.length -1]; 
    if ((typeof lastArg) == 'function') {
      req.callback = lastArg;
    } else if ((typeof lastArg) == 'object') {
      if (lastArg.customCallback) {
        req.callback = null;
        req.customCallback = lastArg.customCallback;
      }
    }

    return req;
  },

  urlRequest: function (method) {
    return (method == 'get' || method == 'delete'); 
  },

  multiRequest: function (req) {
    return req.url.match(/\/multi\?/) ? true : false;
  },

  diffsRequest: function (req) {
    return req.url.match(/\/diffs\?/) ? true : false;
  },

  getDataString: function (query) {
    if (query instanceof Object) {
      var stringifiedQuery = {};
      for (var p in query) stringifiedQuery[p] = (query[p] instanceof Object) ? JSON.stringify(query[p]) : query[p];
      return qs.stringify(stringifiedQuery);
    }
    return query;
  },

  getCallback: function (req) {
    var isDebug = this.debug;
    var isMulti = this.multiRequest(req);
    var isDiffs = this.diffsRequest(req);
    var cb = req.callback;

    return function (error, data, response) {
      var debugInfo = {};

      if (isDebug) {
        debugInfo.driverVersion = DRIVER_VERSION;
        debugInfo.request = {};
        debugInfo.request.method = req.method;
        debugInfo.request.path = req.raw.path;
        if (req.raw.query) debugInfo.request.query = req.raw.query;
        debugInfo.request.url = req.url;
        if (req.data) debugInfo.request.data = req.data;
      }

      if (error) {
        if (isDebug) {
          debugInfo.error = error;
          debugInfo.errorType = 'request';
          console.warn(debugInfo);
        }
        return cb(new Error(error.message), null);
      }

      if (isDebug) {
        debugInfo.request.header = response.client._httpMessage._header;
        debugInfo.response = {};
        debugInfo.response.statusCode = response.statusCode;
        debugInfo.response.header = response.headers;
        debugInfo.response.data = data;
      }

      if (isDiffs) {
        return cb(null, data);
      };

      try {
        var res = JSON.parse(data);
      } catch (err) { 
        if (isDebug) {
          debugInfo.error = err;
          debugInfo.errorType = 'response';
          console.warn(debugInfo);
        }
        return cb(new Error(err.message), null);
      }

      if (isDebug) debugInfo.response.object = res;
      if (isMulti) {
        cb(null, res);
      } else {
        if (res.status != "ok") {
          debugInfo.error = res;
          debugInfo.errorType = 'factual';
          if (isDebug) console.warn(debugInfo);
          cb(new Error(res.message), null);
        } else {
          if (isDebug) console.warn(debugInfo);
          cb(null, res.response);
        }
      }
    };
  }
};


module.exports = Requester;
