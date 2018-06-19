$(function(){
	var ver = $('#version').text();
	var url = location.href;
	var ary = url.split('/');
	var str = ary[ary.length - 1];
	var rep = url.replace(str, '');
	var apk = rep + 'apk/CloudScan_ver'+ ver +'.apk';
	$('#qrcode').qrcode({
		width: 320,
		height: 320,
		text: apk,
	});
});