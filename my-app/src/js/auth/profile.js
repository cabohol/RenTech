import { supabase, doLogout } from "../name";

document.body.addEventListener("click", function (event) {
  if (event.target.id === "logout_btn") {
    doLogout();
  }
});