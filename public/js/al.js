function bc(message, arr, po){
  var $text = $('<div class="alert">\
                    <div class="close">\
                      <div class="cross">\
                      </div>\
                    </div>\
                    <p>'+message+'</p>\
                  </div>');
  $(po.target || 'body').append($text);
  if(arr){
    $text.children('.close').after("<div class='arrow'></div>");
  }
  $text.css({
    left:(po.x||$(window).outerWidth()/2- $('.alert').outerWidth()/2) + 'px',
    top:(po.y||$(window).outerHeight()/2- $('.alert').outerHeight()/2) + 'px',
  });
  $text.children('.close').click(function(e){
    $text.remove();
  })
  return $text;
}

function al(message, arr, po){
  this.content = bc(message, arr, po);
  this.content.addClass('al');
}

function uppic(arr, po){
  var $text = '<div class="girlpicup"><input type="file" name="pic" id="fileupload"></div>';
  this.gname = $(po.target).text();
  this.content = bc($text, arr, po)
  this.content.addClass('uppic');
  var self = this;
}

function fixcan(img, arr, po){
//  var $text = '<div id="container" style="background-image:url('+img.src+');"><div><div id="cliper"></div><div id="fixer"><img></div>'
  var $text = '<div id="container"><img id="forCrop" src="'+img.src+'"></div>'
  var rate = 100/img.height;
  this.content = bc($text, arr, po);
  this.content.addClass('fixcan');
  this.content.children('p').remove();
  this.content.children('.close').remove();
  this.content.children().children('#forCrop').css({'width':img.width * rate + "px", 'left':210/2 - img.width * rate/2 + "px"});
  //this.content.children().children('#forCrop').Jcrop();
  var self = this;
  return rate;
}
