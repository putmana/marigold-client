import{U as t,B as a,A as n}from"./mg.config.c6f47e45.js";const s=a+n+"/verify";async function f(o){return o===t?!1:await fetch(s,{method:"GET",headers:{Authorization:"Bearer "+o}}).then(e=>e.ok?e.json().then(r=>r.message==="VALID"?(console.log("TOKEN VALID"),!0):(console.log("INVALID TOKEN"),!1)).catch(r=>(console.error("3:",r),!1)):(console.error("2:",e),!1)).catch(e=>(console.error("4:",e),!1))}export{f as v};