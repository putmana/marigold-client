import { c as create_ssr_component, a as subscribe, g as each, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import { I as Info_banner } from "../../../../chunks/info-banner.js";
import { t as token } from "../../../../chunks/auth.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-e9akid.svelte-e9akid::-webkit-scrollbar{appearance:none;width:5px}.svelte-e9akid.svelte-e9akid::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}form.svelte-e9akid.svelte-e9akid{width:300px;margin-bottom:60px;color:rgba(255, 255, 255, 0.5)}.banners.svelte-e9akid.svelte-e9akid{width:300px;margin-bottom:30px}.watermark.svelte-e9akid.svelte-e9akid{display:flex;align-items:center;justify-content:flex-end;flex-direction:column;margin-bottom:30px;color:var(--bright-light)}.watermark.svelte-e9akid .logo.svelte-e9akid{font-size:60px;margin-bottom:10px}.watermark.svelte-e9akid .text.svelte-e9akid{margin-bottom:5px;font-size:larger;font-weight:bold;text-transform:lowercase}.input.svelte-e9akid.svelte-e9akid{margin-bottom:30px;width:100%}.input.svelte-e9akid .input-text.svelte-e9akid{width:100%;color:white;padding:10px;box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;background-color:rgba(0, 0, 0, 0.2);transition:all 0.15s ease}.input.svelte-e9akid .input-text.svelte-e9akid::placeholder{color:rgba(255, 255, 255, 0.2)}.input.svelte-e9akid .input-text.svelte-e9akid:hover{background-color:rgba(0, 0, 0, 0.4);border:1px solid rgba(255, 255, 255, 0.2)}.input.svelte-e9akid .input-text.svelte-e9akid:focus,.input.svelte-e9akid .input-text.svelte-e9akid:focus-visible{appearance:none;outline:none;background-color:rgba(0, 0, 0, 0.4);border:1px solid var(--bright-light);outline:var(--bright-light) solid 2px}.subtitle.svelte-e9akid.svelte-e9akid{font-size:smaller;text-align:center;color:rgba(255, 255, 255, 0.5)}.subtitle.svelte-e9akid a.svelte-e9akid{color:rgba(255, 255, 255, 0.5);color:var(--bright-light);font-weight:bold;text-decoration:none;border-radius:2.5px;transition:all 0.15s ease}.subtitle.svelte-e9akid a.svelte-e9akid:hover{color:var(--main-light);cursor:pointer}.subtitle.svelte-e9akid a.svelte-e9akid:focus,.subtitle.svelte-e9akid a.svelte-e9akid:focus-visible{outline:var(--main-light) solid 2px;color:var(--main-light)}.btn-primary.svelte-e9akid.svelte-e9akid{width:100%;color:rgba(255, 255, 255, 0.8);padding:10px;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;background-color:rgba(255, 255, 255, 0.15);font-weight:bold;text-transform:uppercase;transition:background-color 0.15s ease}.btn-primary.svelte-e9akid.svelte-e9akid:hover:enabled{background-color:rgba(255, 255, 255, 0.3);border:1px solid rgba(255, 255, 255, 0.2)}.btn-primary.svelte-e9akid.svelte-e9akid:focus:enabled,.btn-primary.svelte-e9akid.svelte-e9akid:focus-visible:enabled{appearance:none;outline:none;background-color:rgba(255, 255, 255, 0.3);border:1px solid rgba(255, 255, 255, 0.4);outline:var(--main-light) solid 2px}.btn-primary.svelte-e9akid.svelte-e9akid:disabled{opacity:50%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => value);
  let email = "";
  let password = "";
  let errors = [];
  $$result.css.add(css);
  $$unsubscribe_token();
  return `<div class="banners svelte-e9akid">${each(errors, (message) => {
    return `${validate_component(Info_banner, "InfoBanner").$$render($$result, { message, style: "error" }, {}, {})}`;
  })}</div>

<div class="watermark svelte-e9akid"><div class="logo svelte-e9akid"><i class="bi bi-flower1 svelte-e9akid"></i></div>
    <div class="text svelte-e9akid">login
    </div></div>
<form class="svelte-e9akid"><div class="input svelte-e9akid"><input class="input-text svelte-e9akid" name="email" type="email" placeholder="email address" required${add_attribute("value", email, 0)}></div>
    <div class="input svelte-e9akid"><input class="input-text svelte-e9akid" name="password" type="password" placeholder="password" required${add_attribute("value", password, 0)}></div>
    <div class="input svelte-e9akid"><input class="btn-primary svelte-e9akid" type="submit" value="LOG IN"></div>
    <div class="subtitle svelte-e9akid">Need an account?
        <a href="/auth/register" class="svelte-e9akid">Get one</a></div>
</form>`;
});
export {
  Page as default
};
