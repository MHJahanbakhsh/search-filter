(()=>{"use strict";({607:function(){var e,n,t,o,r=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,a){function l(e){try{i(o.next(e))}catch(e){a(e)}}function c(e){try{i(o.throw(e))}catch(e){a(e)}}function i(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(l,c)}i((o=o.apply(e,n||[])).next())}))},a=this&&this.__generator||function(e,n){var t,o,r,a,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(i){return function(c){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(l=0)),l;)try{if(t=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return l.label++,{value:c[1],done:!1};case 5:l.label++,o=c[1],c=[0];continue;case 7:c=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){l=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){l.label=c[1];break}if(6===c[0]&&l.label<r[1]){l.label=r[1],r=c;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(c);break}r[2]&&l.ops.pop(),l.trys.pop();continue}c=n.call(e,l)}catch(e){c=[6,e],o=0}finally{t=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}},l=document.getElementById("list"),c=document.getElementById("searchbox"),i=document.getElementsByClassName("item-label"),u=(document.getElementsByClassName("card"),document.getElementsByClassName("checkbox"));c.addEventListener("input",(n=function(){return function(){for(var e,n,t,o=c.value,r=0;r<i.length;r++)(null===(e=i[r].textContent)||void 0===e?void 0:e.toLocaleLowerCase().includes(o))?null===(t=i[r].parentElement)||void 0===t||t.classList.remove("hidden"):null===(n=i[r].parentElement)||void 0===n||n.classList.add("hidden")}()},void 0===t&&(t=300),function(){for(var e=this,r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];clearTimeout(o),o=setTimeout((function(){return n.apply(e,r)}),t)})),console.log(u);for(var s=0;s<u.length;s++)u[s].addEventListener("change",(function(){console.log("changed")}));(function(){return r(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,fetch("../public/assets/Rasha Challenge __ Items.json")];case 1:return[2,e.sent().json()]}}))}))})().then((function(n){e=n,console.log("runnign"),e.data.forEach((function(e){null==l||l.appendChild(function(e){var n=document.createElement("li");n.classList.add("card");var t=document.createElement("input");t.className="checkbox";var o=document.createElement("label");return o.className="item-label",t.type="checkBox",o.innerText=e,n.appendChild(t),n.appendChild(o),n}(e))}))}))}})[607]()})();