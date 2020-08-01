// ==UserScript==
// @name         清水河畔自动翻页
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  清水河畔帖子详情页面下滑至底部自动翻页
// @author       Zhenger233
// @match        http://bbs.uestc.edu.cn/forum.php?mod=viewthread*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var xmlhttp = new XMLHttpRequest();
    var p = 2;
    var thisurl = window.location.href;
    var xi1s=document.getElementsByClassName('xi1');
    var maxp = Math.ceil((Number(xi1s[xi1s.length-1].innerText) + 1) / 20);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('postlistreply').previousElementSibling.appendChild(new DOMParser().parseFromString(xmlhttp.responseText, 'text/html').getElementById('postlist'));
        }
    };
    var mysend = function mysend() {
        console.log('send', p);
        if (p <= maxp) {
            xmlhttp.open('GET', thisurl + '&page=' + String(p++), false);
            xmlhttp.send();
        }
    };
    document.onscroll = function () {
        document.getElementById('postlistreply').getBoundingClientRect().y < 500 ? mysend():{};
    };
    // Your code here...
})();