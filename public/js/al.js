//This class use to create the message from a alarm box.
//the name 'al' use the first two character 'alarm'.

function al(message, help, po){
  this.content = message;
  $text = $('<div class="alert al">\
              <div class="close">\
                <div class="cross">\
                </div>\
              </div>\
              <div class="arrow"></div>\
              <p>'+message+'</p>\
            </div>');
  $('body').append($text);
  if(help){
    $('.arrow').remove();
  }
  $('.al').css({
    top: po.y,
    left: po.x
  });
  $('.al .cross').click(function(e){
    $('.al').remove();
  });
  //setTimeout(function(){
  //  $('al').fadeOut();
  //}, 2000);
}
