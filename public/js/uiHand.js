function uiHand(){
  this.posi = (function(){
    $(".action").css({
      "margin-left":($(document).width()-$(".action").outerWidth())/2 + "px"
    });
    $(".slide").css({
      "margin-left":$(".action").css("margin-left")
    });
  })();

  this.hand = (function(){
    $(document).keyup(function(e){
      console.log(e.which);
      if(e.which == 27){
        if($(".settion").hasClass('slideDown')){
          $(".settion").removeClass('slideDown');
        }
      }
      else if($(".settion").hasClass('slideDown') && e.which == 13){
        if($("#basicpart").hasClass('sel')){
          var odata = {
            ch:{
              nick: $('input[name="newnickname"]').val(),
              birthday:$('input[name="newbirthday"]').val(),
              email:$('input[name="newemail"]').val()
            }
          }
          me.update(odata);
        }
        else if($("#headpart").hasClass('sel')){
          var odata = {
            picurl:$(".headpart canvas")[0].toDataURL()
          }
          //檢查canvas是否爲空
          me.uphead(odata);
        }
        else if($("#changepwd").hasClass('sel')){
          var odata = {
            oripass: $('input[name="oripass"]').val(),
            newpass: $('input[name="newpass"]').val(),
            newpassrep: $('input[name="newpassrep"]').val()
          } 
          me.chpass(odata);
        }
      }
    });
    $(".slide").click(function(e){
      if($(this).hasClass("slideDown") == true){
        $(".action, .slide").removeClass("slideDown");
      }
      else{
        $(".action, .slide").addClass("slideDown");
      }
    });
    $(".add").click(function(e){
      girl = {
        head:$('action .upPic>input')[0].toDataURL(),
        name:$('.gName').val(),
        descri:$('.descri').val()
      }
      var aGirl = new Girl(girl);
      aGirl.fill();
    });
    $(".headpart input").change(function(e){
      file = e.target.files[0];
      
      //test file type

      reader = new FileReader();
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $('.headpart canvas')[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          ct.drawImage(this, 0, 0, 80, 80);
        });
      }
      reader.readAsDataURL(file);
    });
    
    $("action .upPic>input").change(function(e){
      file = e.target.files[0];
      
      //test file type

      reader = new FileReader();
      reader.onload = function(e){
        $img = $('<img>', {src:e.target.result});
        canvas = $('.addPart>canvas')[0];
        ct = canvas.getContext('2d');

        $img.load(function(){
          ct.drawImage(this, 0, 0, 80, 80);
        });
      }
      reader.readAsDataURL(file);
    });
    $('.set').click(function(e){
      $('.action, .slide').removeClass('slideDown');
      $('.settion').addClass('slideDown');
    });
    $('.settion>nav li').click(function(e){
      $('.settion>nav li').removeClass('sel');
      $(this).addClass('sel');
      $('.setcon>div').addClass('hide');
      $("."+$(this).attr('id')).removeClass('hide');
    });
    $('.logout').click(function(e){
      location.href = 'logout';
    });

  })();
}
