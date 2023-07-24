// ==UserScript==
// @name         エラーメールチェック（管理画面）
// @namespace    https://my.saaske.com/
// @version      1.0
// @description  none
// @author       wineAk
// @match        https://*.saaske.com/*/cgi/index.cgi?task=return_mail&action=detail&rm_code=*
// @grant        none
// ==/UserScript==

(() => {
    const titleElm = document.querySelector('#contents > table:nth-child(4) > caption')
    const errorElm = document.querySelector('#contents > table:nth-child(4) > tbody > tr:nth-child(4) > td')
    if (!errorElm) return

    // エラー文章だけ抽出する処理
    const errorArray = errorElm.innerText.split('\n').filter(word => word.match(/^(\s+)?$/) == null) // 空欄は削除
    console.log('errorArray:', errorArray)
    const errorFilterArray = errorArray.filter(word => {
        // 日付、送信元ドメインがある場合配列は削除
        if (word.match(/\d{4} \d{2}:\d{2}:\d{2}/) || word.match(/\.saaske\.com/)) return false
        return true
    })
    console.log('errorFilterArray:', errorFilterArray)
    const errorCode = errorFilterArray.filter(word => word.match(/\d{3}[ -]#?\d{1,3}\.\d{1,3}\.\d{1,3}/))
    const errorCodeParent = errorFilterArray.filter(word => word.match(/\d{3}/))
    const errorCodeChild = errorFilterArray.filter(word => word.match(/\d{1,3}\.\d{1,3}\.\d{1,3}/))
    console.log('errorCode:', errorCode[0])
    console.log('errorCodeParent:', errorCodeParent[0])
    console.log('errorCodeChild:', errorCodeChild[0])
    const tableParentElm = document.createElement('div')
    let tableElm = '<table cellspacing="1" cellpadding="2" border="0" class="table_detail"><caption align="top">エラー解析</caption><tbody>'
    tableElm += `<tr><th>errorCode</th><td>${errorCode[0]}</td></tr>`
    tableElm += `<tr><th>errorCodeParent</th><td>${errorCodeParent[0]}</td></tr>`
    tableElm += `<tr><th>errorCodeChild</th><td>${errorCodeChild[0]}</td></tr>`
    tableElm += '</tbody></table>'
    tableParentElm.innerHTML = tableElm
    document.querySelector('#contents > table').after(tableParentElm.firstElementChild)

    const errorTxt = errorElm.textContent.replace(/\n/g, ' ').replace(/\n/g, ' ').replace(/ +/g, ' ')
    console.log('errorTxt:', errorTxt)
    const errorCause =
        // 拒否されているケース
        (/550[ -]#?5.1.0/.test(errorTxt)) ? '[550 5.1.0] アドレスが拒否されました' :
        (/550[ -]5.7.26/.test(errorTxt)) ? '[550 5.7.26] セキュリティ上のリスクがありブロックされました' :
        (/550[ -]5.4.1/.test(errorTxt)) ? '[550 5.4.1] 受信者アドレスが拒否されました' :
        (/550[ -]5.7.1/.test(errorTxt)) ? '[550 5.7.1] 中継が拒否されました' :
        (/554[ -]5.7.1/.test(errorTxt)) ? '[554 5.7.1] 受信者アドレスが拒否されました' :
        (/5.7.26/.test(errorTxt)) ? '[5.7.26] セキュリティ上のリスクがありブロックされました' :
        (/554 Mail from .* rejected for policy reasons/i.test(errorTxt)) ? '[554] ポリシー上の理由で拒否されました' :
        (/\(expanded from \): This address no longer accepts mail/i.test(errorTxt)) ? 'メールを受け付けなくなりました' :
        (/Permission denied/i.test(errorTxt)) ? 'アクセス拒否されました' :
        (/has been blocked/i.test(errorTxt)) ? 'ブロックされました' :
        // 相手方の問題
        (/452[ -]4.2.2/.test(errorTxt)) ? '[452 4.2.2] 受信者のアカウント容量がオーバー' :
        (/552[ -]5.2.2/.test(errorTxt)) ? '[552 5.2.2] 受信者のアカウント容量がオーバー' :
        (/550[ -]5.0.0/.test(errorTxt)) ? '[550 5.0.0] 受信者のサーバー権限が不十分' :
        (/mailbox for user is full/i.test(errorTxt)) ? 'メールボックスがいっぱいです' :
        (/Disk quota exceeded/i.test(errorTxt)) ? 'メールボックスがいっぱいです' :
        (/\(expanded from \): temporary failure/i.test(errorTxt)) ? '受信者のサーバーでエラーが発生' :
        (/Connection timed out with/i.test(errorTxt)) ? '接続がタイムアウトしました' :
        // 名前解決が出来てない？
        (/501[ -]5.6.0/.test(errorTxt)) ? '※ [501 5.6.0] データフォーマットエラー' :
        (/501[ -]unacceptable/.test(errorTxt)) ? '※ [501 unacceptable mail address] 受け入れ不可能なメールアドレス' :
        (/\(expanded from \): mail is not deliverable/i.test(errorTxt)) ? 'メールが配信できません' :
        // メアドが存在しないケース
        (/the domain .* couldn't be found/i.test(errorTxt)) ? 'ドメインが見つかりませんでした' :
        (/This user doesn't have a .* account/i.test(errorTxt)) ? '該当アカウントを持っていません' :
        (/\(expanded from \): User unknown/i.test(errorTxt)) ? '不明なユーザー' :
        (/\(expanded from (<.+>)?\): unknown user/i.test(errorTxt)) ? '不明なユーザー' :
        (/The mail system: user unknown/i.test(errorTxt)) ? '不明なユーザー' :
        (/The mail system: unknown user/i.test(errorTxt)) ? '不明なユーザー' :
        (/Reason: unknown user/i.test(errorTxt)) ? '不明なユーザー' :
        (/550 Unknown user/i.test(errorTxt)) ? '[550] 不明なユーザー' :
        (/550 Invalid recipient/i.test(errorTxt)) ? '[550] 受信者のアドレスが無効化されている' :
        (/525[ -]5.7.13/.test(errorTxt)) ? '[525 5.7.13] 受信者のアドレスが無効化されている' :
        (/550[ -]5.1.1/.test(errorTxt)) ? '[550 5.1.1] ユーザーが存在しない' :
        (/550[ -]5.1.2/.test(errorTxt)) ? '[550 5.1.2] ホストが見つかりません' :
        (/553[ -]5.3.0/.test(errorTxt)) ? '[553 5.3.0] ユーザー不明' :
        (/554[ -]5.0.0/.test(errorTxt)) ? '[554 5.0.0] サービスが利用できません' :
        // 再送系
        (/Will keep trying until message is \d days old/i.test(errorTxt)) ? '（お知らせ）メッセージを試行し続けます' :
        (/Message could not be delivered for \d days/i.test(errorTxt)) ? '（お知らせ）メッセージは配信されませんでした' :
        // それ以外
        (/Reason: Delivery failed/i.test(errorTxt)) ? '配信に失敗しました' :
        ''
    titleElm.textContent = errorCause
})()