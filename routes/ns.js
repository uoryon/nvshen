var Nvshen = require('../models/nvshen');
var canvas = require('canvas');
var pic = require('../models/pic');
var fs = require('fs');

exports.upGirl = function(req, res){
  Nvshen.exist(req.session.user.uname, req.body.gname, function(err){
    if(err){
      return res.send({status:2, reason:'女孩已存在'})
    }
    else{
      req.body.uname = req.session.user.uname;
      var nN = new Nvshen(req.body);
      nN.add(req.session.user.uname, function(data, girl){
        if(err){
          return res.send({status:1, reason:'網絡失敗'});
        }
        fs.mkdirSync(__dirname+'/../public/pic/'+req.session.user.uname+'/'+girl.gname);
        var oP = new pic(req.body.picurl);
        oP.save(__dirname+'/../public/pic/'+req.session.user.uname+'/'+girl.gname+'/head.png', function(data){
          return res.send({status:0, reason:'成功', 'girl':girl});
        })
      })
    }
  })
}

exports.hg = function(req, res){
  Nvshen.get(req.session.user.uname, req.body.gname, function(err, girl){
    if(err){
    }
    if(girl){
      var eGirl = girl;
      eGirl.hg(req.body.f, function(data){
        res.send(data);
      })
    }
  })
}

exports.up = function(req, res){
  Nvshen.get(req.session.user.uname, req.body.gname, function(err, girl){
    if(err){
      return res.send({status:1, reason:"網絡失敗"});
    }
    if(girl){
      var eGirl = girl;
      eGirl.up(req.body, function(err, girl){
        if(err){
          if(err.status == 2)res.send(err);
          else res.send({status:1, reason:'網絡失敗'});
        }
        else{
          res.send({status:0, "girl":girl})
        }
      })
    }
  })
}

exports.sp = function(req, res){
  Nvshen.get(req.session.user.uname, req.body.gname, function(err, girl){
    if(err){
      return res.send({status:1, reason:"網絡失敗"});
    }
    if(girl){
      var eGirl = girl;
      eGirl.sp(req.body, function(data){
        if(err){
          res.send({status:1, reason:"網絡錯誤"});
        }
        else{
          res.send({status:0, reason:"說成功了"})
        }
      })
    }
    else{
      res.send({status:2, reason:"女孩不存在"})
    }
  });
}

exports.gg = function(req, res){
  Nvshen.get(req.session.user.uname, req.body.gname, function(err, girl){
    if(err){
      return res.send({status:1, reason:"網絡失敗"});
    }
    if(girl){
      var eGirl = girl;
      eGirl.gg(function(err, data){
        res.send(data);
      })
    }
    else{
      res.send({status:2, reason:'所要的女生不存在'})
    }
  }) 
}

exports.gp = function(req, res){
  Nvshen.gp(req.session.user.uname, req.body.gname, req.body.start,function(err, data){
    if(err){
      return res.send({status:1, reason:"網絡失敗"});
    }
  });
}

exports.ga = function(req, res){
  Nvshen.getAll(req.session.user.uname, function(err, data){
    if(err){
      return res.send({status:1, reason:"網絡錯誤"});
    }
    if(data){
      res.send({status:0, reason:"獲取成功", girl:data});
    }
    else{
      res.send({status:2, reason:"沒有女孩"})
    }
  });
}

exports.gd = function(req, res){
  Nvshen.get(req.session.user.uname, req.body.gname, function(err, girl){
    if(err){
      return res.send({status:1, reason:"網絡錯誤"});
    }
    if(girl){
      var eGirl = girl;
      eGirl.gp(0, function(err, speak){
        if(err){
          return res.send({status:1, reason:"網絡錯誤"});
        }
        eGirl.gg(function(err, gal){
          if(err){
            return res.send({status:1, reason:"網絡錯誤"});
          }
          res.send({status:0, "speak":speak, "gal":gal});
        })
      })
    }
    else{
      res.send({status:2, reason:"已經存在女孩"})
    }
  })
}
