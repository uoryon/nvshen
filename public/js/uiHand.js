function uiHand(){
  this.hand = (function(){
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
      girl.upGirl(odata, function(data){
        if(data.status == 0){
          $('.add').addClass('hide');
          $('.filter').remove();
          $('.add .head input').val("");
          $('.gname input').val("");
          $('.detai textarea').val("");
        } 
      });
    })
    $(".logout").click(function(e){
      location.href = 'logout';
    });

  })();
}
