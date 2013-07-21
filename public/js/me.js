function Me(){
}

Me.prototype = {
  update:function(odata){
    $.post('./update', odata, function(data){
    })
  },
  uphead:function(odata){
    $.post('./uphead', odata, function(data){
    });
  },
  chpass:function(odata){
    $.post('./chpass', odata, function(data){
    })
  },
  login:function(udata){
    $.post('./login', udata, function(data){
    
    })
  },
  signup:function(udata){
    $.post('./signup', udata, function(data){
    
    })
  }
}
