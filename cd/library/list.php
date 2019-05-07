<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Cloud Scanのアプリ一覧</title>
  <link rel="stylesheet" href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="shortcut icon" href="files/icon.png">
  <style>
    html {overflow-y: scroll;}
    body > div {display: none!important;}
    img {width: 18px; margin-right: 5px;}
    .btn + .list-group {display: none;}
    @media screen and (max-width: 300px) {
        .btn, .list-group-item {font-size: .8rem;}
    }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <span class="navbar-brand">Cloud Scan</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown">QRコードを表示</a>
          <div class="dropdown-menu">
            <div id="qrcode" class="d-flex justify-content-center align-items-center"></div>
          </div>
        </li>
        <li class="nav-item"><a class="nav-link" href="http://secure-link.jp/wf/?c=wf26359724" target="_blank">Cloud Scanのダウンロードページ</a></li>
      </ul>
    </div>
  </nav>
  <main>
    <div class="container">
      <div class="row my-3">
        <div class="col">
          <div class="alert alert-danger" role="alert">
            このページをお客さんに教えないで下さい。<br class="d-none d-md-block">
            もし教える必要がある場合は「
            <a href="http://secure-link.jp/wf/?c=wf26359724" class="alert-link">Cloud Scanのダウンロード</a>
            」を利用してください。
          </div>
          <div class="alert alert-danger" role="alert">
            最新版のアプリをダウンロードする場合も、基本的に「
            <a href="http://secure-link.jp/wf/?c=wf26359724" class="alert-link">Cloud Scanのダウンロード</a>
            」を利用してください。
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-12 col-sm-6 col-lg-4">
          <h3 class="d-flex align-items-center"><img src="files/favicon.png">本番環境</h3>
          <?php
          $file_list = getApkList("./{$master}/");
          $file_last = array_shift($file_list);
          ?>
          <ul class="list-group">
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$master}/{$file_last}"; ?>"><?php echo $file_last; ?></a>
            </li>
          </ul>
          <button type="button" class="btn btn-outline-secondary btn-block my-3">古いバージョンを表示</button>
          <ul class="list-group my-3">
            <?php foreach($file_list as $id => $file_name) { ?>
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$master}/{$file_name}"; ?>"><?php echo $file_name; ?></a>
            </li>
            <?php } ?>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-lg-4">
          <h3 class="d-flex align-items-center"><img src="files/favicon_test.png">テスト環境</h3>
          <?php
          $file_list = getApkList("./{$develop}/");
          $file_last = array_shift($file_list);
          ?>
          <ul class="list-group">
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$develop}/{$file_last}"; ?>"><?php echo $file_last; ?></a>
            </li>
          </ul>
          <button type="button" class="btn btn-outline-secondary btn-block my-3">古いバージョンを表示</button>
          <ul class="list-group my-3">
            <?php foreach($file_list as $id => $file_name) { ?>
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$develop}/{$file_name}"; ?>"><?php echo $file_name; ?></a>
            </li>
            <?php } ?>
          </ul>
        </div>
        <div class="col-12 col-sm-6 col-lg-4">
          <h3 class="d-flex align-items-center"><img src="files/favicon_sg.png">SG環境</h3>
          <?php
          $file_list = getApkList("./{$sg}/");
          $file_last = array_shift($file_list);
          ?>
          <ul class="list-group">
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$sg}/{$file_last}"; ?>"><?php echo $file_last; ?></a>
            </li>
          </ul>
          <button type="button" class="btn btn-outline-secondary btn-block my-3">古いバージョンを表示</button>
          <ul class="list-group my-3">
            <?php foreach($file_list as $id => $file_name) { ?>
            <li class="list-group-item text-truncate">
              <a href="<?php echo "{$sg}/{$file_name}"; ?>"><?php echo $file_name; ?></a>
            </li>
            <?php } ?>
          </ul>
        </div>
      </div>
    </div>
  </main>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="files/jquery.qrcode.min.js"></script>
  <script>
  $(function(){
    $('#qrcode').qrcode({
      width: 120,
      height: 120,
      text: location.href
    });
    $('button').on('click', function() {
      $(this).next().slideToggle('slow');
    });
  });
  </script>
</body>
</html>


