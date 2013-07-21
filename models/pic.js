function pic(con){
  this.data = pic;
}

pic.prototype = {
  save:function(dirdir, callback){
    var data = this.pic;
    var img = new canvas.Image;

    img.onload = function(){
      var w = img.width;
      var h = img.height;
      var can = new canvas(w, h);
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
    img.src = data;
  }
}

module.exports = pic;
