/*
 * GET Login page.
 */

exports.index = function(req, res){
  res.render('login', { title: 'OSO 2014' });
};
