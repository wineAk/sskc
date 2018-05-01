$(function(){
	var version = $('strong').text();
	var url = location.href;
	var urlRep = url.replace(/qr\.php/, '');
	var urlApk = urlRep + 'apk/CloudScan_ver'+ version +'.apk'
	$('#qrcode').qrcode({
		width: 320,
		height: 320,
		text: urlApk,
	});
});