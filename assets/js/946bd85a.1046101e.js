"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[610],{893:(e,a,n)=>{n.d(a,{A:()=>G});var l=n(758);const t=e=>"boolean"==typeof e||e instanceof Boolean,s=e=>"number"==typeof e||e instanceof Number,o=e=>"bigint"==typeof e||e instanceof BigInt,c=e=>!!e&&e instanceof Date,r=e=>"string"==typeof e||e instanceof String,i=e=>Array.isArray(e),u=e=>e instanceof Object&&null!==e;let d=1;const m=()=>d++;function p(e){let{field:a,value:n,data:t,lastElement:s,openBracket:o,closeBracket:c,level:r,style:i,shouldExpandNode:u,clickToExpandNode:d}=e;const p=(0,l.useRef)(!1),[x,_,b]=function(e){const[a,n]=(0,l.useState)(e());return[a,()=>n((e=>!e)),n]}((()=>u(r,n,a)));(0,l.useEffect)((()=>{p.current?b(u(r,n,a)):p.current=!0}),[u]);const v=x?i.collapseIcon:i.expandIcon,N=x?"collapse JSON":"expand JSON",E=function(){const e=(0,l.useRef)();return void 0===e.current&&(e.current=`:jsnvw:${m()}:`),e.current}(),f=r+1,g=t.length-1,y=e=>{" "===e.key&&(e.preventDefault(),_())};return(0,l.createElement)("div",{className:i.basicChildStyle,role:"list"},(0,l.createElement)("span",{className:v,onClick:_,onKeyDown:y,role:"button",tabIndex:0,"aria-label":N,"aria-expanded":x,"aria-controls":x?E:void 0}),a&&(d?(0,l.createElement)("span",{className:i.clickableLabel,onClick:_,onKeyDown:y,role:"button",tabIndex:-1},a,":"):(0,l.createElement)("span",{className:i.label},a,":")),(0,l.createElement)("span",{className:i.punctuation},o),x?(0,l.createElement)("div",{id:E},t.map(((e,a)=>(0,l.createElement)(h,{key:e[0]||a,field:e[0],value:e[1],style:i,lastElement:a===g,level:f,shouldExpandNode:u,clickToExpandNode:d})))):(0,l.createElement)("span",{className:i.collapsedContent,onClick:_,onKeyDown:y,role:"button",tabIndex:-1,"aria-hidden":!0,"aria-label":N,"aria-expanded":x}),(0,l.createElement)("span",{className:i.punctuation},c),!s&&(0,l.createElement)("span",{className:i.punctuation},","))}function x(e){let{field:a,value:n,style:l,lastElement:t,shouldExpandNode:s,clickToExpandNode:o,level:c}=e;return p({field:a,value:n,lastElement:t||!1,level:c,openBracket:"{",closeBracket:"}",style:l,shouldExpandNode:s,clickToExpandNode:o,data:Object.keys(n).map((e=>[e,n[e]]))})}function _(e){let{field:a,value:n,style:l,lastElement:t,level:s,shouldExpandNode:o,clickToExpandNode:c}=e;return p({field:a,value:n,lastElement:t||!1,level:s,openBracket:"[",closeBracket:"]",style:l,shouldExpandNode:o,clickToExpandNode:c,data:n.map((e=>[void 0,e]))})}function b(e){let{field:a,value:n,style:i,lastElement:u}=e,d=n,m=i.otherValue;return null===n?(d="null",m=i.nullValue):void 0===n?(d="undefined",m=i.undefinedValue):r(n)?(d=i.noQuotesForStringValues?n:`"${n}"`,m=i.stringValue):t(n)?(d=n?"true":"false",m=i.booleanValue):s(n)?(d=n.toString(),m=i.numberValue):o(n)?(d=`${n.toString()}n`,m=i.numberValue):d=c(n)?n.toISOString():n.toString(),""===a&&(a='""'),(0,l.createElement)("div",{className:i.basicChildStyle,role:"listitem"},a&&(0,l.createElement)("span",{className:i.label},a,":"),(0,l.createElement)("span",{className:m},d),!u&&(0,l.createElement)("span",{className:i.punctuation},","))}function h(e){const a=e.value;return i(a)?(0,l.createElement)(_,Object.assign({},e)):u(a)&&!c(a)?(0,l.createElement)(x,Object.assign({},e)):(0,l.createElement)(b,Object.assign({},e))}var v="_2bkNM";const N={container:"_2IvMF _GzYRV",basicChildStyle:v,label:"_1MGIk",clickableLabel:"_2YKJg _1MGIk _1MFti",nullValue:"_2T6PJ",undefinedValue:"_1Gho6",stringValue:"_vGjyY",booleanValue:"_3zQKs",numberValue:"_1bQdo",otherValue:"_1xvuR",punctuation:"_3uHL6 _3eOF8",collapseIcon:"_oLqym _f10Tu _1MFti _1LId0",expandIcon:"_2AXVT _f10Tu _1MFti _1UmXx",collapsedContent:"_2KJWg _1pNG9 _1MFti",noQuotesForStringValues:!1},E=()=>!0,f=e=>{let{data:a,style:n=N,shouldExpandNode:t=E,clickToExpandNode:s=!1}=e;return(0,l.createElement)("div",{className:n.container},(0,l.createElement)(h,{value:a,style:n,lastElement:!0,level:0,shouldExpandNode:t,clickToExpandNode:s}))},g="containerParaiso_jgBV",y="basicElementParaiso_SW3X",j="labelParaiso_DUc9",k="nullValueParaiso_VWbb",V="undefinedValueParaiso_D8iR",I="stringValueParaiso_yRY9",S="booleanValueParaiso_yFdn",C="numberValueParaiso_PlgG",P="otherValueParaiso_aoD5",T="punctuationParaiso_T3yT",A="expandIconParaiso_LpAZ",B="collapseIconParaiso_HgdB",D="collapseContentParaiso_Kx6x";var F=n(6070);const R={container:g,basicChildStyle:y,label:j,nullValue:k,undefinedValue:V,stringValue:I,booleanValue:S,numberValue:C,otherValue:P,punctuation:T,collapseIcon:B,expandIcon:A,collapsedContent:D};function G(e){let{src:a,collapseDepth:n}=e;return(0,F.jsx)(f,{data:a,shouldExpandNode:(e,a)=>Array.isArray(a)?a.length<5:void 0!==n&&e<n,style:R})}},3531:(e,a,n)=>{n.d(a,{A:()=>r});n(758);var l=n(2871),t=n(977);const s={container:"container_jrgN",nav:"nav_Y2UF",navlink:"navlink_ueN0",active:"active_toc_"};var o=n(6070);function c(e){let{to:a,children:n}=e;return(0,o.jsx)(t.A,{className:s.navlink,isNavLink:!0,to:a,exact:!0,activeStyle:{backgroundColor:"#363739"},children:n})}function r(e){let{children:a}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(l.A,{children:[(0,o.jsx)("html",{lang:"en"}),(0,o.jsx)("title",{children:"Docusaurus debug panel"}),(0,o.jsx)("meta",{name:"robots",content:"noindex"})]}),(0,o.jsxs)("div",{children:[(0,o.jsxs)("nav",{className:s.nav,children:[(0,o.jsx)(c,{to:"/__docusaurus/debug",children:"Config"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/metadata",children:"Metadata"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/registry",children:"Registry"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/routes",children:"Routes"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/content",children:"Content"}),(0,o.jsx)(c,{to:"/__docusaurus/debug/globalData",children:"Global data"})]}),(0,o.jsx)("main",{className:s.container,children:a})]})]})}},7884:(e,a,n)=>{n.r(a),n.d(a,{default:()=>r});n(758);var l=n(8607),t=n(3531),s=n(893);const o={listItem:"listItem_xxHX",route:"route_Ui5_",routeName:"routeName_mGIN"};var c=n(6070);function r(){return(0,c.jsxs)(t.A,{children:[(0,c.jsx)("h2",{children:"Routes"}),(0,c.jsx)("ul",{className:"clean-list",children:l.A.map((e=>{let{path:a,exact:n,routes:l}=e;return(0,c.jsxs)("li",{className:o.listItem,children:[(0,c.jsx)("div",{className:o.route,children:(0,c.jsx)("code",{className:o.routeName,children:a})}),(0,c.jsxs)("div",{children:["Is exact: ",(0,c.jsx)("code",{children:String(Boolean(n))})]}),l&&(0,c.jsxs)("div",{children:["Child Routes:",(0,c.jsx)(s.A,{src:l})]})]},a)}))})]})}}}]);