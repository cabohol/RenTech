import { supabase, doLogout } from "./name";

// Get user ID from localStorage
let userId = localStorage.getItem("user_id");

console.log(userId); // I-print ang userId para sa debugging purposes

document.addEventListener('DOMContentLoaded', async function () {
    // Check if userId exists
    if (userId) {
        // Fetch the user's details from Supabase
        let { data: userDetails, error } = await supabase
            .from("userinformation")
            .select("*")
            .eq("id", userId)
            .single();

        if (userDetails) {
            document.getElementById("first_name").textContent = userDetails.first_name;
            document.getElementById("last_name").textContent = "Last name: "  + userDetails.last_name;
            document.getElementById("contact_number").textContent = "Contact #: " + userDetails.contact_number;
            document.getElementById("college_name").textContent = "College: " + userDetails.college_name;
            document.getElementById("fb_link").textContent = "Facebook: " + userDetails.fb_link;

        }
    }
});


