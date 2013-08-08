var crypto = require('crypto');
var fs = require('fs');
var canvas = require('canvas');
var User = require('../models/user');

exports.wc = function(req, res, next){
  if(!req.session.user){
    return res.render('log', {title:'來吧， 記錄自己的女神'});
  }
  next();
}

exports.index = function(req, res){
  console.log(req.session.user);
  var tmpUser = req.session.user;
  var regtt = new Date(tmpUser.unch.regtime).toLocaleDateString();
  console.log(tmpUser.head);
  res.render('index', {
    title:'我的女神--'+tmpUser.ch.nick,
    nick:tmpUser.ch.nick,
    uname:tmpUser.uname,
    regtime:regtt,
    birthday:tmpUser.ch.birthday,
    email:tmpUser.ch.email,
    head:tmpUser.head
  });
}

exports.gupic = function(req, res){
  console.log(req.params);
  if(req.params.user != req.session.user.uname) return res.send({status:1, reason:"你試圖訪問別人的女孩"});
  var ladir = __dirname+'/../private/'+req.params.user+'/'+req.params.target;
  console.log(ladir);
  var lala = fs.readFile(ladir, function(err, img){
    res.attachment(ladir);
    res.end(img, 'binary');
  });

}

exports.login = function(req, res){
  console.log(req.body);
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var tUser = {
    uname:req.body.uname,
    password:password
  };
  User.login(tUser, function(err, user){
    if(err){
      res.send({status:1, reason:"網絡失敗"});
    }
    if(user){
      req.session.user = user;
      res.send({status:0, reason:"登錄成功", url:"/nvshen"});
    }
    else{
      res.send({status:2, reason:"用戶名密碼錯誤"});
    }
  });
}

exports.logout = function(req, res){
  req.session.user = null;
  res.redirect('/nvshen');
}
exports.update = function(req, res){
  var eUser = new User(req.session.user);
  eUser.update(req.body.ch, function(err){
    if(err){
      res.send({status:1, reason:"更新失敗"});
    }
    else{
      //res.send({status:0, reason:"更新成功"})
      eUser.uphead(req.body.picurl, function(err){
        res.send({status:0, reason:"allokey"});
      })
    }
  })
}

exports.uphead = function(req, res){
  req.session.user.uphead(req.body.picurl, function(err){
    if(err){
      res.send({status:1, reason:"更新失敗"});
    }
    else{
      res.send({status:0, reason:"更新成功"})
    }
  });
}

exports.chpass = function(req, res){
  console.log('achieve backend');
  var md5 = crypto.createHash('md5');
  var oripass = md5.update(req.body.oripass).digest('base64');
  var eUser = req.session.user;
  if(eUser.password != oripass){
    res.send({status:2, reason:"密碼不正確"});
  }
  var newpass = md5.update(req.body.newpass).digest('base64');
  eUser.chpass(newpass, function(err){
    if(err){
      res.send({status:1, reason:"修改失敗"});
    }
    else{
      res.send({status:0, reason:"修改成功"});
    }
  })
}

exports.signup = function(req, res){
  if(!(req.body.uname && req.body.password)){
    return res.send({status:0, reason:"判斷用戶名密碼失敗"});
  }
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    uname:req.body.uname,
    password:password,
    ch:req.body.ch || {},
    unch:req.body.unch || {}
  });
  console.log(newUser);
  User.exist(newUser.name, function(err, user){
    if(user){
      return res.send({status:2, reason:"用戶名存在"});
    }
    console.log(user);
    newUser.save(function(err){
      if(err){
        return res.send({status:1, reason:"存儲失敗"});
      }
      fs.mkdirSync(__dirname+'/../private/'+newUser.uname);
      res.send({status:0, reason:"註冊成功"});
    });
  });
};
