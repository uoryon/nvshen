var canvas = require('canvas');
var fs = require('fs');

function pic(con){
  this.data = con;
}

pic.prototype = {
  save:function(dirdir, callback){
    var odata = this.data;
    var img = new canvas.Image;
    console.log(img);
    console.log(img.src);
    img.onload = function(){
      console.log('onload');
      var w = img.width;
      var h = img.height;
      console.log(w);
      console.log(h);
      var can = new canvas(w, h);
      console.log(can);
      var ctx = can.getContext('2d');
      ctx.drawImage(img, 0, 0);

      var out = fs.createWriteStream(dirdir);
      var stream = can.createPNGStream({
        bufsize : 2048,
        quality : 80
      });

      stream.on('data', function(chunk){
        console.log("write");
        out.write(chunk);
      });
      stream.on('end', function(){
        out.end();
        return callback({status:0, reason:"上傳成功!"});
      });
    }
    img.onerror = function(err){
      return callback({status:2, reason:"圖片存儲失敗"});
    }
    img.src = odata;
  }
}

module.exports = pic;
