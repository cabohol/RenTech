import { supabase } from "../name";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form_signup);

    if(formData.get("password") == formData.get("password_confirmation")){
        alert("Password match");

     const {data, error} = await supabase.auth.signUp({
        email: formData.get("email"),
        password: formData.get("password"),
     });
     

     let user_id = data?.user?.id;


        if(user_id != null){
            const { data, error } = await supabase
           .from('userinformation')
           .insert([
          { first_name: formData.get("first_name") ,
           last_name: formData.get("last_name") ,
           contact_number: formData.get("contact_number"),
           fb_link: formData.get("fb_link") ,
           user_id: user_id,
        },
        ])
        .select()
        }else{
            alert("error fetching");
            console.log(error);
        }


        
     







     console.log(data);
     console.log(error);


    }else{
        alert("password doesnt match");
        console.log(error);
    }

};
