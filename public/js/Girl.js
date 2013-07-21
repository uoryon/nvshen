function Girl(girl){
}

Girl.prototype = {
  fill:function(odata){
    $.post('./upGirl', odata, function(data){
      console.log(data);
    });
  },
  hg:function(odata){
    $.post('./hg', odata, function(data){
      console.log(data);
    })
  },
  up:function(odata){
    $.post('./up', odata, function(data){
      console.log(data);
    })
  },
  sp:function(odata){
    $.post('./sp', odata, function(data){
      console.log(data);
    })
  },
  gg:function(odata){
    $.post('./gg', odata, function(data){
      console.log(data);
    })
  },
  gp:function(odata){
    $.post('./gp', odata, function(data){
      console.log(data);
    })
  }
}
