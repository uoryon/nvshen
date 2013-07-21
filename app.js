var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var setting = require('./settings');

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
