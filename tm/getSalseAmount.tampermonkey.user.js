// ==UserScript==
// @name         月額表チェック（Sales）
// @namespace    https://my.saaske.com/
// @version      0.1
// @description  none
// @author       wineAk
// @match        https://my.saaske.com/*
// @grant        none
// ==/UserScript==

(() => {
    const button = document.createElement('button')
    button.textContent = 'JSON取得'
    button.onclick = _ => {
        const TSV = getSalseData()
        navigator.clipboard.writeText(TSV).then(_ => alert('JSONをコピーしました'))
    }
    const params = location.search.substring(1).split('&')
    if (params.includes('task=aggrigate') && params.includes('action=sales_month'))
        document.querySelector('#main > table > caption').appendChild(button)
    // 処理
    const getSalseData = _ => {
        let obj = {}
        document.querySelectorAll('#main > table > tbody > tr').forEach(elm => {
            if (elm.classList.contains('sum')) return
            const amount = Math.round(Number(elm.querySelector('td:nth-child(9)').textContent.replace(/[\\,]/g, '')))
            const project = (elm.querySelector('td:nth-child(3)').textContent.replace(/\n.+/g, '').match(/（(.+)）/) || ['', ''])[1]
            const company = (project != '') ? project : elm.querySelector('th:first-child > a:first-child').textContent
            obj[company] = (obj[company] != null) ? amount + obj[company] : amount
        })
        return JSON.stringify(obj)
    }
})()