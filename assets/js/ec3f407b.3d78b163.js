"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[931],{9451:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>c,toc:()=>u});var r=n(6070),s=n(5710),o=n(8060),a=n(7113);const l={id:"intro",slug:"/",title:"Introduction",description:"A module for creating Discord bots using NestJS, based on Discord.js.",sidebar_position:1},i=void 0,c={id:"intro",title:"Introduction",description:"A module for creating Discord bots using NestJS, based on Discord.js.",source:"@site/content/intro.md",sourceDirName:".",slug:"/",permalink:"/",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"intro",slug:"/",title:"Introduction",description:"A module for creating Discord bots using NestJS, based on Discord.js.",sidebar_position:1},sidebar:"docsSidebar",next:{title:"Getting Started",permalink:"/start"}},d={},u=[{value:"About",id:"about",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}];function h(e){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{align:"center",children:[(0,r.jsx)("h1",{children:(0,r.jsx)("a",{href:"#",children:(0,r.jsx)("img",{src:"https://nestcord.globalart.dev/img/logo.png",alt:"NestCord Logo"})})}),(0,r.jsxs)(t.p,{children:["\ud83e\udd16 A module for creating ",(0,r.jsxs)("b",{children:[(0,r.jsx)("a",{href:"https://discord.com/",children:"Discord"})," bots"]})," using ",(0,r.jsx)("a",{href:"https://nestjs.com",children:"NestJS"}),", based on ",(0,r.jsx)("a",{href:"https://discord.js.org/",children:"Discord.js"})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsxs)(t.p,{children:[(0,r.jsx)("a",{href:"https://nestcord.globalart.dev",children:"Documentation \u2728"})," \u2003 ",(0,r.jsx)("a",{href:"https://github.com/GlobalArtInc/nestcord",children:"Source code \ud83e\udea1"})," \u2003 ",(0,r.jsx)("a",{href:"https://github.com/GlobalArtInc/nestcord/tree/master/examples",children:"Examples \ud83d\udee0\ufe0f"})," \u2003 ",(0,r.jsx)("a",{href:"https://discord.gg/BBFhU8g",children:"Community \ud83d\udcac"})]})]}),"\n",(0,r.jsx)("br",{}),"\n",(0,r.jsxs)("p",{align:"center",children:[(0,r.jsx)("a",{href:"https://img.shields.io/npm/v/@globalart/nestcord",children:(0,r.jsx)("img",{src:"https://img.shields.io/npm/v/@globalart/nestcord",alt:"NPM Version"})}),(0,r.jsx)("a",{href:"https://img.shields.io/npm/l/@globalart/nestcord",children:(0,r.jsx)("img",{src:"https://img.shields.io/npm/l/@globalart/nestcord",alt:"NPM License"})}),(0,r.jsx)("a",{href:"https://img.shields.io/npm/dm/@globalart/nestcord",children:(0,r.jsx)("img",{src:"https://img.shields.io/npm/dm/@globalart/nestcord",alt:"NPM Downloads"})}),(0,r.jsx)("a",{href:"https://img.shields.io/github/last-commit/@GlobalArtInc/nestcord",children:(0,r.jsx)("img",{src:"https://img.shields.io/github/last-commit/GlobalArtInc/nestcord",alt:"Last commit"})})]}),"\n",(0,r.jsx)(t.h2,{id:"about",children:"About"}),"\n",(0,r.jsxs)(t.p,{children:["This package uses the best of the NodeJS world under the hood. ",(0,r.jsx)(t.a,{href:"https://github.com/discordjs/discord.js",children:"Discord.js"})," is the most powerful\nlibrary for creating bots and ",(0,r.jsx)(t.a,{href:"https://github.com/nestjs",children:"Nest.js"})," is a progressive framework for creating well-architectured applications.\nThis module provides fast and easy way for creating Discord bots and deep integration with your NestJS application."]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Features"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Simple. Flexible. Easy to use."}),"\n",(0,r.jsx)(t.li,{children:"Ability to create custom decorators."}),"\n",(0,r.jsx)(t.li,{children:"Interact with Discord (Slash Commands, Context Menus, Message Components, Listeners)."}),"\n",(0,r.jsx)(t.li,{children:"Full support of NestJS guards, interceptors, filters and pipes!"}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["For questions and support please use\nthe ",(0,r.jsx)(t.a,{href:"https://github.com/GlobalArtInc/nestcord/issues/new?assignees=&labels=question&template=question.yml",children:"Issues"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Node.js 16.6.0 or newer is required."})}),"\n",(0,r.jsxs)(o.A,{groupId:"npm2yarn",children:[(0,r.jsx)(a.A,{value:"npm",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ npm install @globalart/nestcord discord.js\n"})})}),(0,r.jsx)(a.A,{value:"yarn",label:"Yarn",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ yarn add @globalart/nestcord discord.js\n"})})}),(0,r.jsx)(a.A,{value:"pnpm",label:"pnpm",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ pnpm add @globalart/nestcord discord.js\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(t.p,{children:["Once the installation process is complete, we can import the ",(0,r.jsx)(t.code,{children:"NestCordModule"})," into the root ",(0,r.jsx)(t.code,{children:"AppModule"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="src/app.module.ts"',children:"import { NestCordModule } from '@globalart/nestcord';\nimport { Module } from '@nestjs/common';\nimport { IntentsBitField } from 'discord.js';\nimport { AppUpdate } from './app.update';\n\n@Module({\n    imports: [\n        NestCordModule.forRoot({\n            token: 'DISCORD_BOT_TOKEN',\n            intents: [IntentsBitField.Flags.Guilds]\n        })\n    ],\n    providers: [AppUpdate]\n})\nexport class AppModule {}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Then create ",(0,r.jsx)(t.code,{children:"app.update.ts"})," file and add ",(0,r.jsx)(t.code,{children:"On"}),"/",(0,r.jsx)(t.code,{children:"Once"})," decorators for handling Discord API events:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",metastring:'title="src/app.update.ts"',children:"import { Injectable, Logger } from '@nestjs/common';\nimport { Context, On, Once, ContextOf } from '@globalart/nestcord';\nimport { Client } from 'discord.js';\n\n@Injectable()\nexport class AppUpdate {\n    private readonly logger = new Logger(AppUpdate.name);\n\n    public constructor(private readonly client: Client) {}\n\n    @Once('ready')\n    public onReady(@Context() [client]: ContextOf<'ready'>) {\n        this.logger.log(`Bot logged in as ${client.user.username}`);\n    }\n\n    @On('warn')\n    public onWarn(@Context() [message]: ContextOf<'warn'>) {\n        this.logger.warn(message);\n    }\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["Whenever you need to handle any event data, use the ",(0,r.jsx)(t.code,{children:"Context"})," decorator."]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},7113:(e,t,n)=>{n.d(t,{A:()=>a});n(758);var r=n(3526);const s={tabItem:"tabItem_A6Wz"};var o=n(6070);function a(e){let{children:t,hidden:n,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,a),hidden:n,children:t})}},8060:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(758),s=n(3526),o=n(5394),a=n(5557),l=n(8063),i=n(5799),c=n(1836),d=n(8552);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,c.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const s=(0,a.W6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(s.location.search);t.set(o,e),s.replace({...s.location,search:t.toString()})}),[o,s])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,o=h(e),[a,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[c,u]=m({queryString:n,groupId:s}),[g,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,o]=(0,d.Dv)(n);return[s,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:s}),f=(()=>{const e=c??g;return p({value:e,tabValues:o})?e:null})();(0,l.A)((()=>{f&&i(f)}),[f]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),b(e)}),[u,b,o]),tabValues:o}}var b=n(2253);const f={tabList:"tabList_UwLV",tabItem:"tabItem_Clxf"};var x=n(6070);function j(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.a_)(),d=e=>{const t=e.currentTarget,n=i.indexOf(t),s=l[n].value;s!==r&&(c(t),a(s))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>i.push(e),onKeyDown:u,onClick:d,...o,className:(0,s.A)("tabs__item",f.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function v(e){let{lazy:t,children:n,selectedValue:s}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function y(e){const t=g(e);return(0,x.jsxs)("div",{className:(0,s.A)("tabs-container",f.tabList),children:[(0,x.jsx)(j,{...t,...e}),(0,x.jsx)(v,{...t,...e})]})}function w(e){const t=(0,b.A)();return(0,x.jsx)(y,{...e,children:u(e.children)},String(t))}},5710:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>l});var r=n(758);const s={},o=r.createContext(s);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);