<?php
  // タイムゾーンを設定
  date_default_timezone_set("Asia/Tokyo");
  // ディレクトリ名
  $master  = "apk";
  $develop = "apk_d";
  $sg = "apk_sg";
  // ファイル一覧を取得
  function getApkList($dir){
    $res_dir = opendir($dir);
    while(false !== ($file_list[] = readdir($res_dir)));
    closedir($res_dir); // ディレクトリハンドルを閉じる
    rsort($file_list); // ソート
    $file_list = array_diff($file_list, array("", ".", "..", "desktop.ini", ".gitkeep")); // 削除実行
    $file_list = array_values($file_list); // indexを詰める
    return $file_list;
  }
  // ファイルの最新版を取得
  function getApkLast($file_list){
    //$file_last = end($file_list); // Arrayの最後
    $file_last = current($file_list); // Arrayの最初
    $file_name = str_replace('CloudScan_ver', '', $file_last);
    $file_name = str_replace('.apk', '', $file_name);
    return array($file_name, $file_last);
  }
  // minify
  function phpMinify($buffer) {
    $search  = array("/\r\n|\n|\r|<!--[\s\S]*?-->/s", "/(\s)+/s", "/>(\s)/s", "/(\s)</s");
    $replace = array("", "\\1", ">", "<");
    $buffer  = preg_replace($search, $replace, $buffer);
    return $buffer;
  }
  ob_start("phpMinify");
  // 諸々の処理
  $query = isset($_GET["s"]);
  if($query && $_GET["s"] == "006404"){
    require_once "library/list.php";
  } else {
    require_once "library/download.php";
  }
?>