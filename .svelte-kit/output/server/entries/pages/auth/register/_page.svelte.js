import { c as create_ssr_component, g as each, d as add_attribute, v as validate_component, e as escape } from "../../../../chunks/index2.js";
import { I as Info_banner } from "../../../../chunks/info-banner.js";
var registerIssue = /* @__PURE__ */ ((registerIssue2) => {
  registerIssue2["generic"] = "generic";
  registerIssue2["username"] = "name";
  registerIssue2["email"] = "email";
  registerIssue2["password"] = "password";
  registerIssue2["confirmPassword"] = "confirm_password";
  return registerIssue2;
})(registerIssue || {});
const VALID_EMAIL = {
  NO_WHITESPACE: /(?!.*\s)/,
  EMAIL_CHARS: /@.*\./
};
const VALID_USERNAME = {
  ALLOWED_CHARS: /^[a-zA-Z0-9_]+$/
};
const VALID_PASSWORD = {
  DIGIT: /(?=.*\d)/,
  LOWER_CASE: /(?=.*[a-z])/,
  UPPER_CASE: /(?=.*[A-Z])/,
  SPECIAL: /(?=.*[^a-zA-Z0-9])/,
  NO_WHITESPACE: /^\S+$/
};
function checkEmail(email) {
  let issues = [];
  if (!VALID_EMAIL.NO_WHITESPACE.test(email) || !VALID_EMAIL.EMAIL_CHARS.test(email))
    issues.push({
      category: "email",
      message: "Invalid email address"
    });
  return issues;
}
function checkUsername(username) {
  let issues = [];
  if (username.length < 4)
    issues.push({
      category: "name",
      message: "Username must contain at least 4 characters"
    });
  if (username.length > 32)
    issues.push({
      category: "name",
      message: "Maximum username length is 32 characters"
    });
  if (!VALID_USERNAME.ALLOWED_CHARS.test(username))
    issues.push({
      category: "name",
      message: "Username may only contain alphanumeric characters and _"
    });
  return issues;
}
function checkPassword(password) {
  let issues = [];
  if (password.length < 8)
    issues.push({
      category: "password",
      message: "- At least 8 characters"
    });
  if (password.length > 200)
    issues.push({
      category: "password",
      message: "- No more than 200 characters"
    });
  if (!VALID_PASSWORD.UPPER_CASE.test(password))
    issues.push({
      category: "password",
      message: "- At least one uppercase letter"
    });
  if (!VALID_PASSWORD.LOWER_CASE.test(password))
    issues.push({
      category: "password",
      message: "- At least one lowercase letter"
    });
  if (!VALID_PASSWORD.DIGIT.test(password))
    issues.push({
      category: "password",
      message: "- At least one number"
    });
  if (!VALID_PASSWORD.SPECIAL.test(password))
    issues.push({
      category: "password",
      message: "- At least one special character"
    });
  if (!VALID_PASSWORD.NO_WHITESPACE.test(password))
    issues.push({
      category: "password",
      message: "- No whitespace"
    });
  return issues;
}
function checkPasswordsMatch(password, confirmPassword) {
  let issues = [];
  if (password !== confirmPassword)
    issues.push({
      category: "confirm_password",
      message: "Passwords do not match"
    });
  return issues;
}
function auditRegister(username, email, password, confirmPassword) {
  return [
    ...checkUsername(username),
    ...checkEmail(email),
    ...checkPassword(password),
    ...checkPasswordsMatch(password, confirmPassword)
  ];
}
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-e9akid.svelte-e9akid::-webkit-scrollbar{appearance:none;width:5px}.svelte-e9akid.svelte-e9akid::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}form.svelte-e9akid.svelte-e9akid{width:300px;margin-bottom:60px;color:rgba(255, 255, 255, 0.5)}.banners.svelte-e9akid.svelte-e9akid{width:300px;margin-bottom:30px}.watermark.svelte-e9akid.svelte-e9akid{display:flex;align-items:center;justify-content:flex-end;flex-direction:column;margin-bottom:30px;color:var(--bright-light)}.watermark.svelte-e9akid .logo.svelte-e9akid{font-size:60px;margin-bottom:10px}.watermark.svelte-e9akid .text.svelte-e9akid{margin-bottom:5px;font-size:larger;font-weight:bold;text-transform:lowercase}.input.svelte-e9akid.svelte-e9akid{margin-bottom:30px;width:100%}.input.svelte-e9akid .input-text.svelte-e9akid{width:100%;color:white;padding:10px;box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;background-color:rgba(0, 0, 0, 0.2);transition:all 0.15s ease}.input.svelte-e9akid .input-text.svelte-e9akid::placeholder{color:rgba(255, 255, 255, 0.2)}.input.svelte-e9akid .input-text.svelte-e9akid:hover{background-color:rgba(0, 0, 0, 0.4);border:1px solid rgba(255, 255, 255, 0.2)}.input.svelte-e9akid .input-text.svelte-e9akid:focus,.input.svelte-e9akid .input-text.svelte-e9akid:focus-visible{appearance:none;outline:none;background-color:rgba(0, 0, 0, 0.4);border:1px solid var(--bright-light);outline:var(--bright-light) solid 2px}.input.svelte-e9akid .input-text.issue.svelte-e9akid{outline-color:rgba(255, 0, 0, 0.8);border-color:rgba(255, 0, 0, 0.8)}.input.svelte-e9akid .warning.svelte-e9akid{font-size:smaller;font-weight:bold;margin-left:10px;margin-top:10px;margin-bottom:5px}.input.svelte-e9akid .warning p.svelte-e9akid{color:rgba(255, 0, 0, 0.8);margin:0;margin-top:5px}.input.svelte-e9akid .helper.svelte-e9akid{font-size:smaller;margin-left:10px}.input.svelte-e9akid .helper p.svelte-e9akid{margin:0}.subtitle.svelte-e9akid.svelte-e9akid{font-size:smaller;text-align:center;color:rgba(255, 255, 255, 0.5)}.subtitle.svelte-e9akid a.svelte-e9akid{color:rgba(255, 255, 255, 0.5);color:var(--bright-light);font-weight:bold;text-decoration:none;border-radius:2.5px;transition:all 0.15s ease}.subtitle.svelte-e9akid a.svelte-e9akid:hover{color:var(--main-light);cursor:pointer}.subtitle.svelte-e9akid a.svelte-e9akid:focus,.subtitle.svelte-e9akid a.svelte-e9akid:focus-visible{outline:var(--main-light) solid 2px;color:var(--main-light)}.btn-primary.svelte-e9akid.svelte-e9akid{width:100%;color:rgba(255, 255, 255, 0.8);padding:10px;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;background-color:rgba(255, 255, 255, 0.15);font-weight:bold;text-transform:uppercase;transition:background-color 0.15s ease}.btn-primary.svelte-e9akid.svelte-e9akid:hover:enabled{background-color:rgba(255, 255, 255, 0.3);border:1px solid rgba(255, 255, 255, 0.2)}.btn-primary.svelte-e9akid.svelte-e9akid:focus:enabled,.btn-primary.svelte-e9akid.svelte-e9akid:focus-visible:enabled{appearance:none;outline:none;background-color:rgba(255, 255, 255, 0.3);border:1px solid rgba(255, 255, 255, 0.4);outline:var(--main-light) solid 2px}.btn-primary.svelte-e9akid.svelte-e9akid:disabled{opacity:50%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let genericIssues;
  let usernameIssues;
  let emailIssues;
  let passwordIssues;
  let confirmPasswordIssues;
  let issues = [];
  let username = "alkesta";
  let email = "adam.putman@outlook.com";
  let password = "Tagetes11!";
  let confirmPassword = "Tagetes11!";
  $$result.css.add(css);
  issues = auditRegister(username, email, password, confirmPassword);
  issues = issues;
  genericIssues = issues.filter((issue) => issue.category === registerIssue.generic);
  usernameIssues = issues.filter((issue) => issue.category === registerIssue.username);
  emailIssues = issues.filter((issue) => issue.category === registerIssue.email);
  passwordIssues = issues.filter((issue) => issue.category === registerIssue.password);
  confirmPasswordIssues = issues.filter((issue) => issue.category === registerIssue.confirmPassword);
  return `<div class="banners svelte-e9akid">${each(genericIssues, (issue) => {
    return `${validate_component(Info_banner, "InfoBanner").$$render($$result, { message: issue.message, style: "error" }, {}, {})}`;
  })}</div>

<div class="watermark svelte-e9akid"><div class="logo svelte-e9akid"><i class="bi bi-flower1 svelte-e9akid"></i></div>
    <div class="text svelte-e9akid">register
    </div></div>
<form class="svelte-e9akid"><div class="input svelte-e9akid"><input class="${[
    "input-text svelte-e9akid",
    usernameIssues.length > 0 && username.length > 0 ? "issue" : ""
  ].join(" ").trim()}" type="username" placeholder="username" maxlength="32"${add_attribute("value", username, 0)}>
        <div class="warning svelte-e9akid">${username.length > 0 ? `${each(usernameIssues, (issue) => {
    return `<p class="svelte-e9akid">${escape(issue.message)}</p>`;
  })}` : ``}</div></div>
    <div class="input svelte-e9akid"><input class="${[
    "input-text svelte-e9akid",
    emailIssues.length > 0 && email.length > 0 ? "issue" : ""
  ].join(" ").trim()}" type="email" placeholder="email address"${add_attribute("value", email, 0)}>
        ${email.length > 0 ? `<div class="warning svelte-e9akid">${each(emailIssues, (issue) => {
    return `<p class="svelte-e9akid">${escape(issue.message)}</p>`;
  })}</div>` : ``}</div>
    <div class="input svelte-e9akid"><input class="${[
    "input-text svelte-e9akid",
    (passwordIssues.length > 0 || confirmPasswordIssues.length > 0) && password.length > 0 ? "issue" : ""
  ].join(" ").trim()}" type="password" placeholder="password" maxlength="200"${add_attribute("value", password, 0)}>
        ${password.length > 0 ? `<div class="warning svelte-e9akid">${each(confirmPasswordIssues, (issue) => {
    return `<p class="svelte-e9akid">${escape(issue.message)}</p>`;
  })}
                ${passwordIssues.length > 0 ? `<p class="svelte-e9akid">Password must contain:</p>` : ``}</div>
            <div class="helper svelte-e9akid">${each(passwordIssues, (issue) => {
    return `<p class="svelte-e9akid">${escape(issue.message)}</p>`;
  })}</div>` : ``}</div>
    <div class="input svelte-e9akid"><input class="${["input-text svelte-e9akid", confirmPasswordIssues.length > 0 ? "issue" : ""].join(" ").trim()}" type="password" placeholder="confirm password"${add_attribute("value", confirmPassword, 0)}>
        <div class="warning svelte-e9akid">${each(confirmPasswordIssues, (issue) => {
    return `<p class="svelte-e9akid">${escape(issue.message)}</p>`;
  })}</div></div>
    <div class="input svelte-e9akid"><input class="btn-primary svelte-e9akid" type="submit" value="REGISTER" ${issues.length > 0 ? "disabled" : ""}></div>
    <div class="subtitle svelte-e9akid">Have an account?
        <a href="/auth/login" class="svelte-e9akid">Log in</a></div>
</form>`;
});
export {
  Page as default
};
