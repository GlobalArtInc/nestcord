"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[504],{788:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=n(6070),o=n(5710);const i={id:"defer-interceptor",title:"Defer command",sidebar_position:1},c=void 0,s={id:"interceptors/defer-interceptor",title:"Defer command",description:"Interceptor added interaction.deferReply() to the beiginning of the code",source:"@site/content/interceptors/defer-interceptor.md",sourceDirName:"interceptors",slug:"/interceptors/defer-interceptor",permalink:"/interceptors/defer-interceptor",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/interceptors/defer-interceptor.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"defer-interceptor",title:"Defer command",sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Text Commands",permalink:"/text-commands"},next:{title:"Pagination",permalink:"/recipes/pagination"}},a={},d=[{value:"Usage",id:"usage",level:2}];function p(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["Interceptor added ",(0,r.jsx)(t.code,{children:"interaction.deferReply()"})," to the beiginning of the code"]}),"\n",(0,r.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-typescript",children:"import {\n  Context,\n  SlashCommand,\n  SlashCommandContext,\n  DeferCommandInterceptor,\n} from '@globalart/nestcord';\n\n@Injectable()\nexport class AppService {\n  @UseInterceptors(DeferCommandInterceptor)\n  @SlashCommand({\n    name: 'ping',\n    description: 'pong',\n  })\n  async execute(@Context() [interaction]: SlashCommandContext) {\n    setTimeout(() => interaction.followUp({ content: 'Pong!' }), 5000);\n  }\n}\n\n"})})]})}function l(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},5710:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>s});var r=n(758);const o={},i=r.createContext(o);function c(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);