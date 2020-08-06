// ==UserScript==
// @name         清水河畔自动翻页
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  清水河畔帖子详情页面下滑至底部自动翻页
// @author       Zhenger233
// @match        http://bbs.uestc.edu.cn/forum.php?mod=viewthread*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    var argspage=window.location.search.substr(1).match(new RegExp("(^|&)" + 'page' + "=([^&]*)(&|$)", "i"));
    var p = argspage==null?1:+argspage[2];
    var thisurl = window.location.href;
    var maxp;
    if(document.getElementsByClassName('nxt').length==0)maxp=1;
    else maxp=+document.getElementsByClassName('nxt')[0].previousElementSibling.innerText.replace(' / ','').replace(' 页','');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('postlistreply').previousElementSibling.appendChild(new DOMParser().parseFromString(xmlhttp.responseText, 'text/html').getElementById('postlist'));
        }
    };
    var mysend = function mysend() {
        if (p < maxp) {
            console.log('send', p);
            xmlhttp.open('GET', thisurl.replace(/&page=[0-9]*/,'').replace(/#.*/,'') + '&page=' + String(++p), false);
            xmlhttp.send();
        }
    };
    document.onscroll = function () {
        document.getElementById('postlistreply').getBoundingClientRect().y < 500 ? mysend():{};
    };
    // Your code here...
})();