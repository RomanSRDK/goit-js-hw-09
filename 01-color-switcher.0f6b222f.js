const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let a;t.addEventListener("click",(({target:t})=>{t.disabled=!0,e.disabled=!1,a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(({target:e})=>{t.disabled=!1,e.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.0f6b222f.js.map
