function uiHand(){
  this.hand = (function(){
    /*==============css==============*/
    $('.moredetail').css({
      left:$(window).outerWidth()/2 - $(".moredetail").outerWidth()/2 + "px",
      top:$(window).outerHeight()/2 - $(".moredetail").outerHeight()/2 + "px",
    })
    /*==============handler==========*/
    $(".add .close").click(function(e){
      $('.filter').remove();
      $('.add').addClass('hide');
      $('.add .head input').val("");
      $('.gname input').val("");
      $('.detai textarea').val("");
    })
    $(".cen").click(function(e){
      $('body').append('<div class="filter"></div>');
      $('.add').css({
        left: $(window).outerWidth()/2 - 295/2 + 'px'
      });
      $('.add').removeClass('hide');
    })
    $(".add .head input").change(function(e){
      file = e.target.files[0];
      reader = new FileReader();
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $('.add .head canvas')[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          ct.drawImage(this, 0, 0, 80, 80);
        });
      }
      reader.readAsDataURL(file);
    });
    $('.detai input').click(function(e){
      var odata = {
        gname:$('.gname input').val(),
        picurl:$('.add .head canvas')[0].toDataURL(),
        descri:$('.detai textarea').val()
      }
      if(odata.descri == "" || odata.gname == "" || odata.picurl == ""){
        var lala = new al("把名字和描述填上嘛， 目前添加后不可修改哦。。", false, {type:'cemi'});
        return false;
      }
      girl.upGirl(odata, function(data){
        if(data.status == 0){
          $('.add').addClass('hide');
          $('.filter').remove();
          $('.changee').removeClass('active');
          $('.add .head input').val("");
          $('.gname input').val("");
          $('.detai textarea').val("");
          var lala = new al("添加成功了，每日都來看一看吧， 相信過一段時間你可以認真的發現到自己的心意的。", false, {type:'cemi'});
        } 
      });
    })
    $(".setting").click(function(e){
      if($(".changee").hasClass("active")){
        $(".changee").removeClass("active");
      }
      else{
        $(".changee").addClass("active");
      }
    })
    $(".changee .headiconup input").change(function(e){
      file = e.target.files[0];
      reader = new FileReader();
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $('.changee .headiconup canvas')[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          ct.drawImage(this, 0, 0, 80, 80);
        });
      }
      reader.readAsDataURL(file);
    });
    $(".changee .play").click(function(e){
      var odata = {
        picurl:$('.changee .headiconup canvas')[0].toDataURL(),
        ch:{
          nick:$('.changee .upnick').val(),
          emial:$('.changee .upemail').val()
        }
      }
      me.update(odata, function(data){
        var lala = new al("更新信息成功了，信息發生變化時， 請儘快告訴服務器君哦。", false, {'type':'cemi'});
      })
    })
    $(".logout").click(function(e){
      location.href = 'logout';
    });
    $(".girlone>img").click(function(e){
      var odata = {
        gname:$(this).attr('id')
      }
      var uImg = $(this).attr('src');
      girl.gd(odata, function(data){
        if(data.status == 0){
          $('body').append('<div class="filter"></div>');
          $('.moredetail').removeClass("hide");
          $('.moredetail .nhead p').text(odata.gname);
          $('.moredetail .nhead img').attr('src', uImg);
          for(var i = 0; i < data.speak.length; i++){
            var $text = "<div class='spco'><p>"+data.speak[i].content+"</p></div>";
            $('.splist .text').after($text);
          }
        }
      });
    })
    $(".moredetail .close").click(function(e){
      $('.moredetail').addClass("hide");
      $(".filter").remove();
    })
    $(".moredetail .nhead img").click(function(e){
      $('.splist .text').slideDown();
    })
    $(".splist .endtext").click(function(e){
      var odata = {
        content:$('.splist .text textarea').val(),
        gname: $(this).parents().siblings(".nhead").children('p').text()
      }
      $('.splist .text textarea').val("");
      if(odata.content == ""){
        return false;
      }
      else{
        girl.sp(odata, function(data){
          if(data.status == 0){
            var $text = "<div class='spco' style='display:none'><p>"+odata.content+"</p></div>";
            $(".splist .text").after($text);
            $(".splist .spco").fadeIn(500);
            $('.splist .text').slideUp();
          }
          else{
            var lala = new al("失敗啦~", false, 'cemi');
          }
        });
      }
    })
    $(".like").click(function(e){
      var odata = {
        f:'inc',
        gname:$(this).parent().parent().children('img').attr('id')
      }
      girl.hg(odata, function(data){
        if(data.status == 0){
          var lala = new al("操作成功啦", false, {'type':'cemi'});
        }
        else if(data.status == 3){
          var lala = new al("一天只能對一個進行操作喲~", false, {'type':'cemi'});
        }
        else{
          var lala = new al("出錯啦", false, {'type':'cemi'});
        }
      })
    })
    $(".dislike").click(function(e){
      var odata = {
        f:'dec',
        gname:$(this).parent().parent().children('img').attr('id')
      }
      girl.hg(odata, function(data){
        if(data.status == 0){
          var lala = new al("操作成功啦", false, {'type':'cemi'});
        }
        else if(data.status == 3){
          var lala = new al("一天只能對一個進行操作喲~", false, {'type':'cemi'});
        }
        else{
          var lala = new al("出錯啦", false, {'type':'cemi'});
        }
      })
    })
    $(".hate").click(function(e){
      var odata = {
        f:'hat',
        gname:$(this).parent().parent().children('img').attr('id')
      }
      girl.hg(odata, function(data){
        if(data.status == 0){
          var lala = new al("這樣很辛苦吧，但是請加油，以後一定會更好的", false, {'type':'cemi'});
        }
        else{
          var lala = new al("出錯啦", false, {'type':'cemi'});
        }
      })
    })
  })();
}
