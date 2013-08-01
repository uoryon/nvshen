var me;
$(function(){
  me = new Me();
  girl = new Girl();
  girl.ga(function(data){
    if(data.status == 0){
      data.girl.sort(function compare(a, b){
        return b.like - a.like;
      });
      for(var i = 0; i < data.girl.length; i++){
        var rankk = "";
        if(i <= 2) {
          rankk = i+1;
        }
        girl.appTo($('.list'), rankk, data.girl[i]);
      }
      var uihelp = new uiHand();
    }
  })
});
