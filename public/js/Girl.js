function Girl(girl){
}

Girl.prototype = {
  upGirl:function(odata, callback){
    $.post('./upGirl', odata, callback);
  },
  hg:function(odata, callback){
    $.post('./hg', odata, callback);
  },
  //up:function(odata, callback){
  //  $.post('./up', odata, callback);
  //},
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
    $.post('./gd', odata, callback);
  },
  share:function(odata, callback){
    $.post('./share', odata, callback);
  },
  appTo:function(doc, i, girl){
    $that = "<div class='girlone'>\
              <img id='"+girl.gname+"' src='./getpic/"+girl.uname+'/'+girl.gname+"/"+girl.head+"'>";
    if(i <= 3) $that += "<div class='ranked'>"+i+"</div>";
    $that += "<div class='des'>\
                <p>"+girl.gname+", "+girl.descri+"</p>\
              </div>\
              <div class='mani'>\
                <input class='like' type='button' >\
                <input class='dislike' type='button' >\
                <input class='hate' type='button' >\
                <input class='share' type='button' >\
              </div>\
            </div>";
    doc.append($that);
  }
}
