"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[810],{1409:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>a,metadata:()=>m,toc:()=>i});var t=s(6070),o=s(5710);const a={id:"context-menus",title:"Context Menus",sidebar_position:2},r=void 0,m={id:"interactions/context-menus",title:"Context Menus",description:"User commands and message commands are now live! These commands appear on context menus for users and messages, with more to come in the future.",source:"@site/content/interactions/context-menus.md",sourceDirName:"interactions",slug:"/interactions/context-menus",permalink:"/interactions/context-menus",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/interactions/context-menus.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"context-menus",title:"Context Menus",sidebar_position:2},sidebar:"docsSidebar",previous:{title:"Slash Commands",permalink:"/interactions/slash-commands"},next:{title:"Message Components",permalink:"/interactions/message-components"}},c={},i=[{value:"User Commands",id:"user-commands",level:2},{value:"Message Commands",id:"message-commands",level:2}];function d(e){const n={code:"code",h2:"h2",img:"img",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"User commands"})," and ",(0,t.jsx)(n.strong,{children:"message commands"})," are now live! These commands appear on context menus for users and messages, with more to come in the future."]}),"\n",(0,t.jsx)(n.h2,{id:"user-commands",children:"User Commands"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"User commands"})," are application commands that appear on the context menu (right click or tap) of users. They're a great way to surface quick actions for your app that target users."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",metastring:'title="src/app.commands.ts"',children:"import { Injectable } from '@nestjs/common';\nimport { Context, UserCommand, UserCommandContext, TargetUser } from '@globalart/nestcord';\nimport { User } from 'discord.js';\n\n@Injectable()\nexport class AppCommands {\n    @UserCommand({ name: 'Get avatar' })\n    public async getUserAvatar(\n        @Context() [interaction]: UserCommandContext,\n        @TargetUser() user: User\n    ) {\n        return interaction.reply({\n            embeds: [\n                new MessageEmbed()\n                    .setTitle(`Avatar ${user.username}`)\n                    .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))\n            ]\n        });\n    }\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"If all goes well, you should see something like this:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"User Command",src:s(7625).A+"",title:"User Command",width:"451",height:"161"})}),"\n",(0,t.jsx)(n.h2,{id:"message-commands",children:"Message Commands"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Message commands"})," are application commands that appear on the context menu (right click or tap) of messages. They're a great way to surface quick actions for your app that target messages."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",metastring:'title="src/app.commands.ts"',children:"import { Injectable } from '@nestjs/common';\nimport { Context, MessageCommand, MessageCommandContext, TargetMessage } from '@globalart/nestcord';\nimport { Message } from 'discord.js';\n\n@Injectable()\nexport class AppCommands {\n    @MessageCommand({ name: 'Copy Message' })\n    public async copyMessage(\n        @Context() [interaction]: MessageCommandContext,\n        @TargetMessage() message: Message\n    ) {\n        return interaction.reply({ content: message.content });\n    }\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"If all goes well, you should see something like this:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Message Command",src:s(4707).A+"",title:"Message Command",width:"380",height:"124"})})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},4707:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/context_message-74505639414ac3b590d9ea018b9f3855.png"},7625:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/context_user-965f24f7e000cc826cd9e835bb855ab6.png"},5710:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>m});var t=s(758);const o={},a=t.createContext(o);function r(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function m(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);