import { supabase } from "./name";


const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

let allLaptops = [];  // This array will store all laptop data

document.addEventListener("DOMContentLoaded", async () => {
  await loadAllLaptops();
});

document.getElementById("btnsearch").addEventListener("click", () => {
  const keyword = document.querySelector('input[name="search"]').value.trim().toLowerCase();
  filterLaptops(keyword);
});

// Function to load all laptops from the database
async function loadAllLaptops() {
  let { data: laptops, error } = await supabase.from("laptops").select("*");

  if (error) {
    console.error("Error fetching laptops:", error.message);
    return;
  }

  allLaptops = laptops;  // Store the fetched laptops globally
  displayLaptops(allLaptops);  // Display all laptops initially
}

// Function to display laptops
function displayLaptops(laptops) {
  let container = document.getElementById("cardsContainer");
  container.innerHTML = "";  // Clear the container before loading new data

  laptops.forEach((laptop) => {
    container.innerHTML += `
      <div class="col">
      <div class="card" data-id="${laptop.id}">
        <img src="${itemsImageUrl +  laptop.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
        <div class="card-body">
          <div class="row text-center">
            <h3 class="card-title">${laptop.model}</h3>
            <h6>Php ${laptop.price}.00/hr</h6>
            <div class="d-flex justify-content-center align-items-center">
              <button class="text-white custom-btn">
                <a style="text-decoration: none;" class="link-light" href="viewmore.html">View More</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
}

// Function to filter laptops based on search keyword
function filterLaptops(keyword) {
  const filteredLaptops = allLaptops.filter(laptop => 
    laptop.model.toLowerCase().includes(keyword)
  );
  displayLaptops(filteredLaptops);  // Redisplay laptops based on search
}