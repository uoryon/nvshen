var me;
$(function(){
  me = new Me();
  girl = new Girl();
  girl.ga(function(data){
    if(data.status == 0){
      for(var i = 0; i < data.girl.length; i++){
        $that = "<div class='girlone'>\
                  <img id='"+data.girl[i].gname+"' src='"+data.girl[i].head+"'>\
                  <div class='des'>\
                    <p>"+data.girl[i].gname+", "+data.girl[i].descri+"</p>\
                  </div>\
                  <div class='mani'>\
                    <input class='like' type='button'>\
                    <input class='dislike' type='button'>\
                    <input class='hate' type='button'>\
                  </div>\
                </div>";
        $('.list').append($that);
      }
      var uihelp = new uiHand();
    }
  })
});
