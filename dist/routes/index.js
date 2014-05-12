
/*
 * GET home page.
 */

var model = require('../model.js'),
    User = model.User;

exports.index = function(req, res){
  res.render('index', { title: 'OSO 2014' });
};

exports.authlogin = function(req,res){
  // console.log(req.user);
  var userid = req.user.uid;
  var query = {id: userid};
  User.find(query,function(err,data){
    console.log('-----');
    console.log(err);
    console.log(data);
    if(err){
        console.log(err);
    }
    if (data == ''){
      var userName = req.user._json.name;
      var userData = {
        id: userid,
        name: userName
      };
      console.log(userData);
      var NewUser = new User(userData);
      NewUser.save(function(err){
        if(err){
            console.log(err);
            res.redirect('/login');
        }else{
            console.log('saveok');
            res.redirect('/');
        }
      });
      // res.render('index', { title: 'OSO 2014' });
    }else{
      req.session.user = userid;
      // res.redirect('/');
      res.render('index', { title: 'OSO 2014' });
    }
  });
  // res.render('index', { title: 'OSO 2014' });
}
