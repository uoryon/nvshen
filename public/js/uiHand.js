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
        left: $(window).outerWidth()/2 - $('.add').outerWidth()/2 + 'px'
      });
      $('.add').removeClass('hide');
      $('body').append('<div class="filter"></div>');
      $(".filter").css({
        "height":$(document).outerHeight() + "px"
      })
    })
    $(".add .head input, .changee .headiconup input").change(function(e){
      file = e.target.files[0];
      $(".fixcan").remove();
      reader = new FileReader();
      reader.sDom = this;
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $(reader.sDom).siblings()[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          var self = this;
          self.edge = self.height>self.width?self.height:self.width;
          self.edge = self.edge*3;
          //var oFix = new fixcan(this, false, {target:container.content,x:'0', y:'0'});
          var oFix = new fixcan(this);
          var rate = oFix.rate
          var container =  new al(oFix.content.html(), false, {});
          container.content.css({
            top:container.content.position().top - 40 + 'px'
          })
          //container.append($('.fixcan'));
          //$(reader.sDom).parent().before($(".fixcan"));
          canvas.height = canvas.width = self.edge;
          $(".fixcan").slideDown();
          //ct.drawImage(this, 0, 0, 80, 80);
          $('#forCrop').mouseenter(function(e){
            function kana(c){
              if(c.w == 0 && c.h == 0){
                return false;
              }
              ct.clearRect(0, 0, self.edge, self.edge);
              ct.drawImage(self, c.x/rate, c.y/rate, c.w/rate, c.h/rate, 0, 0, self.edge, self.edge);
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
    /*$(".changee .headiconup input").change(function(e){
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
    */
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
            $img += "<div class='imgcon'><img src='./getpic/"+data.gal[i].uname+"/"+data.gal[i].gname+"/"+data.gal[i].picurl+"'></div>";
          }
          $('.splist .text').after($text);

          $('p.pic .mid').append($img);
          $('p.pic .mid .imgcon').first().addClass('cho');
          self.paint();

          $("p.pic .imgcon").click(function(e){
            var mark = $(this).index();
            $('.cho').removeClass("cho");
            $(this).addClass("cho");
            $('p.pic .mid').css({
              left:362 - 32 * mark + "px"
            })
            self.paint();
          })

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
      $('.spart img').attr("src", "");
      $('p.pic .mid .imgcon').remove();
      $('p.pic .mid').css({left:"362px"});
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
        var mark = $('.cho').index() - 1;
        $('.cho').prev().addClass('cho')
        $($('.cho')[1]).removeClass('cho');
        $('p.pic .mid').css({
          left:362 - 32 * mark + "px"
        })
        self.paint();
      }
    })
    $(".bpart .moveright").click(function(e){
      if($('.cho').index() < $("p.pic .mid img").length - 1){
        var mark = $('.cho').index() + 1;
        $('.cho').next().addClass('cho')
        $($('.cho')[0]).removeClass('cho');
        $('p.pic .mid').css({
          left:362 - 32 * mark + "px"
        })
      }
      self.paint();
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
    /*$("#sec .girlname").mouseenter(function(e){
      console.log("1");
      if($(".uppic").length >0) return false;
      var posi = $(this).position();
      var lala = new uppic(true, {
        y:-15,
        x:posi.left + $(this).outerWidth() + 12,
        target: this
      });
    })*/
    $(".show .spart").mouseleave(function(e){
      console.log("out");
      $(".girlpicup").fadeOut();
    })
    $(".show .spart").mouseenter(function(e){
      console.log("in");
      $(".girlpicup").fadeIn();
    })
    $('#fileupload').fileupload({
		  dataType: 'json',
		  url: './up',
      add: function (e, data) {
			  //var file = data.files[0];
			  //var subInd = file.name.lastIndexOf('.');
			  //var $fileToken = makeFile({
			  //	id: -1,
			  //	name: file.name.substr(0, subInd),
			  //	type: file.name.substr(subInd+1),
			  //	tip: '正在上传'
			  //});
			  //data.tId = $fileToken.attr('tId');
			  console.log("add");
        data.submit();
      },
		  formData: function(form){
    	  formData = [];
        formData.push({name: 'gname', value: $('.show #sec .girlname').text()});
			  return formData;
		  },
      done: function (data) {
        console.log("back:"+data);
        if(data.status == 0){
          var lala = new al('成功了', flase, {});
        }
      }
	  });
  })();
  this.paint = function(target){
    $(".spart img").attr("src",$('.cho img').attr('src'));
  }
}
