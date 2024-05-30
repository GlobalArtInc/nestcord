"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[497],{6813:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>a,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var o=t(6070),i=t(5710);const s={id:"commit-convention",title:"Commit convention",sidebar_position:3},r=void 0,c={id:"contributing/commit-convention",title:"Commit convention",description:"Git Commit Message Convention",source:"@site/content/contributing/commit-convention.md",sourceDirName:"contributing",slug:"/contributing/commit-convention",permalink:"/contributing/commit-convention",draft:!1,unlisted:!1,editUrl:"https://github.com/GlobalArtInc/nestcord/tree/master/docs/content/contributing/commit-convention.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"commit-convention",title:"Commit convention",sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Code of Conduct",permalink:"/contributing/code-of-conduct"},next:{title:"Funding",permalink:"/contributing/funding"}},d={},l=[{value:"Git Commit Message Convention",id:"git-commit-message-convention",level:2},{value:"TL;DR:",id:"tldr",level:4},{value:"Full Message Format",id:"full-message-format",level:3},{value:"Revert",id:"revert",level:3},{value:"Type",id:"type",level:3},{value:"Scope",id:"scope",level:3},{value:"Subject",id:"subject",level:3},{value:"Body",id:"body",level:3},{value:"Footer",id:"footer",level:3}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"git-commit-message-convention",children:"Git Commit Message Convention"}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["This is adapted from ",(0,o.jsx)(n.a,{href:"https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular",children:"Angular's commit convention"}),"."]})}),"\n",(0,o.jsx)(n.h4,{id:"tldr",children:"TL;DR:"}),"\n",(0,o.jsx)(n.p,{children:"Commit titles must match the following regex:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"/^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\\(.+\\))?: .{1,72}/;\n"})}),"\n",(0,o.jsx)(n.h3,{id:"full-message-format",children:"Full Message Format"}),"\n",(0,o.jsxs)(n.p,{children:["A commit message consists of a ",(0,o.jsx)(n.strong,{children:"header"}),", ",(0,o.jsx)(n.strong,{children:"body"})," and ",(0,o.jsx)(n.strong,{children:"footer"}),". The header has a ",(0,o.jsx)(n.strong,{children:"type"}),", ",(0,o.jsx)(n.strong,{children:"scope"})," and ",(0,o.jsx)(n.strong,{children:"subject"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"<type>(<scope>): <subject>\n<BLANK LINE>\n<body>\n<BLANK LINE>\n<footer>\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.strong,{children:"header"})," is mandatory and the ",(0,o.jsx)(n.strong,{children:"scope"})," of the header is optional."]}),"\n",(0,o.jsx)(n.h3,{id:"revert",children:"Revert"}),"\n",(0,o.jsxs)(n.p,{children:["If the commit reverts a previous commit, it should begin with ",(0,o.jsx)(n.code,{children:"revert:"}),", followed by the header of the reverted commit. In the body, it should say: ",(0,o.jsx)(n.code,{children:"This reverts commit <hash>."}),", where the hash is the SHA of the commit being reverted."]}),"\n",(0,o.jsx)(n.h3,{id:"type",children:"Type"}),"\n",(0,o.jsxs)(n.p,{children:["If the prefix is ",(0,o.jsx)(n.code,{children:"feat"}),", ",(0,o.jsx)(n.code,{children:"fix"})," or ",(0,o.jsx)(n.code,{children:"perf"}),", it will appear in the changelog. However, if there is any ",(0,o.jsx)(n.a,{href:"#footer",children:"BREAKING CHANGE"}),", the commit will always appear in the changelog."]}),"\n",(0,o.jsxs)(n.p,{children:["Other prefixes are up to your discretion. Suggested prefixes are ",(0,o.jsx)(n.code,{children:"docs"}),", ",(0,o.jsx)(n.code,{children:"chore"}),", ",(0,o.jsx)(n.code,{children:"style"}),", ",(0,o.jsx)(n.code,{children:"refactor"}),", and ",(0,o.jsx)(n.code,{children:"test"})," for non-changelog related tasks."]}),"\n",(0,o.jsx)(n.h3,{id:"scope",children:"Scope"}),"\n",(0,o.jsxs)(n.p,{children:["The scope refers to which section of the application the changes took place in, such as ",(0,o.jsx)(n.code,{children:"SlashCommand"}),", ",(0,o.jsx)(n.code,{children:"ContextMenu"}),", or ",(0,o.jsx)(n.code,{children:"MessageComponents"})]}),"\n",(0,o.jsx)(n.h3,{id:"subject",children:"Subject"}),"\n",(0,o.jsx)(n.p,{children:"The subject contains a succinct description of the change:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:'Use the imperative, present tense: "change", not "changed" nor "changes"'}),"\n",(0,o.jsx)(n.li,{children:"do not capitalize the first letter"}),"\n",(0,o.jsx)(n.li,{children:"do not end you message with a period (.)"}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"body",children:"Body"}),"\n",(0,o.jsxs)(n.p,{children:["Like in the ",(0,o.jsx)(n.strong,{children:"subject"}),", use the imperative, present tense\nThe body should include the motivation for the change and difference with the previous behavior."]}),"\n",(0,o.jsx)(n.h3,{id:"footer",children:"Footer"}),"\n",(0,o.jsxs)(n.p,{children:["The footer should contain any information about ",(0,o.jsx)(n.strong,{children:"Breaking Changes"})," and is also the place to\nreference GitHub issues that this commit ",(0,o.jsx)(n.strong,{children:"Closes"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Breaking Changes"})," should start with the word ",(0,o.jsx)(n.code,{children:"BREAKING CHANGE:"})," with a space or two newlines. The rest of the commit message is then used for this."]})]})}function a(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},5710:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>c});var o=t(758);const i={},s=o.createContext(i);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);