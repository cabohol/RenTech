import { supabase, doLogout } from "./name";

const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

document.addEventListener('DOMContentLoaded', async function () {
    const laptopInfoString = localStorage.getItem("laptop_info");
    console.log(laptopInfoString);
    const laptopInfo = laptopInfoString ? JSON.parse(laptopInfoString) : null;

    if (laptopInfo) {
        // Fetch and display laptop details
        displayLaptopDetails(laptopInfo);

        // Fetch and display owner's user details
        if (laptopInfo.userinformation_id) {
            const { data: userDetails, error } = await supabase
                .from("userinformation")
                .select("*")
                .eq("id", laptopInfo.userinformation_id)
                .single();

            if (error) {
                console.error('Failed to fetch user details:', error);
                return;
            }

            if (userDetails) {

                const fullName = userDetails.first_name + " " + userDetails.last_name;

                document.getElementById("first_name").textContent = "Name : " + userDetails.first_name + " " + userDetails.last_name;
                document.getElementById("contact_number").textContent = "Contact # : " + userDetails.contact_number;
                document.getElementById("college_name").textContent = "College : " + userDetails.college_name;
                document.getElementById("fb_link").href = userDetails.fb_link;
                document.getElementById("fb_link").children[1].textContent =  userDetails.first_name + " " + userDetails.last_name ;
            } else {
                console.log("No user details found for the provided user ID.");
            }
        } else {
            console.log("No userinformation_id found in laptop data.");
        }
    } else {
        console.log("No laptop information found in local storage.");
    }
});

function displayLaptopDetails(laptopInfo) {
    document.getElementById("model").textContent = "Model :  " + laptopInfo.model || "Not available";
    document.getElementById("price").textContent = "Price :  Php " + laptopInfo.price + ".00" || "Not available";
    document.getElementById("specs").textContent = "Specification :  " + laptopInfo.specs || "Not available";
    document.getElementById("condition").textContent = "Condition :  " + laptopInfo.condition || "Not available";


    let imgElement = document.getElementById("image_path");
    if (laptopInfo.image_path) {
        imgElement.src = itemsImageUrl + laptopInfo.image_path;
    } else {
        imgElement.src = itemsImageUrl + laptopInfo.image_path; // Specify a default image path if no image is available
        imgElement.alt = "Not available";
    }
    
}