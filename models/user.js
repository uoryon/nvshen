var mongodb = require('./db');
var pic = require('./pic');

function User(user){
  this.uname = user.uname;
  this.password = user.password;
  this.head = user.head || "/nvshen/pic/"+user.uname+"/head.png";
  this.ch = user.ch && {
    nick: user.ch.nick || user.uname,
    birthday:user.ch.birthday || 0,
    email:user.ch.email||"",
    op: user.ch.op||"",
    hates:user.ch.hates||{}
  };
  this.unch = user.unch && {
    regtime: user.unch.regtime || 0
  };
}
User.prototype = {
  save:function(callback){
    var reTime = new Date().getTime();
    this.unch.regtime = reTime;
    var user = {
      uname: this.uname,
      password: this.password,
      head: this.head,
      ch:this.ch,
      unch: this.unch,
    }
    console.log(user);
    mongodb.open(function(err, db){
      if(err){
        return callback(err);
      }
      db.collection('silencer', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.ensureIndex('uname', {unique:true});
        collection.insert(user, {safe:true}, function(err, user){
          mongodb.close();
          callback(err, user);
        });
      });
    });
  },
  update:function(och,callback){
    var self = this;
    mongodb.open(function(err, db){
      db.collection('silencer',function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.update({uname:self.uname}, {$set:{ch:och}}, function(err,doc){
          mongodb.close();
          console.log(err);
          callback(err, doc);
        });
      })
    });
  },
  uphead:function(picurl, callback){
    var oPic = new pic(picurl);
    oPic.save(__dirname+'/../public/pic/'+req.session.user.uname+'/head.png', function(err){
      callback(err);  
    })
  },
  chpass:function(newpass, callback){
    var self = this;
    mongodb.open(function(err, db){
      if(err){
        mongodb.close();
        return callback(err);
      }
      db.collection('silencer', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.update({uname:this.uname},{$set:{password:newpass}},function(err,doc){
          mongodb.close();
          console.log(err);
          callback(err, doc);
        })
      })
    })
  }
}
User.exist = function(username, callback){
  mongodb.open(function(err, db){
    db.collection('silencer', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({uname:username}, function(err, doc){
        mongodb.close();
        if(doc){
          user = new User(doc);
          callback(err, user);
        }
        else{
          callback(err, null);
        }
      })
    });
  });
}
User.login = function(user, callback){
  mongodb.open(function(err, db){
    db.collection('silencer', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({uname:user.uname, password:user.password}, function(err, doc){
        mongodb.close();
        console.log(err);
        if(doc){
          user = new User(doc);
          callback(err, user);
        } 
        else{
          callback(err, null);
        }
      });
    });
  });
}

User.hged = function(username, callback){
  mongodb.open(function(err, db){
    db.collection('silencer', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({uname:username, password:user.password}, function(err, doc){
        mongodb.close();
        console.log(err);
        callback(err, doc.op);
      });
    });
  });
}

module.exports = User;
