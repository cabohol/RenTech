import { errorNotification, successNotification, supabase } from "../name";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_signup button").disabled = true;
  document.querySelector("#form_signup button").innerHTML = '<div class="spinner-border me-2" role="status"></div> <span>Loading..</span>';

  const formData = new FormData(form_signup);
  const password = formData.get("password");
  const email = formData.get("email");
  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const contactNumber = formData.get("contact_number");
  const fbLink = formData.get("fb_link");
  const collegeName = formData.get("college_name");

  if (password == formData.get("password_confirmation")) {
    try {
      const { data: signUpData } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      let userId = signUpData?.user?.id;

      if (userId != null) {
        const { data: userInfoData } = await supabase
          .from("userinformation")
          .insert([
            {
              first_name: firstName,
              last_name: lastName,
              contact_number: contactNumber,
              fb_link: fbLink,
              college_name: collegeName,
              user_id: userId,
            },
          ])
          .select();

        successNotification("Registered Successfully", 10);
       // window.location.href = "login.html";
      } else {
        throw new Error("User ID not available.");
      }
    } catch (error) {
      errorNotification("Cannot register account.", 2);
      console.log(error);
    }

    form_signup.reset();
    document.querySelector("#form_signup button").disabled = false;
    document.querySelector("#form_signup button").innerHTML = 'Sign Up';
  } else {
    errorNotification("Password doesn't match.", 2);
    form_signup.reset();
    document.querySelector("#form_signup button").disabled = false;
    document.querySelector("#form_signup button").innerHTML = 'Sign Up';
  }
};
