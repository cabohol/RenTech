import { supabase, successNotification, errorNotification } from "../name";

const form_signup = document.getElementById("form_signup");

form_signup.onsubmit = async (e) => {
    e.preventDefault();

    //Disable button
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
    const programName = formData.get("program_name");
    
    if (password == formData.get("password_confirmation")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        let userId = signUpData?.user?.id;

        if (userId != null) {
            const { data: userInfoData, error: userInfoError } = await supabase
                .from('userinformation')
                .insert([
                    {
                        first_name: firstName,
                        last_name: lastName,
                        contact_number: contactNumber,
                        fb_link: fbLink,
                        user_id: userId,
                    },
                ]);
                /* const Id = userInfoData[0].id; */
               /*  console.log(Id);
 */
            const { data: collegeData, error: collegeError } = await supabase
                .from('college')
                .insert([
                    {
                        college_name: collegeName,
                      /*   user_id: Id, */
                    },
                ]);

               /*  const college_id = collegeData[0].id; */
                /* console.log(college_id); */

            const { data: programData, error: programError } = await supabase
                .from('program')
                .insert([
                    {
                        program_name: programName,
                       /*  college_id: college_id, */
                    },
                ]);

            successNotification("Sign up Successfully!", 10);
            //alert("Sign Up Successful");
           // window.location.href="login.html";
           
        } else {
            errorNotification("Cannot register account.", 10);
            //alert(`Error: ${signUpError.message}`);
            console.log(signUpError);
        }
       //Reset Form
         form_signup.reset();

         //Enable submit button
         document.querySelector("#form_signup button").disabled = false;
         document.querySelector("#form_signup button").innerHTML = 'Sign up';
   
        } else {
        alert("Password doesn't match");
    }
};