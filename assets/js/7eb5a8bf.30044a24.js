"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[539],{4829:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>o});var i=t(6070),r=t(5710);const s={id:"client-providers",title:"Client Providers",sidebar_position:4},c=void 0,d={id:"techniques/client-providers",title:"Client Providers",description:"NestCord have snippets to access the client and its properties in your application.",source:"@site/content/techniques/client-providers.md",sourceDirName:"techniques",slug:"/techniques/client-providers",permalink:"/techniques/client-providers",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/techniques/client-providers.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"client-providers",title:"Client Providers",sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Standalone application",permalink:"/techniques/standalone-application"},next:{title:"Contribution Guide",permalink:"/contributing/contribution-guide"}},l={},o=[];function a(e){const n={code:"code",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"NestCord have snippets to access the client and its properties in your application.\nYou can inject managers and utils of discord.js client using constructor."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",metastring:'title="src/app.service.ts"',children:"import { Injectable } from '@nestjs/common';\nimport { Client, ChannelManager, GuildManager, UserManager, ShardClientUtil, ClientVoiceManager, WebSocketManager, REST } from 'discord.js';\n\n@Injectable()\nexport class AppService {\n    public constructor(\n        private readonly client: Client,\n        private readonly channels: ChannelManager,\n        private readonly guilds: GuildManager,\n        private readonly users: UserManager,\n        private readonly shard: ShardClientUtil,\n        private readonly voice: ClientVoiceManager,\n        private readonly ws: WebSocketManager,\n        private readonly rest: REST\n    ) {}\n}\n"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Class (Type to be Injected)"}),(0,i.jsx)(n.th,{children:"Client Property (Will access to)"}),(0,i.jsx)(n.th,{children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"Client"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client"})}),(0,i.jsx)(n.td,{children:"Discord.js client"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ChannelManager"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.channels"})}),(0,i.jsx)(n.td,{children:"Channels of client"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"GuildManager"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.guilds"})}),(0,i.jsx)(n.td,{children:"Guilds of client"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"UserManager"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.users"})}),(0,i.jsx)(n.td,{children:"Users of client"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ShardClientUtil"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.shard"})}),(0,i.jsx)(n.td,{children:"Shards utilities"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"ClientVoiceManager"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.voice"})}),(0,i.jsx)(n.td,{children:"Voice manager"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"WebSocketManager"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.ws"})}),(0,i.jsx)(n.td,{children:"Websocket manager"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"REST"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"client.rest"})}),(0,i.jsx)(n.td,{children:"REST manager"})]})]})]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},5710:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>d});var i=t(758);const r={},s=i.createContext(r);function c(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);