"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[936],{1062:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var a=n(6070),r=n(5710),s=n(8060),i=n(7113);const o={id:"validation",title:"Validation",sidebar_position:0},l=void 0,c={id:"techniques/validation",title:"Validation",description:"The ValidationPipe is a built-in pipe that can be used to validate data coming from the client. It uses class-validator package under the hood. The ValidationPipe provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in DTO declarations in each module.",source:"@site/content/techniques/validation.md",sourceDirName:"techniques",slug:"/techniques/validation",permalink:"/nestcord/techniques/validation",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/techniques/validation.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"validation",title:"Validation",sidebar_position:0},sidebar:"docsSidebar",previous:{title:"Stat Reporter",permalink:"/nestcord/recipes/stat-reporter"},next:{title:"Sharding",permalink:"/nestcord/techniques/sharding"}},d={},u=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.p,{children:["The ",(0,a.jsx)(t.code,{children:"ValidationPipe"})," is a built-in pipe that can be used to validate data coming from the client. It uses ",(0,a.jsx)(t.a,{href:"https://github.com/typestack/class-validator",children:"class-validator"})," package under the hood. The ",(0,a.jsx)(t.code,{children:"ValidationPipe"})," provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in DTO declarations in each module."]}),"\n",(0,a.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsxs)(s.A,{groupId:"npm2yarn",children:[(0,a.jsx)(i.A,{value:"npm",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"$ npm install class-validator class-transformer\n"})})}),(0,a.jsx)(i.A,{value:"yarn",label:"Yarn",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"$ yarn add class-validator class-transformer\n"})})}),(0,a.jsx)(i.A,{value:"pnpm",label:"pnpm",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"$ pnpm add class-validator class-transformer\n"})})})]}),"\n",(0,a.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsxs)(t.p,{children:["Now we can add a few validation rules in our ",(0,a.jsx)(t.code,{children:"CreateUserDto"}),". We do this using decorators provided by the class-validator package, described in detail ",(0,a.jsx)(t.a,{href:"https://github.com/typestack/class-validator#validation-decorators",children:"here"}),". In this fashion, any route that uses the ",(0,a.jsx)(t.code,{children:"CreateUserDto"})," will automatically enforce these validation rules."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",metastring:'title="src/users/dto/create-user.dto.ts"',children:"import { IsNotEmpty, IsString, IsEmail } from 'class-validator';\n\nexport class CreateUserDto {\n    @StringOption({\n        name: 'name',\n        description: 'Your name',\n        required: true\n    })\n    name: string;\n\n    @IsEmail()\n    @StringOption({\n        name: 'text',\n        description: 'Your email',\n        required: false\n    })\n    email: string;\n}\n"})}),"\n",(0,a.jsxs)(t.admonition,{type:"tip",children:[(0,a.jsxs)(t.p,{children:["Also you can use ",(0,a.jsx)(t.code,{children:"ValidationPipe"})," for transforming and validating the payload of a request."]}),(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"https://docs.nestjs.com/techniques/validation#transform-payload-objects",children:"Read more about transforming"})})]}),"\n",(0,a.jsxs)(t.p,{children:["Now, we can use the ",(0,a.jsx)(t.code,{children:"ValidationPipe"})," in our ",(0,a.jsx)(t.code,{children:"UsersCommands"})," to enforce the validation rules we just defined."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",metastring:'title="src/users/users.commands.ts"',children:"import { Injectable } from '@nestjs/common';\nimport { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';\n\n@Injectable()\nexport class UsersCommands {\n    @SlashCommand({\n        name: 'create',\n        description: 'Create a new user'\n    })\n    public async onCreateUser(\n        @Context() [interaction]: SlashCommandContext,\n        @Options(new ValidationPipe({ validateCustomDecorators: true })) createUserDto: CreateUserDto\n    ) {\n        return interaction.reply({ content: `User created: ${createUserDto.name}` });\n    }\n}\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Now, if we try to use the ",(0,a.jsx)(t.code,{children:"create"})," command without providing a name or email, we will get an error message."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:'{"statusCode":400,"message":["email should not be empty"],"error":"Bad Request"}\n'})}),"\n",(0,a.jsx)(t.p,{children:"You can create snippet for validated options decorator:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-typescript",metastring:'title="src/decorators/validated-options.decorator.ts"',children:"import { ValidationPipe, PipeTransform } from '@nestjs/common';\n\nexport const ValidatedOptions = (...dataOrPipes: PipeTransform[] | string) => {\n    return Options(...dataOrPipes, new ValidationPipe());\n};\n"})}),"\n",(0,a.jsxs)(t.admonition,{type:"tip",children:[(0,a.jsx)(t.p,{children:"You can create filters to handle and response validation errors."}),(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:"https://docs.nestjs.com/exception-filters#exception-filters",children:"See Exception Filters for more information"})})]})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},7113:(e,t,n)=>{n.d(t,{A:()=>i});n(758);var a=n(3526);const r={tabItem:"tabItem_A6Wz"};var s=n(6070);function i(e){let{children:t,hidden:n,className:i}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,i),hidden:n,children:t})}},8060:(e,t,n)=>{n.d(t,{A:()=>w});var a=n(758),r=n(3526),s=n(5394),i=n(5557),o=n(8063),l=n(5799),c=n(1836),d=n(8552);function u(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,c.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,i.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,s=p(e),[i,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[c,u]=m({queryString:n,groupId:r}),[f,v]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,d.Dv)(n);return[r,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:r}),b=(()=>{const e=c??f;return h({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),v(e)}),[u,v,s]),tabValues:s}}var v=n(2253);const b={tabList:"tabList_UwLV",tabItem:"tabItem_Clxf"};var g=n(6070);function x(e){let{className:t,block:n,selectedValue:a,selectValue:i,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),d=e=>{const t=e.currentTarget,n=l.indexOf(t),r=o[n].value;r!==a&&(c(t),i(r))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:o.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>l.push(e),onKeyDown:u,onClick:d,...s,className:(0,r.A)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:r}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function y(e){const t=f(e);return(0,g.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,g.jsx)(x,{...t,...e}),(0,g.jsx)(j,{...t,...e})]})}function w(e){const t=(0,v.A)();return(0,g.jsx)(y,{...e,children:u(e.children)},String(t))}},5710:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var a=n(758);const r={},s=a.createContext(r);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);