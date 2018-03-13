<?php
  require_once "_setting.php";
  require_once "_list.php";
  require_once "_server.php";
  // クエリーがなければリダイレクト
  $query = $_GET["s"];
  if($query != $key){
    http_response_code(301);
    header("Location: http://www.saaske.com/");
    exit;
  }
?>
<meta charset="utf-8">
<link rel="shortcut icon" href="files/icon.png">
<title>Cloud Scan QRコード</title>
<div id="qrpage">
  <h2>Cloud Scanのダウンロード</h2>
  <ul>
    <li><a href="index.php">HOME</a></li>
    <li><a href="qr.php">QRコード</a></li>
    <li><a href="http://secure-link.jp/wf/?c=wf26359724">QRコード(Webフォーム)</a></li>
  </ul>
  <h3>当ページURLのQR</h3>
  <div id="qrcode"></div>
  <h3>本番ファイル</h3>
  <p><?php
    $dir = "./{$master}/";
    $file_list = getApkList($dir);
    list($file_name, $file_last) = getApkLast($file_list);
    print "最新バージョン（<a href=\"{$master}/{$file_last}\">{$file_name}</a>）";
  ?></p>
  <ul><?php
    foreach($file_list as $file_name){
      if(is_file("{$dir}{$file_name}")){
        print "<li><a href=\"{$master}/{$file_name}\">{$file_name}</a></li>";
      }
    }
  ?></ul>
  <h3>テストファイル</h3>
  <p><?php
    $dir = "./{$develop}/";
    $file_list = getApkList($dir);
    list($file_name, $file_last) = getApkLast($file_list);
    print "最新バージョン（<a href=\"{$develop}/{$file_last}\">{$file_name}</a>）";
  ?></p>
  <ul><?php
    foreach($file_list as $file_name){
      if(is_file("{$dir}{$file_name}")){
        print "<li><a href=\"{$develop}/{$file_name}\">{$file_name}</a></li>";
      }
    }
  ?></ul>
  <h3>情報</h3>
  <table border style="text-align:center"><?php
    $hostname = gethostbyaddr($_SERVER["REMOTE_ADDR"]);
    print "<tr><td>ホスト名</td><td>{$hostname}</td></tr>";
    if($hostname == "N041" || $hostname == "ac212076.ppp.asahi-net.or.jp"){
      print "<tr><td colspan=\"2\">サーバ情報</td></tr>";
      print "<tr><td>ホスト名</td><td>{$host}</td></tr>";
      print "<tr><td>ポート番号</td><td>{$port}</td></tr>";
      print "<tr><td>ユーザー名</td><td>{$user}</td></tr>";
      print "<tr><td>パスワード</td><td>{$pass}</td></tr>";
    }
  ?></table>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="files/jquery.qrcode.min.js"></script>
<script src="files/script_list.js"></script>