import { errorNotification, successNotification, supabase } from "../name";

const form_login = document.getElementById("emailform");

form_login.onsubmit = async (e) => {
    e.preventDefault();


     //Disable button
     document.querySelector("#emailform button").disabled = true;
     document.querySelector("#emailform button").innerHTML = '<div class="spinner-border me-2" role="status"></div> <span>Loading..</span>';


    const formData = new FormData(form_login);

    //supabase sign-in
    
    let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    let session = data.session;
    let user = data.user;
    
    // console.log(session);

    if (session != null) {
        // Store tokens for API
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("refresh_token", session.refresh_token);

       
      
        let fetchedUser = null;
        // For role-based authentication; uncomment if you want to implement example: admin log-in
        let { data: userinformation, error } = await supabase
            .from("userinformation")
            .select("*")
        for (let i = 0; i < userinformation.length; i++) {
            if(userinformation[i].user_id==user.id)
                fetchedUser=userinformation[i].id;
        }
         // Save user id in local storage
        localStorage.setItem("user_id", fetchedUser);


        if (session != null) {
            const userRole = userinformation[0].Role;
            const userId = user.id;

           successNotification("Login Successfully!");
            window.location.pathname = '/home.html';
        }
    } else {
        //alert(`Error: ${error.message}`);
        errorNotification("Cannot login account", 2);
        console.log(error);
    }

    // Resetting form
    form_login.reset();
     //Enable submit button
     document.querySelector("#emailform button").disabled = false;
     document.querySelector("#emailform button").innerHTML = 'Log in';

    
};