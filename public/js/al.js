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
  var $text = '<div class="girlpicup"><a href="javascript:void(0);"><input type="file" name="pic" id="fileupload"></a></div>';
  this.gname = $(po.target).text();
  this.content = bc($text, arr, po)
  this.content.addClass('uppic');
  var self = this;
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
			console.log(data);
            data.submit();
        },
		formData: function(form){
    	formData = [];
			formData.push({name: 'gname', value: self.gname});
			return formData;
		},
    done: function (data) {
      if(data.status == 0){
        var lala = new al('成功了', flase, {});
      }
    }
	});
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
