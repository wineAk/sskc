APIドキュメント -共通仕様-

# サスケREST APIの概要

### プロトコル
HTTPS

### フォーマット
JSON

### 文字コード
UTF-8

### エスケープ文字
「\\」を使用します。

### 日時のフォーマット
2012-03-22 05:00:00

## ユーザー認証

### リクエストヘッダ
送信するリクエストに応じて以下のリクエストヘッダを指定します。

| パラメータ | 説明        |
| ---------- | ----------- |
| x-api-key  | APIキー     |
| x-token    | APIトークン |

### APIキーについて
トークン管理画面のTOP上部に表示されている半角英数字の文字列がAPIキーとなります。  
共通で使用する認証情報です。  
![APIキー](http://saas.webcrow.jp/api/document/api_key.png)

### APIトークンについて
IPやホスト名での接続制限、権限を設定できる情報となります。  
APIトークンはトークン管理画面で新規作成を行うことでAPIトークンが自動的に生成されます。  
![APIトークン](http://saas.webcrow.jp/api/document/api_token.png)

### リクエスト例
```
POST /v1/lead/list HTTP/1.1
x-api-key: abcdefghijklmnopqrstuvwxyz0123456789
x-token: abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJK
Host: api.saaske.com
Content-Type: application/json

{
  "saved_number":"1521"
}
```
※リクエスト例で使用されているAPIキーとAPIトークンはサンプルとなります。

## レスポンス
HTTPステータスコードが「200」であれば正常終了それ以外はエラー終了です。 エラー時には下記情報を含むJSONデータを受け取ります。

| key     | value                                      |
| ------- | ------------------------------------------ |
| code    | エラーの種類を表すコードです。             |
| message | エラーメッセージが表示されます。           |
| id      | エラーIDです。問い合わせの際に利用します。 |

### エラーの一例
```
{
  "error":{
    "code": "E01-003",
    "message": "認証トークン不正",
    "id": "83"
  }
}
```

## 制限事項
- 契約プランによって1日に実行できるリクエストと1秒間に実行できるリクエストの上限が決まっています。
- 一度に取得できるレコードは500件までとなります。