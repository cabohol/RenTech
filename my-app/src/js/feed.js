import { supabase } from "./name";

const laptopsImageUrl = "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

let allLaptops = [];  // This array will store all laptop data

document.addEventListener("DOMContentLoaded", async () => {
  await loadAllLaptops();
});

// Function to load all laptops from the database
async function loadAllLaptops() {
  let { data: laptops, error } = await supabase.from("laptops").select("*");

  if (error) {
    console.error("Error fetching laptops:", error.message);
    return;
  }

  allLaptops = laptops;  // Store the fetched laptops globally
  laptops.forEach(laptop => fetchAndDisplayRatings(laptop.id));  // Fetch and display ratings for each laptop
  displayLaptops(allLaptops);  // Display all laptops initially
}

// Function to display laptops
function displayLaptops(laptops) {
  let container = document.getElementById("cardsContainer");
  container.innerHTML = "";  // Clear the container before loading new data

  laptops.forEach((laptop) => {
    container.innerHTML += `
      <div class="col-lg-4 py-2">
        <div class="card mx-auto" id="cards" data-id="${laptop.id}">
          <img src="${laptopsImageUrl}${laptop.image_path}" class="card-img-top pt-3" alt="${laptop.model}">
          <div class="card-body">
            <h3 class="card-title text-center"><a style="text-decoration: none;"laptopId=${laptop.id}" class="link-dark">${laptop.model}</a></h3>
            <p class="card-text text-center">Php ${laptop.price}.00/hr</p>
            <div class="text-center" id="ratings-${laptop.id}">Loading ratings...</div>  <!-- Placeholder for star ratings -->
          </div>
        </div>
      </div>
    `;
  });
}

async function fetchAndDisplayRatings(laptopId) {
    try {
        const { data: ratings, error } = await supabase
            .from('ratings')
            .select('ratings')
            .eq('laptop_id', laptopId);

        if (error) {
            console.error('Error fetching ratings:', error);
            return;
        }

        const averageRating = ratings.reduce((acc, curr) => acc + curr.ratings, 0) / ratings.length;
        displayStars(averageRating, laptopId);
    } catch (err) {
        console.error('Error fetching and displaying ratings:', err);
    }
}

function displayStars(averageRating, laptopId) {
  const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest half
  let stars = '';
  for (let i = 1; i <= 5; i++) {
      stars += i <= roundedRating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>'; // Use string concatenation instead of JSX syntax
  }
  document.getElementById(`ratings-${laptopId}`).innerHTML = stars; // Corrected quotes and backticks
}
