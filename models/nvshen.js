var mongodb = require('./db');
var pic = require('./pic');
var crypto = require('crypto');
var fs = require('fs');
var util = require('util');

function nvshen(girl){
  this.uname = girl.uname;
  this.head = girl.head || "head.png";
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
    var loc = 0;
    if(tf == 'inc' || tf == 'dec'){
      if(tf == 'inc'){
        this.plike  *= 1.2;
        this.like = 1 + Math.sqrt(4 - 2 * (this.plike - 2));
      }
      else {
        this.plike  *=0.8;
        this.like = 1 + Math.sqrt(4 - 2 * (this.plike - 2));
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
            loc = 1;
            callback(err);
          });
        })
        db.collection('silencer', function(err, collection){
          if(err){
            mongodb.close();
            return callback(err);
          }
          collection.update({"uname":self.uname}, {$set:{"op":1}}, function(err){
            while(!loc){}
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
            loc = 1;
            callback(err);
          })
        })
        db.collection('silencer', function(err, collection){
          if(err){
            return callback(err);
          }
          collection.update({"uname":self.uname}, {$push:{"hates":self.gname}}, function(err){
            while(!loc){}
            mongodb.close();
            callback(err);
          })
        })
      })
    }
  },
  up:function(odata, callback){
    var self = this;
    var tt = odata.date.toString();
    var md5 = crypto.createHash('md5');
    console.log(odata.name);
    var tname = odata.name.split('.');
    var tn = tname[tname.length-1];
    var stin = self.uname + tt;
    var rdir = md5.update(stin).digest('base64')+'.'+tn;
    var ddir = __dirname+'/../private/'+self.uname+'/'+self.gname+'/'+rdir;
    var tmppath = odata.path;
    
    fs.rename(tmppath, ddir, function(err){
      if(err){
        console.log("rename err");
        return callback(err);
      }
      else{
        //fs.unlink(tmppath, function(err){ 
        //  console.log(err);
        //});
        mongodb.open(function(err, db){
          if(err){
          console.log("db open err");
            return callback(err);
          }
          db.collection('gallery', function(err, collection){
            if(err){
              mongodb.close();
              console.log("dbs err");
              return callback(err);
            }
            collection.insert({uname:self.uname, gname:self.gname, descri:odata.descri, date:odata.date, picurl:rdir}, {safe:true}, function(err, doc){
              mongodb.close();
              console.log("ins err");
              console.log(err);
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
          callback(err, doc);
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
  },
  share:function(callback){
    var self = this;
    mongodb.open(function(err, db){
      if(err){
        return callback(err);
      }
      db.collection('gallery', function(err, collection){
        if(err){
          mongodb.close();
          return callback(err);
        }
        collection.find({"gname":self.gname, "uname":self.uname}).toArray(function(err, doc){
          var BUF_LENGTH = 64 * 1024;
          var _buff = new Buffer(BUF_LENGTH);
          doc.forEach(function(e){
            e["share"]=1;
            console.log(e.picurl);
            var srcFile = __dirname+"/../private/"+self.uname+"/"+self.gname+"/"+e.picurl;
            var destFile = __dirname+"/../public/pubpic/"+e.picurl;
            console.log(srcFile);
            console.log(destFile);
            var fdr = fs.openSync(srcFile, 'r');
            var fdw = fs.openSync(destFile, 'w');
            var bytesRead = 1;
            var pos = 0;
            while (bytesRead > 0) {
              bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
              fs.writeSync(fdw, _buff, 0, bytesRead);
              pos += bytesRead;
            }
            fs.closeSync(fdr);
            fs.closeSync(fdw);
            console.log("try to write");
            collection.save(e);
          })
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
