var http = require('http');

exports.output = function(req, res){
  res.send(req.headers.host);
};
