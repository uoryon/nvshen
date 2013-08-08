var crypto = require('crypto');
var User = require('../models/user');
var us = require('./us');
var ns = require('./ns');

module.exports = function(app){

  app.get('/', us.wc);
  app.get('/', us.index);
  app.get('/gupic/:user/:target', us.gupic);
  app.post('/login', us.login);
  app.all('/logout', us.logout);
  app.post('/signup', us.signup);
  app.post('/update', us.update);
  app.post('/uphead', us.uphead);
  app.post('/chpass', us.chpass);
  
  app.post('/upGirl', ns.upGirl);
  app.post('/hg', ns.hg);
  app.post('/up', ns.up);
  app.post('/sp', ns.sp);
  app.post('/gd', ns.gd);
  app.get('/gg', ns.gg);
  app.get('/gp', ns.gp);
  app.get('/getpic/:user/:girl/:target', ns.getpic);
  app.get('/ga', ns.ga);

  app.get(/(pic)(.+)/, function(req, res){
    return res.send({status:1, reason:"不允許你這樣看~\(≧▽≦)/~啦啦啦！"});
  })
}
