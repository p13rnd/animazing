!function(n,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?exports.animazing=a():n.animazing=a()}(this,(function(){return function(n){var a={};function t(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return n[e].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=a,t.d=function(n,a,e){t.o(n,a)||Object.defineProperty(n,a,{enumerable:!0,get:e})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,a){if(1&a&&(n=t(n)),8&a)return n;if(4&a&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&a&&"string"!=typeof n)for(var i in n)t.d(e,i,function(a){return n[a]}.bind(null,i));return e},t.n=function(n){var a=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(a,"a",a),a},t.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},t.p="",t(t.s=0)}([function(n,a,t){"use strict";!function(){const a={animate:n=>{document.querySelectorAll(n).forEach(n=>{a.loadOpts(n),a.makeVisible(n),a.doAnim(n)})},loadOpts:n=>{n.animazing={},n.animazing.doAnim=0===parseInt(n.dataset.full)?a.animParts:a.animFull,n.animazing.delay=parseInt(n.dataset.delay)||0,n.animazing.clean=parseInt(n.dataset.clean)||0,n.animazing.retain=parseInt(n.dataset.retain)||0,n.animazing.duration=parseInt(n.dataset.duration)||0,n.animazing.iterationStart=parseFloat(n.dataset.iterationstart)||0,n.animazing.iterations=-1==n.dataset.iterations?1/0:parseInt(n.dataset.iterations)||1,n.animazing.direction=n.dataset.direction||"normal",n.animazing.animationType=n.dataset.animation||"fade",n.animazing.fontSize=parseFloat(window.getComputedStyle(n,null).getPropertyValue("font-size"))||24,n.animazing.animations=n.dataset.animations||!1,n.animazing.currentDelay=0},makeEmpty:n=>{n.textContent=""},makeVisible:n=>{n.style.visibility="visible"},props:n=>({duration:n.animazing.duration,fill:"forwards",delay:n.animazing.currentDelay,iterationStart:n.animazing.iterationStart,iterations:n.animazing.iterations,direction:n.animazing.direction}),cleanUp:n=>{0!==n.animazing.retain&&Object.assign(n.style,n.animazing.animObj),n.querySelectorAll("span.an").forEach(a=>{n.append(a.innerText),a.remove()})},animFull:n=>{n.animate(n.animazing.animObj,a.props(n)),n.animazing.currentDelay=n.animazing.currentDelay+n.animazing.delay},animParts:n=>{n.lastElementCb=(t,e)=>{t===e-1&&a.cleanUp(n)};let t=n.textContent.split("");a.makeEmpty(n);let e,i=1;void 0!==n.animazing.animObj.opacity&&1==n.animazing.animObj.opacity&&(i=0),t.forEach((r,o)=>{let l=document.createElement("span");l.innerText=r,l.classList.add("an"),l.style.opacity=i,n.append(l),e=l.animate(n.animazing.animObj,a.props(n)),1===n.animazing.clean&&(e.onfinish=()=>{n.lastElementCb(o,t.length)}),n.animazing.currentDelay=n.animazing.currentDelay+n.animazing.delay})},isEmptyObj:n=>{for(let a in n)return!1;return!0},str2Obj:n=>n.split(",").map(n=>n.split(":").map(n=>n.trim())).reduce((n,a)=>(n[a[0]]=a[1],n),{}),doAnim:n=>{let t={};if(!1!==n.animazing.animations){let e=a.str2Obj(n.animazing.animations);Object.assign(t,e)}a.isEmptyObj(t)||(n.animazing.animObj=t,n.animazing.doAnim(n))}};n.exports=a}()}])}));