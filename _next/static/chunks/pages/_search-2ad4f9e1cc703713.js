(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[681],{655:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_search",function(){return s(3134)}])},3704:function(e,t,s){"use strict";var n=s(5893),l=s(1664),r=s.n(l);s(7294);var i=s(7895);let c=e=>{let{taxonomy:t,values:s}=e;return(0,n.jsxs)("div",{className:"text-sm",children:[(0,n.jsxs)("span",{children:[t,": "]}),(0,n.jsx)("span",{children:s.map((e,s)=>(0,n.jsxs)("span",{className:"inline-block",children:[s>0&&", ",(0,n.jsx)(r(),{href:i.c6(t,e),children:e})]},s))})]})};t.Z=function(e){let{articleInfo:t}=e,{id:s,metadata:l}=t;return(0,n.jsxs)("div",{children:[(0,n.jsx)(r(),{className:"text-2xl font-bold",href:i.Y2(s),children:l.title}),l.description?(0,n.jsx)("p",{className:"font-sans",children:l.description}):void 0,(0,n.jsx)("div",{className:"mb-2"}),l.categories.length>0?(0,n.jsx)(c,{taxonomy:"Categories",values:l.categories}):void 0,l.tags.length>0?(0,n.jsx)(c,{taxonomy:"Tags",values:l.tags}):void 0]})}},2845:function(e,t,s){"use strict";var n=s(5893);let l=e=>{let{title:t,subtitle:s}=e;return(0,n.jsxs)("div",{className:" p-2 flex flex-col items-center",children:[(0,n.jsx)("span",{className:"text-4xl font-semibold",children:t}),(0,n.jsx)("span",{className:"text-lg",children:s})]})};t.Z=l},3134:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return d},default:function(){return f}});var n=s(5893),l=s(1163),r=s(2845),i=s(7294),c=s(3606),a=s(3704),u=s(9053);let o=e=>{let{contentInfo:t,initialQuery:s}=e,l=(0,i.useRef)(null),[o,x]=(0,i.useState)(new c.Z([])),[d,f]=(0,i.useState)([]),[h,j]=(0,i.useState)("");(0,i.useEffect)(()=>{var e;null===(e=l.current)||void 0===e||e.focus()}),(0,i.useEffect)(()=>{j(s)},[s]),(0,i.useEffect)(()=>{let e=new c.Z(t.articles);x(e)},[t]),(0,i.useEffect)(()=>{let e=o.searchArticles(h,o.indexedArticlesCount);f(e)},[h]);let m=e=>{j(e.target.value)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(u.Z.Header,{children:[(0,n.jsx)(r.Z,{title:"Search",subtitle:""}),(0,n.jsx)("div",{className:"m-4 flex flex-col justify-center items-center",children:(0,n.jsx)("input",{ref:l,className:"text-input",type:"text",value:h,onChange:m})})]}),(0,n.jsx)(u.Z.Main,{children:(0,n.jsx)("div",{children:d.map((e,t)=>(0,n.jsx)(a.Z,{articleInfo:e},t))})})]})},x=e=>{let{contentInfo:t}=e,s=(0,l.useRouter)(),r=s.query.query||"";return(0,n.jsx)(o,{contentInfo:t,initialQuery:r})};var d=!0,f=x}},function(e){e.O(0,[774,888,179],function(){return e(e.s=655)}),_N_E=e.O()}]);