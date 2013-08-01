$(function(){
  var wWidth = $(window).outerWidth();
  var pWidth = 1300;
  $('.bg').css({
    "background-position":wWidth/2 - pWidth/2
  });

  $(window).resize(function(e){
    wWidth = $(window).outerWidth();
    $('.bg').css({
      "background-position":wWidth/2 - pWidth/2
    });
  });
  $('.button').mousemove(function(e){
    $(this).addClass('mousemove');
  })
  $('.button').mouseout(function(e){
    $(this).removeClass('mousemove');
  })
  $('.button.login .play').click(function(e){
    $('#title, #wel, .button').addClass('act');
    $('p.sign').addClass('hide');
    setTimeout(function(){ 
      $('.button').slideUp(200);
      $('#wel').slideUp(200);
      setTimeout(function(){
        $('.inp.login').fadeIn();
      }, 300);
    }, 500);
  })
  $('p.sign').click(function(e){
    $('#title, #wel, .button').addClass('act');
    $('p.sign').addClass('hide');
    setTimeout(function(){ 
      $('.button').slideUp(200);
      $('#wel').slideUp(200);
      setTimeout(function(){
        $('.inp.sign').fadeIn();
      }, 300);
    }, 500);
  })
  $('.inp.login > .play').click(function(e){
    var odata = {
      uname:$('input[name="username"]').val(),
      password:$('input[name="password"]').val()
    }
    $.post('./login', odata, function(data){
      if(data.status == 0){
        location.href = data.url;
      }
    })
  });
  $('.inp.sign > .play').click(function(e){
    var odata = {
      uname: $('input[name="signname"]').val(),
      password:$('input[name="signpass"]').val(),
      ch:{
        nick:$('input[name="signnick"]').val(),
        email:$('input[name="signmail"]').val()
      }
    }
    $.post('./signup', odata, function(data){
      if(data.status == 0){
        $('.inp.sign').fadeOut(500);
        setTimeout(function(){
          $('.inp.login').fadeIn();
        }, 500)
      }
    })
  });
})
