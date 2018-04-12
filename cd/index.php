<?php
  http_response_code(404);
  header("Location: http://www.saaske.com/");
  exit;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>エラーが発生しました</title>
  <script>location.replace("http://www.saaske.com/");</script>
</head>
<body>
  <h2>エラーが発生しました</h2>
  <p>不正なコードが検出されたため、システムを強制終了しました。</p>
</body>
</html>
