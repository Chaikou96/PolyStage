/**
 * Chart(<load_options>);
 */
(function(C,h,a,r,t){"use strict";a=[];r=!1;t=!1;window.Chart=function(x){a.push(x);if(t){t()}else if(!r&&!t){r=C.createElement('SCRIPT');r.src='https://www.gstatic.com/charts/loader.js';r.onload=function(){t=function(){while(a.length>0){google.charts.load('current',a.shift())}};t()};C.getElementsByTagName(h)[0].appendChild(r)}}})(document,'body');