<?php
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
  <style>
    body > div {display: none!important;}
    main {display: block;}
    #download-section, #qrcode-section {display: none;}
    #qrcode {margin: 30px auto;}
    strong {border-bottom: 2px solid #ff3333; padding:0 3px;}
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
  <script>
    var swt = {};
    swt.page_key = 'download';
    $(function(){
      if(window == window.parent) {
        swt.page_key = 'download (DL Page)';
        $('#download-section').css('display', 'block');
      } else {
        swt.page_key = 'download (QR Code)';
        $('#qrcode-section').css('display', 'block');
        $('#qrcode').qrcode({
          width: 200,
          height: 200,
          text: 'http://saas.webcrow.jp/cd/',
        });
      }
    });
  </script>
  <script src="//script.secure-link.jp/swt/c00029295.js"></script> <!-- メイン -->
  <script src="//script.secure-link.jp/swt/c12579546.js"></script> <!-- テスト -->
</body>
</html>
