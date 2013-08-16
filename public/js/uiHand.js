function uiHand(){
  var self = this;
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
      $('.add').css({
        left: $(window).outerWidth()/2 - 295/2 + 'px'
      });
      $('.add').removeClass('hide');
      $('body').append('<div class="filter"></div>');
      $(".filter").css({
        "height":$(document).outerHeight() + "px"
      })
    })
    $(".add .head input").change(function(e){
      file = e.target.files[0];
      $(".fixcan").remove();
      reader = new FileReader();
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $('.add .head canvas')[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          var self = this;
          var rate = fixcan(this, false, {target:'.main',x:'0', y:'0'});
          $(".main .close").after($(".fixcan"));
          $(".fixcan").slideDown();
          //ct.drawImage(this, 0, 0, 80, 80);
          $('#forCrop').mouseenter(function(e){
            function kana(c){
              if(c.w == 0 && c.h == 0){
                return false;
              }
              ct.drawImage(self, c.x/rate, c.y/rate, c.w / rate, c.h / rate, 0, 0, 80, 80);
            }
            $(this).Jcrop({
              'aspectRatio':1,
              'onChange':kana,
              'onSelect':kana
            });
          });
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
        var lala = new al("把名字和描述填上嘛， 目前添加后不可修改哦。。", false, {});
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
          var lala = new al("添加成功了，每日都來看一看吧， 相信過一段時間你可以認真的發現到自己的心意的。", false, {});
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
        var lala = new al("更新信息成功了，信息發生變化時， 請儘快告訴服務器君哦。", false, {});
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
          $('.moredetail').removeClass("hide");

          $('.moredetail .nhead p').text(odata.gname);
          $('.moredetail .nhead img').attr('src', uImg);

          var $text = "";
          var $img = "";
          for(var i = 0; i < data.speak.length; i++){
            $text = "<div class='spco'><p>"+data.speak[i].content+"</p></div>" + $text;
          }
          for(var i = 0; i < data.gal.length; i++){
            $img += "<img src='./getpic/"+data.gal[i].uname+"/"+data.gal[i].gname+"/"+data.gal[i].picurl+"'>";
          }
          $('.splist .text').after($text);
          
          $('p.pic .mid').append($img);
          $('p.pic .mid img').first().addClass('cho');
          self.paint('.spart canvas');

          $('.mpart #fir .now').text("1");
          $('.mpart #fir .total').text(data.gal.length);
          $('.mpart #sec .girlname').text(odata.gname);

          $('body').append('<div class="filter"></div>');
          $(".filter").css({
            "height":$(document).outerHeight() + "px"
          });
        }
      });
    })
    $(".moredetail .close").click(function(e){
      $('.moredetail').addClass("hide");
      $('.spco').remove();
      $('p.pic .mid img').remove();
      $(".filter").remove();
      //TODO: clear the information
    })
    $(".moredetail .nhead img").click(function(e){
      $('.splist .text').slideDown();
    })
    $(".splist textarea").keyup(function(e){
      if(e.which == 13){
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
              var lala = new al("失敗啦~", false, {});
            }
          });
        }
      }
    });
    $(".bpart .moveleft").click(function(e){
      if($('.cho').index() > 0){
        var mark = $('.cho').index();
        $('.cho').prev().addClass('cho')
        $($('.cho')[1]).removeClass('cho');
        $('p.pic .mid').css({
          left:$('p.pic .mid').position().left + 31 + "px"
        })
        self.paint('.spart canvas');
      }
    })
    $(".bpart .moveright").click(function(e){
      if($('.cho').index() < $("p.pic .mid img").length - 1){
        var mark = $('.cho').index();
        $('.cho').next().addClass('cho')
        $($('.cho')[0]).removeClass('cho');
        $('p.pic .mid').css({
          left:$('p.pic .mid').position().left - 31 + "px"
        })
      }
      self.paint('.spart canvas');
    })
    $(".like").click(function(e){
      var odata = {
        f:'inc',
        gname:$(this).parent().parent().children('img').attr('id')
      }
      girl.hg(odata, function(data){
        if(data.status == 0){
          var lala = new al("操作成功啦", false, {});
        }
        else if(data.status == 3){
          var lala = new al("一天只能對一個進行操作喲~", false, {});
        }
        else{
          var lala = new al("出錯啦", false, {});
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
          var lala = new al("操作成功啦", false, {});
        }
        else if(data.status == 3){
          var lala = new al("一天只能對一個進行操作喲~", false, {});
        }
        else{
          var lala = new al("出錯啦", false, {});
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
          var lala = new al("這樣很辛苦吧，但是請加油，以後一定會更好的", false, {});
        }
        else{
          var lala = new al("出錯啦", false, {});
        }
      })
    })
    $(".share").click(function(e){
      var odata = {
        gname:$(this).parent().parent().children('img').attr('id')
      }
      girl.share(odata, function(e){
        if(data.status == 0){
          var lala = new al("這樣很辛苦吧，但是請加油，以後一定會更好的", false, {});
        }
        else{
          var lala = new al("出錯啦", false, {});
        }
      })
    })
    $("#sec .girlname").mouseenter(function(e){
      console.log("1");
      if($(".uppic").length >0) return false;
      var posi = $(this).position();
      var lala = new uppic(true, {
        y:-15,
        x:posi.left + $(this).outerWidth() + 12,
        target: this
      });
    })
  })();
  this.clearpaint = function(target){
    var canvas = $(target)[0]
    var can = canvas.getContext('2d');
    can.clearRect(0, 0, canvas.width, canvas.height);  
  }
  this.paint = function(target){
    var bb = new Image();
    var canvas = $(target)[0]
    var can = canvas.getContext('2d');

    self.clearpaint(target);

    bb.onload = function(){
      var height = bb.height,
          width = bb.width,
          rate = height/width,
          left = 0,
          top = 0;
          canrate = canvas.height/canvas.width;
    if(height > canvas.height || width > canvas.width){
        if(rate > canrate){
          var pp = height/canvas.height;
          height = canvas.height;
          width = width / pp;
        }
        else{
          var pp = width/canvas.width;
          width = canvas.width;
          height = height / pp;
        }
      }
      left = Math.abs(width-canvas.width)/2;
      top = Math.abs(height-canvas.height)/2;
      can.drawImage(bb, left, top, width, height);
    }
    bb.src = $('.cho').attr('src');
  }
}
