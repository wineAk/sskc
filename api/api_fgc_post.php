<?php
  header("Content-Type: application/json");
  // jsからPOSTされた情報
  $apikey = $_POST["apikey"];
  $token = $_POST["token"];
  $number = $_POST["number"];
  // APIへPOST
  $options = [
    "http" => [
      "method" => "POST",
      "header" => [
        "Content-type: application/json; charset=UTF-8",
        "x-api-key: {$apikey}",
        "x-token: {$token}"
      ],
      "content"=> json_encode(["saved_number" => $number]),
    ],
  ];
  $context = stream_context_create($options);
  $contents = file_get_contents("https://api.saaske.com/v1/lead/list", false, $context);
  echo $contents;
?>