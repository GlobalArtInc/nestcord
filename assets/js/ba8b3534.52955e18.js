"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[815],{553:(e,n,t)=>{t.r(n),t.d(n,{default:()=>r});t(7378);var a=t(9664),l=t(6085),s=t(6106);function o(e){let{pluginId:n,pluginInstanceContent:t}=e;return(0,s.jsxs)("section",{style:{marginBottom:30},children:[(0,s.jsx)("code",{children:n}),(0,s.jsx)(l.A,{src:t,collapseDepth:2})]})}function c(e){let{pluginName:n,pluginContent:t}=e;return(0,s.jsxs)("section",{style:{marginBottom:60},children:[(0,s.jsx)("h3",{children:n}),(0,s.jsx)("div",{children:Object.entries(t).filter((e=>{let[,n]=e;return!!n})).map((e=>{let[n,t]=e;return(0,s.jsx)(o,{pluginId:n,pluginInstanceContent:t},n)}))})]})}function r(e){let{allContent:n}=e;return(0,s.jsxs)(a.A,{children:[(0,s.jsx)("h2",{children:"Plugin content"}),(0,s.jsx)("div",{children:Object.entries(n).filter((e=>{let[,n]=e;return Object.values(n).some((e=>!!e))})).map((e=>{let[n,t]=e;return(0,s.jsx)(c,{pluginName:n,pluginContent:t},n)}))})]})}},6085:(e,n,t)=>{t.d(n,{A:()=>G});var a=t(7378);const l=e=>"boolean"==typeof e||e instanceof Boolean,s=e=>"number"==typeof e||e instanceof Number,o=e=>"bigint"==typeof e||e instanceof BigInt,c=e=>!!e&&e instanceof Date,r=e=>"string"==typeof e||e instanceof String,i=e=>Array.isArray(e),u=e=>e instanceof Object&&null!==e;let d=1;const p=()=>d++;function m(e){let{field:n,value:t,data:l,lastElement:s,openBracket:o,closeBracket:c,level:r,style:i,shouldExpandNode:u,clickToExpandNode:d}=e;const m=(0,a.useRef)(!1),[b,x,h]=function(e){const[n,t]=(0,a.useState)(e());return[n,()=>t((e=>!e)),t]}((()=>u(r,t,n)));(0,a.useEffect)((()=>{m.current?h(u(r,t,n)):m.current=!0}),[u]);const f=b?i.collapseIcon:i.expandIcon,_=b?"collapse JSON":"expand JSON",v=function(){const e=(0,a.useRef)();return void 0===e.current&&(e.current=`:jsnvw:${p()}:`),e.current}(),g=r+1,N=l.length-1,y=e=>{" "===e.key&&(e.preventDefault(),x())};return(0,a.createElement)("div",{className:i.basicChildStyle,role:"list"},(0,a.createElement)("span",{className:f,onClick:x,onKeyDown:y,role:"button",tabIndex:0,"aria-label":_,"aria-expanded":b,"aria-controls":b?v:void 0}),n&&(d?(0,a.createElement)("span",{className:i.clickableLabel,onClick:x,onKeyDown:y,role:"button",tabIndex:-1},n,":"):(0,a.createElement)("span",{className:i.label},n,":")),(0,a.createElement)("span",{className:i.punctuation},o),b?(0,a.createElement)("div",{id:v},l.map(((e,n)=>(0,a.createElement)(E,{key:e[0]||n,field:e[0],value:e[1],style:i,lastElement:n===N,level:g,shouldExpandNode:u,clickToExpandNode:d})))):(0,a.createElement)("span",{className:i.collapsedContent,onClick:x,onKeyDown:y,role:"button",tabIndex:-1,"aria-hidden":!0,"aria-label":_,"aria-expanded":b}),(0,a.createElement)("span",{className:i.punctuation},c),!s&&(0,a.createElement)("span",{className:i.punctuation},","))}function b(e){let{field:n,openBracket:t,closeBracket:l,lastElement:s,style:o}=e;return(0,a.createElement)("div",{className:o.basicChildStyle,role:"listitem"},n&&(0,a.createElement)("span",{className:o.label},n,":"),(0,a.createElement)("span",{className:o.punctuation},t),(0,a.createElement)("span",{className:o.punctuation},l),!s&&(0,a.createElement)("span",{className:o.punctuation},","))}function x(e){let{field:n,value:t,style:a,lastElement:l,shouldExpandNode:s,clickToExpandNode:o,level:c}=e;return 0===Object.keys(t).length?b({field:n,openBracket:"{",closeBracket:"}",lastElement:l,style:a}):m({field:n,value:t,lastElement:l||!1,level:c,openBracket:"{",closeBracket:"}",style:a,shouldExpandNode:s,clickToExpandNode:o,data:Object.keys(t).map((e=>[e,t[e]]))})}function h(e){let{field:n,value:t,style:a,lastElement:l,level:s,shouldExpandNode:o,clickToExpandNode:c}=e;return 0===t.length?b({field:n,openBracket:"[",closeBracket:"]",lastElement:l,style:a}):m({field:n,value:t,lastElement:l||!1,level:s,openBracket:"[",closeBracket:"]",style:a,shouldExpandNode:o,clickToExpandNode:c,data:t.map((e=>[void 0,e]))})}function f(e){let{field:n,value:t,style:i,lastElement:u}=e,d=t,p=i.otherValue;return null===t?(d="null",p=i.nullValue):void 0===t?(d="undefined",p=i.undefinedValue):r(t)?(d=i.noQuotesForStringValues?t:`"${t}"`,p=i.stringValue):l(t)?(d=t?"true":"false",p=i.booleanValue):s(t)?(d=t.toString(),p=i.numberValue):o(t)?(d=`${t.toString()}n`,p=i.numberValue):d=c(t)?t.toISOString():t.toString(),""===n&&(n='""'),(0,a.createElement)("div",{className:i.basicChildStyle,role:"listitem"},n&&(0,a.createElement)("span",{className:i.label},n,":"),(0,a.createElement)("span",{className:p},d),!u&&(0,a.createElement)("span",{className:i.punctuation},","))}function E(e){const n=e.value;return i(n)?(0,a.createElement)(h,Object.assign({},e)):u(n)&&!c(n)?(0,a.createElement)(x,Object.assign({},e)):(0,a.createElement)(f,Object.assign({},e))}var _="_2bkNM";const v={container:"_2IvMF _GzYRV",basicChildStyle:_,label:"_1MGIk",clickableLabel:"_2YKJg _1MGIk _1MFti",nullValue:"_2T6PJ",undefinedValue:"_1Gho6",stringValue:"_vGjyY",booleanValue:"_3zQKs",numberValue:"_1bQdo",otherValue:"_1xvuR",punctuation:"_3uHL6 _3eOF8",collapseIcon:"_oLqym _f10Tu _1MFti _1LId0",expandIcon:"_2AXVT _f10Tu _1MFti _1UmXx",collapsedContent:"_2KJWg _1pNG9 _1MFti",noQuotesForStringValues:!1},g=()=>!0,N=e=>{let{data:n,style:t=v,shouldExpandNode:l=g,clickToExpandNode:s=!1}=e;return(0,a.createElement)("div",{className:t.container},(0,a.createElement)(E,{value:n,style:t,lastElement:!0,level:0,shouldExpandNode:l,clickToExpandNode:s}))},y="containerParaiso_hoJi",k="basicElementParaiso_qGtf",j="labelParaiso_LUDT",V="nullValueParaiso_CHRP",C="undefinedValueParaiso_yD6f",I="stringValueParaiso_vE5r",B="booleanValueParaiso_vt1f",S="numberValueParaiso_sNhN",P="otherValueParaiso_E6sF",O="punctuationParaiso_tDbr",A="expandIconParaiso_OxAr",T="collapseIconParaiso_XblJ",D="collapseContentParaiso_sA97";var F=t(6106);const M={container:y,basicChildStyle:k,label:j,nullValue:V,undefinedValue:C,stringValue:I,booleanValue:B,numberValue:S,otherValue:P,punctuation:O,collapseIcon:T,expandIcon:A,collapsedContent:D};function G(e){let{src:n,collapseDepth:t}=e;return(0,F.jsx)(N,{data:n,shouldExpandNode:(e,n)=>Array.isArray(n)?n.length<5:void 0!==t&&e<t,style:M})}},9664:(e,n,t)=>{t.d(n,{A:()=>r});t(7378);var a=t(9190),l=t(3208);const s={container:"container_g93B",nav:"nav_rCl8",navlink:"navlink_h3gB",active:"active_ysWd"};var o=t(6106);function c(e){let{to:n,children:t}=e;return(0,o.jsx)(l.A,{className:s.navlink,isNavLink:!0,to:n,exact:!0,activeStyle:{backgroundColor:"#363739"},children:t})}function r(e){let{children:n}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(a.A,{children:[(0,o.jsx)("html",{lang:"en"}),(0,o.jsx)("title",{children:"Docusaurus debug panel"}),(0,o.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,o.jsxs)("div",{children:[(0,o.jsxs)("nav",{className:s.nav,children:[(0,o.jsx)(c,{to:"/__docusaurus/debug",children:"Config"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/metadata",children:"Metadata"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/registry",children:"Registry"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/routes",children:"Routes"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/content",children:"Content"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/globalData",children:"Global data"})]}),(0,o.jsx)("main",{className:s.container,children:n})]})]})}}}]);