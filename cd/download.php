<?php
  require_once "_setting.php";
  require_once "_list.php";
  $dir = "./{$master}/";
  $file_list = getApkList($dir);
  list($file_name, $file_last) = getApkLast($file_list);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Cloud Scanのダウンロード</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="shortcut icon" href="files/icon.png">
  <link rel="stylesheet" href="files/style.css">
  <style>
    body > div {display: none!important;}
    main {display: block;}
    #download-section, #qrcode-section {display: none;}
  </style>
</head>
<body>
  <main>
    <div id="download-section" class="container text-center my-3">
      <h2>Cloud Scanのダウンロード</h2>
      <p>以下のリンクより、ダウンロードを行えます。</p>
      <a href="<?php echo "{$master}/{$file_last}" ?>">
        <button type="button" class="btn btn-primary btn-lg">バージョン <?php echo $file_name; ?> をダウンロード</button>
      </a>
    </div>
    <div id="qrcode-section" class="container text-center my-3">
      <h2>Cloud Scanのダウンロード</h2>
      <p>以下のQRより、ダウンロードを行えます。</p>
      <div id="qrcode"></div>
      <p>最新のバージョンは<strong id="version"><?php echo $file_name; ?></strong>です。</p>
    </div>
    <div id="manual-section" class="container text-center my-3">
      <p class="alert alert-info">再インストールの手順マニュアルは、<br><a href="files/reinstall.pdf" target="_blank" class="alert-link">こちら</a>よりダウンロードして下さい。</p>
    </div>
  </main>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="files/jquery.qrcode.min.js"></script>
  <script src="files/script_dl.js"></script>
</body>
</html>
