"use strict";

var mongoose = require('mongoose'),
    url = 'mongodb://localhost/oso2014weight',
    Schema = mongoose.Schema;

var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

var userSchema = new Schema({
  id: String,
  name: String,
  hope: Number
},{collection: 'user'});

var weightSchema = new Schema({
  userid: String,
  date: String,
  weight: Number
},{collection: 'weight'});

var user = db.model('User', userSchema);
var weight = db.model('Weight', weightSchema);

exports.User = user;
exports.Weight = weight;

exports.getUser = function(req, res){
  if (req.user.uid){
    var userid = req.user.uid;
    var query = {id: userid};
    user.find(query,function(err,data){
      if(err){
        res.send();
      }else{
        // req.session.user = userid;
        res.send(data);
      }
    });
  }else{
    res.send();
  }
}

exports.setUserData = function(req, res){
  var userid = req.user.uid;
  if (userid){
    console.log(req.body);
    var data = req.body;
    var userWhere = {id: userid};
    var userData = {
      name: data.userName,
      hope: data.hopeWeight
    };
    user.update(userWhere,userData,function(err, numberAffected, raw){
      var d = new Date();
      var weightData = {
        'userid': userid,
        date: getDateString(d),
        weight: data.todayWeight
      }
      var Weight = new weight(weightData);
      Weight.save();
      res.send();
    });
  }else{
    res.send();
  }
}

function getDateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getFullYear()+'-'
      + pad(d.getMonth()+1)+'-'
      + pad(d.getDate())
}

