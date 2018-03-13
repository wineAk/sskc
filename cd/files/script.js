var version = $('strong').text();
$('#qrcode').qrcode({
	width: 320,
	height: 320,
	text: 'http://saas.webcrow.jp/apk/CloudScan_ver'+ version +'.apk'
});