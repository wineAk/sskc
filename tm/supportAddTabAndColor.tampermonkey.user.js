// ==UserScript==
// @name         サポート案件に色を付ける（Sales）
// @namespace    https://my.saaske.com/
// @version      0.2
// @description  none
// @author       wineAk
// @match        https://my.saaske.com/*
// @grant        none
// ==/UserScript==

(() => {
    const titleElm = document.querySelector('[title="c00029295"]')
    if (titleElm == null) return
    const projectsElms = document.querySelectorAll('[rel="projects_detail"]')
    if (projectsElms == null) return
    projectsElms.forEach(elm => {
        const text = elm.innerText
        const isTarget = (_=>{
            if (/^\[完了\]/.test(text)) return false
            if (/(サスケ|職人).*?(サポート|ｻﾎﾟｰﾄ)/.test(text)) return true
            if (/(サポート|ｻﾎﾟｰﾄ).*?(サスケ|職人)/.test(text)) return true
            return false
        })()
        if (isTarget) {
            // ClassNameを追加
            const headElm = elm.closest('.project')
            headElm.classList.add('saaske_support')
            // タブを作成
            const tdElm = document.createElement('td')
            const newElm = elm.cloneNode(true)
            newElm.innerText = text.replace(/^\[.*?\]|\(.*?\)$/g, '').replace(/ｻﾎﾟｰﾄ/, 'サポート').trim()
            tdElm.appendChild(newElm)
            tdElm.classList.add('tab_support', 'send_tab')
            const storageElm = document.querySelector('.storage')
            storageElm.after(tdElm)
        }
    })
})()