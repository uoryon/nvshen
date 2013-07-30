function Girl(girl){
}

Girl.prototype = {
  upGirl:function(odata, callback){
    $.post('./upGirl', odata, callback);
  },
  hg:function(odata, callback){
    $.post('./hg', odata, callback);
  },
  up:function(odata, callback){
    $.post('./up', odata, callback);
  },
  sp:function(odata, callback){
    $.post('./sp', odata, callback);
  },
  gg:function(odata, callback){
    $.post('./gg', odata, callback);
  },
  gp:function(odata, callback){
    $.post('./gp', odata, callback);
  },
  ga:function(callback){
    $.get('./ga', callback);
  },
  gd:function(odata, callback){
    $.get('./gd', odata, callback);
  }
}
