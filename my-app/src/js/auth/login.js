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
        let { data: userinformation, error } = await supabase
            .from("userinformation")
            .select("*")
    
         // Save user id in local storage
        localStorage.setItem("user_id", userinformation[0].id);
        console.log(userinformation[0].id);


        if (session != null) {
            const userRole = userinformation[0].Role;
            const userId = user.id;

            alert("Login Successfully");
            window.location.pathname = '/home.html';
        }
    } else {
        alert(`Error: ${error.message}`);
        console.log(error);
    }

    // Resetting form
    form_login.reset();

    
};