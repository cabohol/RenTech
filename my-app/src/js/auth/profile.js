import { supabase, doLogout } from "../name";

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
            document.getElementById("first_name").textContent = userDetails.first_name + " " + userDetails.last_name;
            document.getElementById("contact_number").textContent = "Contact #: " + userDetails.contact_number;
            document.getElementById("college_name").textContent = "College: " + userDetails.college_name;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profilePicInput = document.getElementById("profilePicInput");
    const profilePic = document.querySelector(".profile-pic-container img");
    const profButton = document.getElementById("profbutton");

    profButton.addEventListener("click", function () {
        profilePicInput.click(); 
    });

    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            profilePic.src = e.target.result;

            // I-save ang base64 string ng larawan sa localStorage
            localStorage.setItem("profilePic", e.target.result);

            // I-save usab ang base64 string sa server o database
            saveProfilePicToServer(e.target.result);
        };

        reader.readAsDataURL(file);
    });

    // Kapag ang page ay nag-reload o nag-refresh, i-set ang larawan mula sa localStorage
    window.addEventListener("load", function () {
        const savedProfilePic = localStorage.getItem("profilePic");
        if (savedProfilePic) {
            profilePic.src = savedProfilePic;
        }
    });
});

document.body.addEventListener("click", function (event) {
    if (event.target.id === "logout_btn") {
        localStorage.removeItem("profilePic"); // Clear ang larawan sa localStorage
        doLogout();
    }
});

async function saveProfilePicToServer(base64Image) {
    try {
        // Padala ang base64Image sa server o database API
        const response = await fetch("save-profile-pic-endpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Isalbar ang base64Image sa JSON format
            },
            body: JSON.stringify({ image: base64Image }),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to save profile picture");
        }
    } catch (error) {
        console.error("Error saving profile picture:", error);
    }
}
