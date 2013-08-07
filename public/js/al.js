function bc(message, arr, po){
  var $text = $('<div class="alert">\
                    <div class="close">\
                      <div class="cross">\
                      </div>\
                    </div>\
                    <p>'+message+'</p>\
                  </div>');
  $('body').append($text);
  if(arr){
    $text.children('.close').after("<div class='arrow'></div>");
  }
  $text.css({
    left:(po.x||$(window).outerWidth()- $('.alert').outerWidth()/2) + 'px',
    top:(po.y||$(window).outerHeight()- $('.alert').outerHeight()/2) + 'px',
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
  var $text = '<a href="javascript:void(0);"><input type="file" name="pic" id="fileupload"></a>';
  this.content = bc($text, arr, po)
  this.content.addClass('uppic');
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
		//formData: function(form){
    //  var args = generatePostArgs({
		//		catId: $('.aDiff>.cat.seled').attr('catId')
		//		});
		//	formData = [];
		//	$.each(args, function (name, value) {
		//		formData.push({name: name, value: value});
		//	});
		//	return formData;
		//},
		done: function (e, data) {
			var $fileToken = $('#content .fileInfo[tId="'+data.tId+'"]');
			if (data.result.status == 1){
				$fileToken.attr('fileId', data.result.fileId);
				var size = LOS.web.util.sizeI2S(data.total);
				$fileToken.find('.tip>span').text(size).parent().attr('title', size);
				if (data.result.catId != $('.aDiff>.cat.seled').attr('catId'))// not upload in this catalog
					$fileToken.remove();
			}else{
				alert('文件：'+ $fileToken.find('.name>span').text() + ' 上传失败，' + data.result.msg);
				$fileToken.remove();
			}
		},
	});
}

