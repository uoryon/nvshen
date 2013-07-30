var mongodb = require('./db');
var pic = require('./pic');
var crypto = require('crypto');

function nvshen(girl){
  this.uname = girl.uname;
  this.head = girl.head || "/nvshen/pic/"+girl.uname+"/"+girl.gname+"/head.png";
  this.gname = girl.gname;
  this.descri = girl.descri || "";
  this.like = girl.like || 0;
  this.plike = girl.plike || 1;
}

nvshen.prototype = {
  add: function(username, callback){
    var ogirl = {
      uname: username,
      head: this.head,
      gname: this.gname,
      descri: this.descri,
      like: this.like,
      plike: this.plike
    }
    mongodb.open(function(err, db){
      if(err){
        return callback(err);
      }
      db.collection('girl', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.ensureIndex('gname', {'unique':'true'});
        collection.insert(ogirl, {safe:true}, function(err, girl){
          mongodb.close();
          callback(err, girl[0]);
        })
      })
    });
  },
  hg:function(tf, callback){
    var self = this;
    if(tf == 'inc' || tf= 'dec'){
      if(tf == 'inc'){
        this.plike*=1.2;
        this.like += plike;
      }
      else {
        this.plike*=1.2;
        this.like -= plike;
      }
      mongodb.open(function(err, db){
        if(err){
          return callback(err);
        }
        db.collection('girl', function(err, collection){
          if(err){
            mongodb.close();
            return callback(err);
          }
          collection.update({"uname":self.uname, "gname":self.gname},{$set:{"like":self.like, "plike":self.plike}}, function(err){
            mongodb.close();
            callback(err);
          });
        })
      })
    }
    else if(tf == 'hat'){
      mongodb.open(function(err, db){
        if(err){
          return callback(err);
        }
        db.collection('girl', function(err, collection){
          if(err){
            return callback(err);
          }
          collection.remove({"uname":self.uname,"gname":self.gname}, function(err){
            mongodb.close();
            callback(err);
          })
        })
      })
    }
  },
  up:function(odata, callback){
    var self = this;
    var oPic = new pic(odata.picurl);
    var tt = odata.date;
    var md5 = crypto.createHash('md5');
    var ddir = __dirname+'/../public/pic/'+self.uname+'/'+self.gname+'/'+md5.update(self.uname).digest('base64')+md5.update(tt).digest('base64')+'.png';

    oPic.save(ddir, function(err){
      if(err.status){
        return callback(err);
      }
      else{
        mongodb.open(function(err, db){
          if(err){
            return callback(err);
          }
          db.collection('gallery', function(err, collection){
            if(err){
              mongodb.close();
              return callback(err);
            }
            collection.insert(odata, {safe:true}, function(err, doc){
              mongodb.close();
              callback(err, doc);
            })
          })
        })
      } 
    })
  },
  gg:function(callback){
    var self = this;
    mongodb.open(function(err, db){
      if(err){
        callback(err);
      }
      db.collection('gallery', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.find({"uname":self.uname, "gname":self.gname}).toArray(function(err, doc){
          mongodb.close();
          callback(err, doc);
        })
      })
    })
  },
  gp:function(start, callback){
      var self = this;
      mongodb.open(function(err, db){
      if(err){
        callback(err);
      }
      db.collection('speaktoher', function(err,collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.find({"uname":self.uname,"gname":self.gname}).toArray(function(err, doc){
          mongodb.close();
          callback(doc);
        })
      })
    })
  },
  sp:function(odata, callback){
    var self = this;
    mongodb.open(function(err, db){
      if(err){
        return callback(err);
      }
      db.collection('speaktoher', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.insert(odata, {safe:true}, function(err){
          mongodb.close();
          callback(err);
        })
      })
    })
  }
}

nvshen.exist = function(username, girlname, callback){
  mongodb.open(function(err, db){
    if(err){
      return callback(err);
    }
    db.collection('girl', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({"uname":username, "gname":girlname}, function(err, doc){
        mongodb.close();
        callback(doc);
      });
    })
  })
}

nvshen.get = function(username, girlname, callback){
  mongodb.open(function(err, db){
    if(err){
      return callback(err);
    }
    db.collection('girl', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({"uname":username, "gname":girlname}, function(err, doc){
        mongodb.close();
        return callback(err, doc);
      })
    })
  })
}

nvshen.getAll = function(username, callback){
  mongodb.open(function(err, db){
    if(err){
      return callback(err);
    }
    db.collection('girl', function(err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.find({"uname":username}).toArray(function(err, doc){
        mongodb.close();
        //return doc.toArray(callback);
        return callback(err, doc);
      });
    });
  })
}


module.exports = nvshen;
