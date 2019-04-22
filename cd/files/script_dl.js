$(function(){
	if(window == window.parent) {
		$('#download-section').css('display', 'block');
	} else {
		$('#qrcode-section').css('display', 'block');
		$('#qrcode').qrcode({
			width: 200,
			height: 200,
			text: 'http://saas.webcrow.jp/cd/download.php',
		});
	}
});