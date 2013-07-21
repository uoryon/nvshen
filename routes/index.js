var crypto = require('crypto');
var User = require('../models/user');
var us = require('./us');
var ns = require('./ns');

module.exports = function(app){

  app.get('/', us.wc);
  app.get('/', us.index);
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
  app.get('/gg', ns.gg);
  app.get('/gp', ns.gp);
  app.get('/ga', ns.ga);
}
