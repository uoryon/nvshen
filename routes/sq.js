var mongodb = require('../models/db.js');

exports.imo = function(req, res){
  mongodb.open(function(err, db){
    if(err){
      return res.send({status:1, kaka:1});
    }
    db.collection('gallery', function(err, collection){
      if(err){
        mongodb.close();
        return res.send({status:1, kaka:1})
      }
      collection.find({'share':1}).toArray(function(err, doc){
        mongodb.close();
        if(err){
          return res.send({status:1, kaka:1})
        }
        console.log(doc);
        var girlsrc = [];
        doc.forEach(function(e){
          girlsrc.push({
            'gname':e.gname,
            'descri':e.descri,
            'picurl':e.picurl,
            'uname':e.uname
          })
        })
        console.log("for squre");
        res.render('square', {"girlsrc":girlsrc})
      })
    })
  });
}
