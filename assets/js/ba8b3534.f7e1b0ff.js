"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[815],{9204:(e,n,a)=>{a.r(n),a.d(n,{default:()=>r});a(758);var t=a(8999),l=a(4878),o=a(6070);function s(e){let{pluginId:n,pluginInstanceContent:a}=e;return(0,o.jsxs)("section",{style:{marginBottom:30},children:[(0,o.jsx)("code",{children:n}),(0,o.jsx)(l.A,{src:a,collapseDepth:2})]})}function c(e){let{pluginName:n,pluginContent:a}=e;return(0,o.jsxs)("section",{style:{marginBottom:60},children:[(0,o.jsx)("h3",{children:n}),(0,o.jsx)("div",{children:Object.entries(a).filter((e=>{let[,n]=e;return!!n})).map((e=>{let[n,a]=e;return(0,o.jsx)(s,{pluginId:n,pluginInstanceContent:a},n)}))})]})}function r(e){let{allContent:n}=e;return(0,o.jsxs)(t.A,{children:[(0,o.jsx)("h2",{children:"Plugin content"}),(0,o.jsx)("div",{children:Object.entries(n).filter((e=>{let[,n]=e;return Object.values(n).some((e=>!!e))})).map((e=>{let[n,a]=e;return(0,o.jsx)(c,{pluginName:n,pluginContent:a},n)}))})]})}},4878:(e,n,a)=>{a.d(n,{A:()=>F});var t=a(758);const l=e=>"boolean"==typeof e||e instanceof Boolean,o=e=>"number"==typeof e||e instanceof Number,s=e=>"bigint"==typeof e||e instanceof BigInt,c=e=>!!e&&e instanceof Date,r=e=>"string"==typeof e||e instanceof String,i=e=>Array.isArray(e),u=e=>e instanceof Object&&null!==e;let d=1;const p=()=>d++;function m(e){let{field:n,value:a,data:l,lastElement:o,openBracket:s,closeBracket:c,level:r,style:i,shouldExpandNode:u,clickToExpandNode:d}=e;const m=(0,t.useRef)(!1),[x,b,_]=function(e){const[n,a]=(0,t.useState)(e());return[n,()=>a((e=>!e)),a]}((()=>u(r,a,n)));(0,t.useEffect)((()=>{m.current?_(u(r,a,n)):m.current=!0}),[u]);const h=x?i.collapseIcon:i.expandIcon,E=x?"collapse JSON":"expand JSON",f=function(){const e=(0,t.useRef)();return void 0===e.current&&(e.current=`:jsnvw:${p()}:`),e.current}(),g=r+1,N=l.length-1,j=e=>{" "===e.key&&(e.preventDefault(),b())};return(0,t.createElement)("div",{className:i.basicChildStyle,role:"list"},(0,t.createElement)("span",{className:h,onClick:b,onKeyDown:j,role:"button",tabIndex:0,"aria-label":E,"aria-expanded":x,"aria-controls":x?f:void 0}),n&&(d?(0,t.createElement)("span",{className:i.clickableLabel,onClick:b,onKeyDown:j,role:"button",tabIndex:-1},n,":"):(0,t.createElement)("span",{className:i.label},n,":")),(0,t.createElement)("span",{className:i.punctuation},s),x?(0,t.createElement)("div",{id:f},l.map(((e,n)=>(0,t.createElement)(v,{key:e[0]||n,field:e[0],value:e[1],style:i,lastElement:n===N,level:g,shouldExpandNode:u,clickToExpandNode:d})))):(0,t.createElement)("span",{className:i.collapsedContent,onClick:b,onKeyDown:j,role:"button",tabIndex:-1,"aria-hidden":!0,"aria-label":E,"aria-expanded":x}),(0,t.createElement)("span",{className:i.punctuation},c),!o&&(0,t.createElement)("span",{className:i.punctuation},","))}function x(e){let{field:n,value:a,style:t,lastElement:l,shouldExpandNode:o,clickToExpandNode:s,level:c}=e;return m({field:n,value:a,lastElement:l||!1,level:c,openBracket:"{",closeBracket:"}",style:t,shouldExpandNode:o,clickToExpandNode:s,data:Object.keys(a).map((e=>[e,a[e]]))})}function b(e){let{field:n,value:a,style:t,lastElement:l,level:o,shouldExpandNode:s,clickToExpandNode:c}=e;return m({field:n,value:a,lastElement:l||!1,level:o,openBracket:"[",closeBracket:"]",style:t,shouldExpandNode:s,clickToExpandNode:c,data:a.map((e=>[void 0,e]))})}function _(e){let{field:n,value:a,style:i,lastElement:u}=e,d=a,p=i.otherValue;return null===a?(d="null",p=i.nullValue):void 0===a?(d="undefined",p=i.undefinedValue):r(a)?(d=i.noQuotesForStringValues?a:`"${a}"`,p=i.stringValue):l(a)?(d=a?"true":"false",p=i.booleanValue):o(a)?(d=a.toString(),p=i.numberValue):s(a)?(d=`${a.toString()}n`,p=i.numberValue):d=c(a)?a.toISOString():a.toString(),""===n&&(n='""'),(0,t.createElement)("div",{className:i.basicChildStyle,role:"listitem"},n&&(0,t.createElement)("span",{className:i.label},n,":"),(0,t.createElement)("span",{className:p},d),!u&&(0,t.createElement)("span",{className:i.punctuation},","))}function v(e){const n=e.value;return i(n)?(0,t.createElement)(b,Object.assign({},e)):u(n)&&!c(n)?(0,t.createElement)(x,Object.assign({},e)):(0,t.createElement)(_,Object.assign({},e))}var h="_2bkNM";const E={container:"_2IvMF _GzYRV",basicChildStyle:h,label:"_1MGIk",clickableLabel:"_2YKJg _1MGIk _1MFti",nullValue:"_2T6PJ",undefinedValue:"_1Gho6",stringValue:"_vGjyY",booleanValue:"_3zQKs",numberValue:"_1bQdo",otherValue:"_1xvuR",punctuation:"_3uHL6 _3eOF8",collapseIcon:"_oLqym _f10Tu _1MFti _1LId0",expandIcon:"_2AXVT _f10Tu _1MFti _1UmXx",collapsedContent:"_2KJWg _1pNG9 _1MFti",noQuotesForStringValues:!1},f=()=>!0,g=e=>{let{data:n,style:a=E,shouldExpandNode:l=f,clickToExpandNode:o=!1}=e;return(0,t.createElement)("div",{className:a.container},(0,t.createElement)(v,{value:n,style:a,lastElement:!0,level:0,shouldExpandNode:l,clickToExpandNode:o}))},N="containerParaiso_ENr_",j="basicElementParaiso_UlMI",y="labelParaiso_J947",k="nullValueParaiso_G5Rj",V="undefinedValueParaiso_EvqE",I="stringValueParaiso_oudc",C="booleanValueParaiso_mHKG",S="numberValueParaiso_ZxNV",P="otherValueParaiso_SYwK",O="punctuationParaiso_nvXo",T="expandIconParaiso_z7pc",A="collapseIconParaiso_vkJ4",B="collapseContentParaiso_qODR";var D=a(6070);const M={container:N,basicChildStyle:j,label:y,nullValue:k,undefinedValue:V,stringValue:I,booleanValue:C,numberValue:S,otherValue:P,punctuation:O,collapseIcon:A,expandIcon:T,collapsedContent:B};function F(e){let{src:n,collapseDepth:a}=e;return(0,D.jsx)(g,{data:n,shouldExpandNode:(e,n)=>Array.isArray(n)?n.length<5:void 0!==a&&e<a,style:M})}},8999:(e,n,a)=>{a.d(n,{A:()=>r});a(758);var t=a(106),l=a(1660);const o={container:"container_ydE0",nav:"nav_yrfV",navlink:"navlink_w0Qg",active:"active_EWeW"};var s=a(6070);function c(e){let{to:n,children:a}=e;return(0,s.jsx)(l.A,{className:o.navlink,isNavLink:!0,to:n,exact:!0,activeStyle:{backgroundColor:"#363739"},children:a})}function r(e){let{children:n}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.A,{children:[(0,s.jsx)("html",{lang:"en"}),(0,s.jsx)("title",{children:"Docusaurus debug panel"}),(0,s.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("nav",{className:o.nav,children:[(0,s.jsx)(c,{to:"/__docusaurus/debug",children:"Config"}),(0,s.jsx)(c,{to:"/__docusaurus/debug/metadata",children:"Metadata"}),(0,s.jsx)(c,{to:"/__docusaurus/debug/registry",children:"Registry"}),(0,s.jsx)(c,{to:"/__docusaurus/debug/routes",children:"Routes"}),(0,s.jsx)(c,{to:"/__docusaurus/debug/content",children:"Content"}),(0,s.jsx)(c,{to:"/__docusaurus/debug/globalData",children:"Global data"})]}),(0,s.jsx)("main",{className:o.container,children:n})]})]})}}}]);