"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[123],{8029:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var r=o(6070),n=o(5710);const s={id:"stat-reporter",title:"Stat Reporter",sidebar_position:2},i=void 0,a={id:"recipes/stat-reporter",title:"Stat Reporter",description:"Is a lightweight stat reporter module for NestCord. This module sends data from your bot to different monitoring bot services.",source:"@site/content/recipes/stat-reporter.md",sourceDirName:"recipes",slug:"/recipes/stat-reporter",permalink:"/recipes/stat-reporter",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/recipes/stat-reporter.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"stat-reporter",title:"Stat Reporter",sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Localization",permalink:"/recipes/localization"},next:{title:"Validation",permalink:"/techniques/validation"}},d={},c=[{value:"Usage",id:"usage",level:2}];function l(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",...(0,n.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"Is a lightweight stat reporter module for NestCord. This module sends data from your bot to different monitoring bot services."}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsxs)(t.p,{children:["Once the installation process is complete, we can import the ",(0,r.jsx)(t.code,{children:"NestCordStatReporterModule"})," with your ",(0,r.jsx)(t.code,{children:"NestCordModule"})," into the root ",(0,r.jsx)(t.code,{children:"AppModule"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import { Module } from '@nestjs/common';\nimport { AppService } from './app.service';\nimport { NestCordModule, \n         NestCordStatReporterModule, \n         StatCronExpression, \n         NestCordLocalizationModule, \n         DefaultLocalizationAdapter, \n         UserResolver \n} from '@globalart/nestcord';\n\n@Module({\n    imports: [\n      NestCordModule.forRoot({\n        token: process.env.DISCORD_TOKEN,\n          intents: [\n          IntentsBitField.Flags.Guilds,\n          IntentsBitField.Flags.DirectMessages,\n          IntentsBitField.Flags.GuildMembers,\n          IntentsBitField.Flags.GuildMessages,\n          IntentsBitField.Flags.MessageContent\n        ],\n        prefix: '!',\n        development: [process.env.DISCORD_TEST_GUILD]\n      }),\n      NestCordStatReporterModule.forRoot({\n        services: [\n          {\n            name: 'top.gg',\n            url: 'https://top.gg/bots/:bot_id/stats',\n            bodyData: { server_count: '{{serverCount}}', shard_count: '{{shardCount}}' },\n            headerData: { Authorization: process.env.TOP_GG_TOKEN },\n            schedule: StatCronExpression.EVERY_5_MINUTES // or you can use crontab expression like */1 * * * * ,\n          },\n        ],\n      }),\n    ],\n    providers: [AppService]\n})\nexport class AppModule {\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["In ",(0,r.jsx)(t.code,{children:"services"}),", all the services on which the bot is monitored should be listed, and the request body should be passed. ",(0,r.jsx)(t.code,{children:"{{serverCount}}"})," and ",(0,r.jsx)(t.code,{children:"{{shardCount}}"})," will be automatically replaced."]}),"\n",(0,r.jsx)(t.p,{children:"Congratulations! You have successfully register cronjob with NestCord!"})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},5710:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>a});var r=o(758);const n={},s=r.createContext(n);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);