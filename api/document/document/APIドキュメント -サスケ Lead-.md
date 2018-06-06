APIドキュメント -サスケ Lead-

# 検索条件保存リストの取得

## リクエスト

### HTTP メソッド
GET

### URI
```
https://api.saaske.com/v1/lead/list
```

## レスポンス

### 一覧種別
| 一覧種別               | 説明           |
| ---------------------- | -------------- |
| all_customers          | 全顧客一覧     |
| lead_source            | リードソース   |
| history_group          | 履歴グループ   |
| correspondence_history | 対応履歴       |
| mail_history           | メール送信履歴 |
| web_visitors           | WEB訪問者      |

### パラメータ
| パラーメター名 | 説明     |
| -------------- | -------- |
| saved_number   | 保存番号 |
| saved_name     | 保存名   |

### レスポンスサンプル
```
{
  "all_customers": [
    {
      "saved_number": "100",
      "saved_name": "全顧客一覧の保存"
    },
    {
      "saved_number": "101",
      "saved_name": "全顧客一覧の保存２"
    }
  ],
  "lead_source": [
    {
      "saved_number": "102",
      "saved_name": "リードソースの保存"
    }
  ],
  "history_group": [
    {
      "saved_number": "103",
      "saved_name": "履歴グループの保存"
    }
  ],
  "correspondence_history": [
    {
      "saved_number": "104",
      "saved_name": "対応履歴の保存"
    }
  ],
  "mail_history": [
    {
      "saved_number": "105",
      "saved_name": "メール送信履歴の保存"
    }
  ],
  "web_visitors": [
    {
      "saved_number": "106",
      "saved_name": "WEB訪問者履歴の保存"
    }
  ]
}
```

# データの取得
保存した検索条件の結果を取得します。  
保存した条件がリードソースや対応履歴等の場合、該当の履歴も同時に取得されます。

取得できるデータは以下の通りです。
- 全顧客一覧
- リードソース
- 履歴グループ
- 対応履歴
- メール送信履歴
- WEB訪問者

## リクエスト

### HTTP メソッド
POST

### URI
```
https://api.saaske.com/v1/lead/list
```

### リクエストパラメータ
| パラメータ名 | 指定する値 | 必須 | 説明                                                             |
| ------------ | ---------- | ---- | ---------------------------------------------------------------- |
| saved_number | 数値       | 必須 | 検索条件の保存で作成した保存リストにある「保存番号」を指定します |

```
{
  "saved_number":"9660"
}
```

## レスポンス

### レスポンス基本情報
| フィールド名 | 説明                                            |
| ------------ | ----------------------------------------------- |
| date         | APIリクエストを送信した日時（yyyy-mm-dd H:M:S） |
| number       | 該当件数                                        |
| list_type    | 一覧種別（下記参照）                            |
| list_name    | 保存リスト名                                    |
| score        | スコア                                          |

### 一覧種別
| 一覧種別               | 説明           |
| ---------------------- | -------------- |
| All customers          | 全顧客一覧     |
| Lead source            | リードソース   |
| History group          | 履歴グループ   |
| Correspondence history | 対応履歴       |
| Mail history           | メール送信履歴 |
| WEB visitors           | WEB訪問者      |

### 再アプローチ情報
`/list/re_approach`

| フィールド名 | 説明             |
| ------------ | ---------------- |
| date         | 再アプローチ日時 |
| account      | 担当者名         |

### 前回対応状況
`/list/previous_response`

| フィールド名 | 説明         |
| ------------ | ------------ |
| date         | 履歴登録日時 |
| account      | 登録者名     |
| result       | 対応結果     |
| notes        | 履歴メモ     |

### 顧客詳細情報
`/list/customer_details`

| フィールド名 | 説明         |
| ------------ | ------------ |
| name         | 項目名       |
| type         | データタイプ |
| value        | 値           |

# リスト別レスポンス情報

## リードソース

### レスポンス基本情報
| フィールド名     | 説明           |
| ---------------- | -------------- |
| lead_source_name | リードソース名 |

### リードソース一覧情報
`/list/lead_source`

| フィールド名 | 説明         |
| ------------ | ------------ |
| name         | 項目名       |
| type         | データタイプ |
| value        | 値           |

