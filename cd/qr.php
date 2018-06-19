<?php
  require_once "_setting.php";
  require_once "_list.php";
  $dir = "./{$master}/";
  $file_list = getApkList($dir);
  list($file_name, $file_last) = getApkLast($file_list);
  $file_ver  = "現在のバージョンは<strong id=\"version\">{$file_name}</strong>です。";
?>
<meta charset="utf-8">
<link rel="shortcut icon" href="files/icon.png">
<link rel="stylesheet" href="files/style.css">
<title>Cloud Scan QRコード</title>
<div id="qrpage">
  <h2>Cloud Scanのダウンロード</h2>
  <p>以下のQRより、ダウンロードを行えます。</p>
  <div id="qrcode"></div>
  <p><?php print $file_ver; ?></p>
  <p>再インストールの手順マニュアルは、<br><a href="files/reinstall.pdf" target="_blank">こちら</a>よりダウンロードして下さい。</p>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="files/jquery.qrcode.min.js"></script>
<script src="files/script.js"></script>