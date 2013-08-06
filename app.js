var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var setting = require('./settings');
var mongodb = require('./models/db.js');
var cronJob = require('cron').CronJob;

var app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname+'/public'));
app.use(express.cookieParser());
app.use(express.session({
  secret: setting.cookieSecret,
  store: new MongoStore({
    db:setting.db
    })
  })
);
app.use(app.router);

routes(app);

if('development' === app.get('env'))
  app.use(express.errorHandler());

http.createServer(app).listen(app.get('port'),function(){
  console.log("Express server listenning on port "+app.get('port'));
});


var job = new cronJob({
  cronTime: '00 00 * * 1-7',
  onTick:function(){
    console.log("tick");
    var loc = 0;
    mongodb.open(function(err, db){
      if(err){
        return console.log('db error');
      }
      db.collection('silencer', function(err, collection){
        if(err){
          console.log('col error');
          return mongodb.close();
        }
        collection.update({"op":1}, {$set:{"op":0}}, {multi:true},function(err, doc){
          loc = 1;
        });
      })
      db.collection('girl', function(err, collection){
        if(err){
          console.log('col error');
          return mongodb.close();
        }
        collection.update({"plike":{$gt:0.05}}, {$inc:{"plike":-0.05}}, {multi:true}, function(err, doc){
          while(!loc){}
          mongodb.close();
        })
      })
    })
  }
})
