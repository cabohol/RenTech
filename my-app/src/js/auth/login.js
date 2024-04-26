import { supabase } from "../name";

const form_login = document.getElementById("emailform");

form_login.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form_login);

  //supabase sign-in

  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  let session = data.session;
  let user = data.user;

  console.log(user);

  if (session != null) {
    // Store tokens for API
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);

    // For role-based authentication; uncomment if you want to implement example: admin log-in
    localStorage.setItem("auth_id", user?.id);

    // Fetch user profiles
    let { data: userinformation, error } = await supabase
      .from("userinformation")
      .select("*")
      .eq("user_id", localStorage.getItem("auth_id"));

    localStorage.setItem("user_id", userinformation[0].id);
    console.log(userinformation[0].id);

    // Redirect to home page after successful login
    window.location.pathname = "/home.html";

    alert("Login Successfully");
  } else {
    alert(`Error: ${error.message}`);
    console.log(error);
  }

  // Resetting form
  form_login.reset();
};
