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

exports.getWeight = function(req,res){
  if (req.user.uid){
    var userid = req.user.uid;
    var query = {'userid': userid};
    weight
      .find(query,'weight',{sort:{date: -1},limit: 1},function(err,data){
        console.log(data);
        res.send(data);
      });
  }
}

exports.getWeightList = function(req,res){
  if (req.user.uid){
    var userid = req.user.uid;
    var query = {'userid': userid};
    weight
      .find(query,'weight date',{sort:{date: 1},limit: 30},function(err,data){
        console.log(data);
        var weightList = [];
        data.forEach(function(row){
          console.log('row:');
          console.log(row);
          var dateStrArray = row.date.split('-');
          var rowDate = new Date(dateStrArray[0],dateStrArray[1] - 1,dateStrArray[2]);
          weightList.push({time: rowDate.getTime(),count: row.weight});
        });
        res.send(weightList);
      });
  }
};

exports.setWeight = function(req,res){
  if (req.user.uid){
    var userid = req.user.uid;
    var d = new Date();
    var today = getDateString(d);
    var inputWeight = req.body.weight;
    var query = {'userid': userid,date: today};
    weight.find(query,'_id',{sort:{date: -1},limit:1},function(err,data){
      console.log(data);
      if (data[0]){
        weight.update({_id: data[0]._id},{$set: {weight: inputWeight}},function(err,data){
          var resultQuery = {'userid': userid };
          var result = 0;
          weight.find(resultQuery,'weight',{sort:{date: -1},limit:2},function(err,data){
            console.log(data);
            if (data[1]){
              result = (data[0].weight * 10 - data[1].weight * 10) / 10;
            }
            res.send({'result':result});
          });
        });
      }else{
        var newData = {weight: inputWeight,date: today,'userid': userid};
        var Weight = new weight(newData);
        Weight.save();
        res.send();
      }
    });
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

