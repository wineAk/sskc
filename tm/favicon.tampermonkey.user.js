// ==UserScript==
// @name         ファビコン変更するよ
// @namespace    http://tampermonkey.net/
// @namespace    https://my.saaske.com/
// @version      0.1
// @description  none
// @author       wineAk
// @match        https://*.saaske.com/*
// @match        https://*.work-s.app/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    let num = 0
    let timer = null
    const FAVICON = {
        "admin": "https://wineak.github.io/sskc/redirect/admin.png",
        "lead": "https://wineak.github.io/sskc/redirect/lead.png",
        "sfa": "https://wineak.github.io/sskc/redirect/salse.png",
        "web": "https://wineak.github.io/sskc/redirect/web.png",
        "cgibin2": "https://wineak.github.io/sskc/redirect/cgi-bin2.png",
        "technology": "https://wineak.github.io/sskc/redirect/technology.png",
        "cti": "https://wineak.github.io/sskc/redirect/cti.png",
        "cti_call": "https://wineak.github.io/sskc/redirect/cti_call.png",
        "works": "https://wineak.github.io/sskc/redirect/works.png",
    }
    const replaceFavicon = (elms, favicon) => {
        for (let i = 0, n = elms.length; i < n; i++) elms[i].href = favicon
        num++
        timer = setTimeout(faviconCheck, 5000, favicon)
        if (num > 5) clearTimeout(timer)
    }
    const faviconCheck = (favicon) => {
        const elms1 = document.querySelectorAll('[rel="shortcut icon"]')
        const elms2 = document.querySelectorAll('[rel="icon"]')
        if (elms1.length) replaceFavicon(elms1, favicon)
        if (elms2.length) replaceFavicon(elms2, favicon)
        if (!elms1.length && !elms2.length) {
            const link = document.createElement('link')
            link.setAttribute('type', 'image/x-icon')
            link.setAttribute('rel', 'icon')
            link.setAttribute('href', favicon)
            document.getElementsByTagName('head')[0].append(link)
        }
    }
    const getParam = (name, param) => {
        name = name.replace(/[\[\]]/g, '\\$&')
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
        const results = regex.exec(param)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    const pathname = location.pathname
    const directory = pathname.split('/')[1].replace(/[\t\-]/, '')
    const param = location.search
    const taskParam = getParam('task', param)
    const target =
          (taskParam === 'cti') ? `${directory}_call` :
          (/admin.work-s.app/.test(location.href)) ? 'works' : directory
    const favicon = FAVICON[target]
    const log = {
        'pathname': pathname,
        'directory': directory,
        'param': param,
        'taskParam': taskParam,
        'target': target,
        'favicon': favicon,
    }
    console.log(log)
    if (favicon) faviconCheck(favicon)
})()