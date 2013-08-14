$(function(){
  var girlsrc = JSON.parse($('.content').attr("data-img"));
  var len = girlsrc.length;
  var intext = "";
  for(var i = 0; i < len;){
    var ka = Math.floor(Math.random()*10)%8+1;
    if(ka > len - i){
      ka = len - i;
    }
    intext+="<div class='item'>";
    for(var j = 0; j < ka; j++, i++){
      intext+="<div><img src='/nvshen/pubpic/"+girlsrc[i].picurl+"'></div>"
    }
    intext+="</div>";
  }
  $('.gallery .inside').append(intext);
  var o = {
	  init: function(){
		  this.portfolio.init();
	  },
	  portfolio: {
		  data: {
		  },
		  init: function(){
			  $('#portfolio').portfolio(o.portfolio.data);
		  }
	  }
  }
  o.init();
  $("img").each(function(i, dom){
    var oimg = new Image();
    var rate = 1;
    var self = this;
    oimg.onload = function(){
      if(oimg.height > 400 || oimg.width > 600){
        if(400/oimg.height < 600/oimg.width){
          rate = 400/oimg.height;
        }
        else{
          rate = 600/oimg.width;
        }
      }
      $(self).css({
        "height":oimg.height * rate + "px",
        "width":oimg.width * rate + "px",
        "margin-left":$(document).width()/2 - rate * oimg.width/2,
        "margin-top":400/2 - rate * oimg.height/2
      })
    }
    oimg.src = $(self).attr("src");
  })
});
