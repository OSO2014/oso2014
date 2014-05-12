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
  date: Date,
  weight: Number
},{collection: 'weight'});

exports.User = db.model('User', userSchema);
exports.Weight = db.model('Weight', weightSchema);

