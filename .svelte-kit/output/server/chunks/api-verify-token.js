import { U as UNAUTHORIZED_TOKEN, B as BASE_API_URL, A as API_VERSION } from "./auth.js";
const VERIFY_URL = BASE_API_URL + API_VERSION + "/verify";
async function verifyToken(token) {
  if (token === UNAUTHORIZED_TOKEN)
    return false;
  let valid = await fetch(VERIFY_URL, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  }).then((response) => {
    if (!response.ok) {
      console.error("2:", response);
      return false;
    } else {
      return response.json().then((data) => {
        if (data.message === "VALID") {
          console.log("TOKEN VALID");
          return true;
        } else {
          console.log("INVALID TOKEN");
          return false;
        }
      }).catch((error) => {
        console.error("3:", error);
        return false;
      });
    }
  }).catch((error) => {
    console.error("4:", error);
    return false;
  });
  return valid;
}
export {
  verifyToken as v
};
