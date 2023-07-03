// ==UserScript==
// @name         月額表チェック（管理画面）
// @namespace    https://my.saaske.com/
// @version      0.3
// @description  none
// @author       wineAk
// @match        https://*.saaske.com/*/cgi/index.cgi?task=bill*
// @grant        none
// ==/UserScript==

(() => {
    const params = location.search.substring(1).split('&')
    const button = document.createElement('button')
    if (params.includes('task=bill') && params.includes('bl_kind=1') || params.includes('bl_kind=2')) {
        button.textContent = 'TSV取得'
        button.onclick = _ => navigator.clipboard.writeText(getTsvData()).then(_ => alert('TSVをコピーしました'))
        document.querySelector('#contents > .tab_box').appendChild(button)
    } else if (params.includes('task=bill') && params.length == 1 || params.includes('tab=1') || params.includes('action=')) {
        button.textContent = 'JSON取得'
        button.onclick = _ => navigator.clipboard.writeText(getJsonData()).then(_ => alert('JSONをコピーしました'))
        document.querySelector('#contents > .tab_box').appendChild(button)
    }
    // 処理
    const getJsonData = _ => {
        let obj = {}
        document.querySelectorAll('#contents > table > tbody > .pickup').forEach(elm => {
            const amount = Math.round(Number(elm.querySelector('td:nth-child(6)').textContent.replace(/[\\,]/g, '')) / 1.1)
            const company = elm.querySelector('td:first-child > a:first-child').textContent
            obj[company] = amount
        })
        return JSON.stringify(obj)
    }
    const getTsvData = _ => {
        let tsv = ''
        document.querySelectorAll('#contents > table > tbody > .pickup').forEach(elm => {
            const amount = Math.round(Number(elm.querySelector('td:nth-child(4)').textContent.replace(/[\\,]/g, '')))
            const company = elm.querySelector('td:first-child > a:first-child').textContent
            tsv += `${company}	${amount}\n`
        })
        return tsv
    }
})()