(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[951],{8111:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_index",function(){return n(491)}])},2845:function(e,t,n){"use strict";var r=n(5893);let s=e=>{let{title:t,subtitle:n}=e;return(0,r.jsxs)("div",{className:" p-2 flex flex-col items-center",children:[(0,r.jsx)("span",{className:"text-4xl font-semibold",children:t}),(0,r.jsx)("span",{className:"text-lg",children:n})]})};t.Z=s},491:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return S},default:function(){return k}});var r=n(5893),s=n(2845),a=n(7294),l=n(9053);function c(e,t){let n={};return t.forEach(t=>{e(t).forEach(e=>{n[e]=[...n[e]||[],t]})}),n}var i=n(7895),u=n(1664),d=n.n(u),o=n(7706),f=n(4184),x=n.n(f);let h="[Untitled]",m="[Uncategorized]",j="[Untagged]",g="Title",p="Categories",v="Tags",_=[g,p,v],N=e=>e.metadata.title||e.id,E=e=>e.sort((e,t)=>N(e).localeCompare(N(t))),w=(e,t)=>{let n=e[0].localeCompare(t[0]);return[e[0][0],t[0][0]].includes("[")&&(n*=-1),n},b=e=>{let{group:t,articles:n}=e;return(0,r.jsxs)("div",{className:"mt-4",children:[(0,r.jsx)("p",{className:"text-xl",children:t}),(0,r.jsx)("ul",{className:"ml-4",children:n.map((e,t)=>(0,r.jsx)("li",{children:(0,r.jsx)(d(),{href:i.Y2(e.id),children:N(e)},t)}))})]})},C=e=>{let{indexBy:t,targetIndexBy:n,setIndexBy:s}=e;return(0,r.jsx)("span",{className:x()("button m-2",{selected:t===n}),onClick:()=>s(n),children:n})},U=e=>{let{contentInfo:t}=e,n=(0,o.Z)(),[i,u]=(0,a.useState)(p),[d,f]=(0,a.useState)({}),[x,N]=(0,a.useState)({}),[U,O]=(0,a.useState)({});return(0,a.useEffect)(()=>{let e=function(e,t){let n={};return t.forEach(t=>{let r=e(t);n[r]=[...n[r]||[],t]}),n}(e=>{let t=e.metadata.title;return t?t[0].toUpperCase():h},t.articles);n.index.showUntitled||delete e[h],Object.values(e).forEach(E),f(e)},[t]),(0,a.useEffect)(()=>{let e=c(e=>{var t;return(null===(t=e.metadata.categories)||void 0===t?void 0:t.length)>0?e.metadata.categories:[m]},t.articles);n.index.showUncategorized||delete e[m],Object.values(e).forEach(E),N(e)},[t]),(0,a.useEffect)(()=>{let e=c(e=>{var t;return(null===(t=e.metadata.tags)||void 0===t?void 0:t.length)>0?e.metadata.tags:[j]},t.articles);n.index.showUntagged||delete e[j],Object.values(e).forEach(E),O(e)},[t]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l.Z.Header,{children:[(0,r.jsx)(s.Z,{title:"Index",subtitle:""}),(0,r.jsx)("div",{className:"flex flex-col justify-center items-center",children:(0,r.jsx)("div",{className:"flex flex-row justify-center items-center",children:_.map(e=>(0,r.jsx)(C,{setIndexBy:u,indexBy:i,targetIndexBy:e},e))})})]}),(0,r.jsx)(l.Z.Main,{children:Object.entries((()=>{switch(i){case g:return d;case p:return x;case v:return U;default:return{}}})()).sort(w).map((e,t)=>{let[n,s]=e;return(0,r.jsx)(b,{group:n,articles:s},t)})})]})},O=e=>{let{contentInfo:t}=e;return(0,r.jsx)(U,{contentInfo:t})};var S=!0,k=O}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8111)}),_N_E=e.O()}]);