import{S as O,i as U,s as K,o as h,p as k,q as $,w as _,x as p,y as g,l as T,z as d,A as P,B as b,h as v,C as Q,f as D,a as V,g as z,D as F,E as H,F as I,n as L}from"../chunks/index.fabf1593.js";import{D as R}from"../chunks/deck.1807290b.js";import{T as Z,a as j}from"../chunks/track-item.c99746c3.js";import{V as C}from"../chunks/void.9408c301.js";import{U as y}from"../chunks/mg.config.c6f47e45.js";import{a as G}from"../chunks/api-playlists.c2e2c1b9.js";import{b as J}from"../chunks/palette.1f7ca4c4.js";import{q as w,s as M,a as W}from"../chunks/player.6751a396.js";import{s as E}from"../chunks/utils.28887bd2.js";import{t as N}from"../chunks/auth.cb11a4f9.js";import{d as S}from"../chunks/colors.63b2af4a.js";function A(a,e,l){const t=a.slice();return t[9]=e[l],t[11]=l,t}function X(a){let e,l;return e=new C({props:{text:a[12]}}),{c(){h(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,s){$(e,t,s),l=!0},p(t,s){const r={};s&1&&(r.text=t[12]),e.$set(r)},i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){g(e,t)}}}function Y(a){let e,l,t,s;e=new Z({props:{id:a[0].info.id,title:a[0].info.title,artists:a[0].info.username,category:"Playlist",count:a[0].tracks.length,duration:E(a[0].tracks),cover:a[0].info.cover.path}});let r=a[0].tracks,n=[];for(let o=0;o<r.length;o+=1)n[o]=B(A(a,r,o));const m=o=>p(n[o],1,1,()=>{n[o]=null});return{c(){h(e.$$.fragment),l=V();for(let o=0;o<n.length;o+=1)n[o].c();t=b()},l(o){k(e.$$.fragment,o),l=z(o);for(let i=0;i<n.length;i+=1)n[i].l(o);t=b()},m(o,i){$(e,o,i),v(o,l,i);for(let f=0;f<n.length;f+=1)n[f]&&n[f].m(o,i);v(o,t,i),s=!0},p(o,i){const f={};if(i&1&&(f.id=o[0].info.id),i&1&&(f.title=o[0].info.title),i&1&&(f.artists=o[0].info.username),i&1&&(f.count=o[0].tracks.length),i&1&&(f.duration=E(o[0].tracks)),i&1&&(f.cover=o[0].info.cover.path),e.$set(f),i&7){r=o[0].tracks;let u;for(u=0;u<r.length;u+=1){const c=A(o,r,u);n[u]?(n[u].p(c,i),_(n[u],1)):(n[u]=B(c),n[u].c(),_(n[u],1),n[u].m(t.parentNode,t))}for(F(),u=r.length;u<n.length;u+=1)m(u);H()}},i(o){if(!s){_(e.$$.fragment,o);for(let i=0;i<r.length;i+=1)_(n[i]);s=!0}},o(o){p(e.$$.fragment,o),n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)p(n[i]);s=!1},d(o){g(e,o),o&&D(l),I(n,o),o&&D(t)}}}function B(a){let e,l;function t(){return a[5](a[0],a[11])}function s(){return a[6](a[9])}return e=new j({props:{track:a[9],position:a[11]+1}}),e.$on("queuethislist",t),e.$on("queuethistrack",s),{c(){h(e.$$.fragment)},l(r){k(e.$$.fragment,r)},m(r,n){$(e,r,n),l=!0},p(r,n){a=r;const m={};n&1&&(m.track=a[9]),e.$set(m)},i(r){l||(_(e.$$.fragment,r),l=!0)},o(r){p(e.$$.fragment,r),l=!1},d(r){g(e,r)}}}function x(a){let e,l;return e=new C({props:{text:"loading..."}}),{c(){h(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,s){$(e,t,s),l=!0},p:L,i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){g(e,t)}}}function ee(a){let e,l,t,s={ctx:a,current:null,token:null,hasCatch:!0,pending:x,then:Y,catch:X,value:0,error:12,blocks:[,,,]};return P(l=a[0],s),{c(){e=b(),s.block.c()},l(r){e=b(),s.block.l(r)},m(r,n){v(r,e,n),s.block.m(r,s.anchor=n),s.mount=()=>e.parentNode,s.anchor=e,t=!0},p(r,n){a=r,s.ctx=a,n&1&&l!==(l=a[0])&&P(l,s)||Q(s,a,n)},i(r){t||(_(s.block),t=!0)},o(r){for(let n=0;n<3;n+=1){const m=s.blocks[n];p(m)}t=!1},d(r){r&&D(e),s.block.d(r),s.token=null,s=null}}}function te(a){let e,l;return e=new R({props:{$$slots:{default:[ee]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,s){$(e,t,s),l=!0},p(t,[s]){const r={};s&8193&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){l||(_(e.$$.fragment,t),l=!0)},o(t){p(e.$$.fragment,t),l=!1},d(t){g(e,t)}}}function re(a,e,l){let t,s,r,n;T(a,w,c=>l(7,s=c)),T(a,N,c=>l(4,r=c)),T(a,S,c=>l(8,n=c));let{data:m}=e;function o(c,q){d(w,s=M(c,q),s)}function i(c){d(w,s=W([c]),s)}const f=(c,q)=>o(c.tracks,q),u=c=>i(c);return a.$$set=c=>{"data"in c&&l(3,m=c.data)},a.$$.update=()=>{a.$$.dirty&24&&l(0,t=G(r,m.id).then(c=>(d(S,n=J(c.info.cover.color),n),c)).catch(c=>{throw c.message==="BAD TOKEN"&&d(N,r=y,r),new Error(c)}))},[t,o,i,m,r,f,u]}class pe extends O{constructor(e){super(),U(this,e,re,te,K,{data:3})}}export{pe as default};