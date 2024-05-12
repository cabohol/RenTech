import { supabase } from "./name";

const itemsImageUrl = "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

document.addEventListener('DOMContentLoaded', async function () {
    console.log("DOMContentLoaded event fired."); // Check that the event fires correctly
    const laptopInfoString = localStorage.getItem("laptop_info");
    const laptopInfo = laptopInfoString ? JSON.parse(laptopInfoString) : null;

    if (!laptopInfo) {
        console.log("No laptop information found in local storage.");
        return;
    }

    displayLaptopDetails(laptopInfo);

    if (laptopInfo.userinformation_id) {
        try {
            const { data: userDetails, error } = await supabase
                .from("userinformation")
                .select("*")
                .eq("id", laptopInfo.userinformation_id)
                .single();

            console.log('Fetched user details:', userDetails); // Log fetched details

            if (error) {
                console.error('Failed to fetch user details:', error);
                return;
            }

            if (userDetails) {
                displayUserDetails(userDetails);
                setupRatingSubmission(userDetails.id, laptopInfo.id, userDetails); // Pass user ID, laptop ID, and userDetails to setupRatingSubmission
            } else {
                console.log("No user details found for the provided user ID.");
            }
        } catch (err) {
            console.error('Error fetching user details:', err);
        }
    } else {
        console.log('No userinformation_id provided in laptopInfo');
    }
});

function displayLaptopDetails(laptopInfo) {
    document.getElementById("model").textContent = "Model :  " + laptopInfo.model || "Not available";
    document.getElementById("price").textContent = "Price :  Php " + laptopInfo.price + ".00" || "Not available";
    document.getElementById("specs").textContent = "Specification :  " + laptopInfo.specs || "Not available";
    document.getElementById("condition").textContent = "Condition :  " + laptopInfo.condition || "Not available";
    let imgElement = document.getElementById("image_path");
    imgElement.src = laptopInfo.image_path ? itemsImageUrl + laptopInfo.image_path : itemsImageUrl + "default_image.png";
    imgElement.alt = laptopInfo.image_path ? "Laptop Image" : "Not available";
}

function displayUserDetails(userDetails) {
    document.getElementById("first_name").textContent = "Name : " + userDetails.first_name + " " + userDetails.last_name;
    document.getElementById("contact_number").textContent = "Contact # : " + userDetails.contact_number;
    document.getElementById("college_name").textContent = "College : " + userDetails.college_name;
    document.getElementById("fb_link").href = userDetails.fb_link;
    document.getElementById("fb_link").children[1].textContent = userDetails.first_name + " " + userDetails.last_name;
}

async function setupRatingSubmission(userId, laptopId, userDetails) {
    const submitBtn = document.getElementById('feedbtn');
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    }
    submitBtn.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the form from submitting which would refresh the page
        await submitRating(userId, laptopId, userDetails); // Pass userId, laptopId, and userDetails to submitRating
    });
}

document.querySelectorAll('.rate input').forEach(input => {
    input.addEventListener('change', event => {
        if (event.target.checked) {
            const rating = parseInt(event.target.value);
            const emojiDisplay = document.getElementById('emoji-display');
            let emoji;

            switch (rating) {
                case 1:
                    emoji = 'Thanks For Rating Us!😠'; // Very Bad
                    break;
                case 2:
                    emoji = 'Thanks For Rating Us!🙁'; // Bad
                    break;
                case 3:
                    emoji = 'Thanks For Rating Us!🙂'; // Good
                    break;
                case 4:
                    emoji = 'Thanks For Rating Us!😃'; // Very Good
                    break;
                case 5:
                    emoji = 'Thanks For Rating Us!😍'; // Excellent
                    break;
                default:
                    emoji = ''; // In case of no valid rating
            }

            emojiDisplay.textContent = emoji;
            emojiDisplay.style.display = 'block'; // Show the emoji display
        }
    });
});

async function submitRating(userId, laptopId, userDetails) {
    const ratings = document.getElementsByName('rate');
    const selectedRating = Array.from(ratings).find(radio => radio.checked)?.value;

    if (!selectedRating) {
        alert('Please select a rating.');
        return;
    }
    if (!laptopId) {
        console.error('No laptop ID found for updating rating.');
        return;
    }

    try {
        // Check if the user has already rated this laptop
        const { data: existingRatings, error: ratingsError } = await supabase
            .from('ratings')
            .select('id')
            .eq('laptop_id', laptopId)
            .eq('userinformation_id', userId);

        if (ratingsError) {
            console.error('Error fetching existing ratings from Supabase:', ratingsError);
            return;
        }

        if (existingRatings.length > 0) {
            alert('You have already rated this laptop.');
            return;
        }

        // Insert the new rating into the ratings table
        const { data: ratingData, error: ratingError } = await supabase
            .from('ratings')
            .insert([
                { laptop_id: laptopId, userinformation_id: userDetails.id, ratings: selectedRating }
            ]);
    
        if (ratingError) {
            console.error('Error inserting rating in Supabase:', ratingError);
            return;
        }

        console.log('Rating successfully inserted in Supabase:', ratingData);
        window.location.href = 'feed.html'; // Redirect to the feed page after successful update
    } catch (err) {
        console.error('Failed to save rating:', err);
    }
}