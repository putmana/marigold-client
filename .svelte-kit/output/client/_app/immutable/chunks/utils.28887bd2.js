function l(t,r,o){return t<r?r:t>o?o:t}function u(t){let r="";return t.forEach((o,n)=>{n==t.length-1?r+=o.name:r+=o.name+", "}),r}function g(t,r=!1,o=!0){let n=Math.floor(t/3600),f=Math.floor(t/60),i=Math.floor(t%60),e="";return r?(n!=0&&(e+=n.toString()+" "+a("hour",n)+" "),f!=0&&(e+=f.toString()+" "+a("min",f)+" "),i!=0&&o&&(e+=i.toString()+" "+a("sec",i))):(n!=0&&(e+=n.toString()+":"),e+=(f<10&&n!=0?"0"+f.toString():f.toString())+(o?":":""),o&&(e+=i<10?"0"+i.toString():i.toString())),e}function a(t,r,o="s"){return r==1?t:t+o}function m(t){let r=0;return t.forEach(o=>{r+=o.duration}),r}export{g as a,l as c,u as f,a as p,m as s};
