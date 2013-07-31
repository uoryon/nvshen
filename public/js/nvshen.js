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
        girl.appTo($('.list'), data.girl[i]);
      }
      var uihelp = new uiHand();
    }
  })
});
