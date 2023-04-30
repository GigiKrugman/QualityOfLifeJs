(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();function p(e){document.getElementById("error-text").innerText=`Sorry, but the city - ${e} - you were looking for  is not available! Try a different one!`,document.getElementById("error-message").style.display="block"}function h(){document.getElementById("error-message").style.display="none"}function E(){const e=document.getElementById("loading");e&&(e.style.display="block")}function L(){const e=document.getElementById("loading");e&&(e.style.display="none")}function I(e){fetch(`https://api.teleport.org/api/cities/?search=${e}&embed=city:search-results/city:item/city:urban_area/ua:scores`).then(t=>{if(E(),!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return t.json()}).then(t=>{b(t),h(),m()}).catch(t=>{console.error("Error fetching city data:",t),p(e),m()}).finally(()=>{L()})}const u=document.getElementById("search-form");u&&u.addEventListener("submit",function(e){e.preventDefault();const t=document.getElementById("search-input");if(t){const s=t.value;I(s)}});function b(e){const s=e._embedded["city:search-results"][0]._embedded["city:item"]._embedded["city:urban_area"]._embedded["ua:scores"],i=s.categories,n=s.summary,r=s.teleport_city_score;let o=document.getElementById("results-list-categories");if(o){o.innerHTML+='<h2 class="header--js" >Categories:</h2><ul>';const g=i.map(d=>{o.innerHTML+=`<div class="categories--div"><ul><li class="categories--list--js">${d.name}: ${d.score_out_of_10.toFixed(2)} / 10</li></ul></div>`});o.innerHTML+=g.join("")}const a=document.getElementById("results-list-summary");a&&(a.innerHTML+=`<div class="description--js"><h3>Summary:</h3><p> ${n} </p></div>`);const l=document.getElementById("results-list-score");l&&(l.innerHTML+=`<div class="quality--percentage--js"><h4>Quality of Life:</h4> ${r.toFixed(1)} points out of 100</div>`)}function m(){const e=document.querySelector(".background--image");e&&(e.style.display="none")}function B(){const e=document.querySelector(".background--image");e&&(e.style.display="flex")}function y(){const e=document.getElementById("results-list-categories");e&&(e.innerHTML="");const t=document.getElementById("results-list-summary");t&&(t.innerHTML="");const s=document.getElementById("results-list-score");s&&(s.innerHTML=""),B()}const f=document.getElementById("clear-btn");f&&f.addEventListener("click",y);const c=document.getElementById("search-input");c&&c.addEventListener("input",function(){c.value===""&&y()});