var setup = {
	loadSetting: function(){
		var $tpl = $("#settingTpl"),
			$target = $("#settingContent");
		var tp = $tpl.val(),
			newTp = '',
			obj = {};
			obj = app.user;
			newTp += $.template(tp, obj);
		$target.html(newTp).css3Animate({ time: "500ms", opacity: 1 });
	},
	loadProfile: function(){
		var $tpl = $("#profileTpl"),
			$target = $("#profileContent");
		var tp = $tpl.val(),
			newTp = '',
			obj = {};
			obj = app.user;
			newTp += $.template(tp, obj);
		$target.html(newTp).css3Animate({ time: "500ms", opacity: 1 });
	},
	// 摄像头拍照
    takePicture: function () {
		var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
        var deferred  = when.defer(),
            destinationType=navigator.camera.DestinationType,
            options = {
                quality: 50,
                destinationType: destinationType.FILE_URI,
                //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                cameraDirection: Camera.Direction.FRONT,
                targetWidth: 300,
                targetHeight: 300,
                //correctOrientation: true
				popoverOptions: popover
        };
        navigator.camera.getPicture(function(data){
            deferred.resolve(data);
        }, null, options);
        
        return deferred.promise
    },
	//上传图片到服务器
    uploadPicture: function( imageURI ){
        var deferred  = when.defer(),
            options = new FileUploadOptions();
        options.fileKey = "avatar",
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
		$.ui.showMask("正在上传");
        
        var ft = new FileTransfer();
        //上传回调
        //ft.onprogress = setup.showUploadingProgress;
        //navigator.notification.progressStart("", "当前上传进度");
		ft.upload( imageURI, encodeURI(app.appUrl + '/setting/upload'), function(){ 
            deferred.resolve( imageURI );
			//navigator.notification.progressStop();
        } , null, options);
        return deferred.promise
    },
    // 显示上传进度
    showUploadingProgress: function( progressEvt ){
        if( progressEvt.lengthComputable ){
            navigator.notification.progressValue( Math.round( ( progressEvt.loaded / progressEvt.total ) * 100) );
        }
    },
    // 从缓存中删除图片
    deletePictureFromCache: function( imageURI ){
        window.resolveLocalFileSystemURI(fileURI, function( fileEntry ){
            fileEntry.remove();
        }, null);
    },
	reloadAvatar: function(imageURI){
		$.ui.hideMask();
		var deferred  = when.defer();
		$('#myAvatar').attr('src',$('#myAvatar').attr('src') + "&" + Math.random());
		deferred.resolve( imageURI );
        return deferred.promise
	},
	saveOK: function(){
		$.ui.showMask("保存中");
		setTimeout(function(){
			$.ui.hideMask();
			$.ui.popup("保存成功");		
		},
		1000);		
	}
}