## 履歴グループ

### レスポンス基本情報
| フィールド名       | 説明           |
| ------------------ | -------------- |
| history_group_name | 履歴グループ名 |

### 履歴グループ一覧情報
`/list/history_group`

| フィールド名 | 説明         |
| ------------ | ------------ |
| name         | 項目名       |
| type         | データタイプ |
| value        | 値           |

# データ別レスポンス情報
返却されるデータの種類（全顧客一覧、リードソースなど）によってレスポンスの内容が異なります。  
以下、データの種類ごとのレスポンス内容となります。

## 対応履歴一覧

### 対応履歴一覧情報
`/list/correspondence_history`

| フィールド名 | 説明         |
| ------------ | ------------ |
| date         | 履歴登録日時 |
| account      | 登録者名     |
| result       | 対応結果     |
| notes        | 履歴メモ     |

## メール送信履歴

### 送信メール基本情報
`/mail_information`

| フィールド名    | 説明                                              |
| --------------- | ------------------------------------------------- |
| date            | メール送信日時                                    |
| account         | メール送信者                                      |
| number_of_sent  | 送信数                                            |
| number_of_click | クリック数                                        |
| mail_format     | メール形式（text:テキストメール,html:HTMLメール） |
| from_name       | 差出人名                                          |
| from_email      | 差出人E-mail                                      |
| subject         | メール件名                                        |

### メール送信履歴一覧情報
`/list/mail_history`

| フィールド名 | 説明                                |
| ------------ | ----------------------------------- |
| status       | 配信状況（0:配信成功,1:配信エラー） |
| click        | クリック数                          |

## WEB訪問者

### WEB訪問者一覧情報
`/list/web_history`

| フィールド名 | 説明           |
| ------------ | -------------- |
| date         | 訪問日時       |
| pv           | ページビュー数 |
| stay         | 滞在時間       |
| score        | 獲得スコア     |

# レスポンスサンプル（全顧客一覧）
```
{
  "date": "2018-03-19 13:18:21",
  "number": "3",
  "list_type": "全顧客一覧",
  "list_name": "アポイントシナリオ用",
  "list": [
    {
      "saaske_code": "2589",
      "customer_status": "0",
      "registration_date": "2018-01-18 12:44",
      "update_date": "2018-02-27 13:18",
      "customer_rating": "0",
      "score": "80",
      "re_approach": {
        "date": "2018-02-27 00:00",
        "account": "出茂太郎"
      },
      "previous_response": {
        "date": "2018-02-27 13:17",
        "account": "出茂太郎",
        "status": "アポイント",
        "memo": "アポイント\n2018/02/27\n9:30"
      },
      "customer_details": [
        {
          "name": "企業情報 ※デフォルト項目",
          "type": "LABEL",
          "value": ""
        },
        {
          "name": "会社名",
          "type": "SINGLE_LINE_TEXT",
          "value": "株式会社インターパーク"
        },
        {
          "name": "会社名（カナ）",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "支店",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "電話番号",
          "type": "SINGLE_LINE_TEXT",
          "value": "011-219-4000"
        },
        {
          "name": "FAX",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "郵便番号",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "都道府県",
          "type": "DROP_DOWN",
          "value": ""
        },
        {
          "name": "住所1",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "住所2",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "URL",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "備考欄",
          "type": "MULTI_LINE_TEXT",
          "value": ""
        },
        {
          "name": "担当者情報 ※デフォルト項目",
          "type": "LABEL",
          "value": ""
        },
        {
          "name": "名前",
          "type": "SINGLE_LINE_TEXT",
          "value": "斉藤 和之"
        },
        {
          "name": "フリガナ",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        },
        {
          "name": "部署",
          "type": "SINGLE_LINE_TEXT",
          "value": "システム部"
        },
        {
          "name": "役職",
          "type": "SINGLE_LINE_TEXT",
          "value": "部長"
        },
        {
          "name": "E-mail",
          "type": "SINGLE_LINE_TEXT",
          "value": "saitou@interpark.co.jp"
        },
        {
          "name": "携帯電話",
          "type": "SINGLE_LINE_TEXT",
          "value": ""
        }
      ]
    }
  ]
}
```