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

  laptops.forEach((laptop, index) => {
    container.innerHTML += `
      <div class="col">
      <div class="card" id="cards" data-id="${laptop.id}">
        <img src="${itemsImageUrl +  laptop.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
        <div class="card-body">
          <div class="row text-center">
            <h3 class="card-title">${laptop.model}</h3>
            <h6>Php ${laptop.price}.00/hr</h6>
            <div class="d-flex justify-content-center align-items-center">
              <button class="text-white custom-btn">
                <a style="text-decoration: none;" class="link-light" data-index="${index}">View More</a>
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


async function testFunction(index) {
  const laptop = allLaptops[index]; // Accessing the global array allLaptops
  if (laptop) { // Make sure there's a laptop at this index
    localStorage.setItem("laptop_info", JSON.stringify(laptop));
    console.log(laptop);
    // You can add any other steps related to displaying information here
    window.location.pathname = '/viewmore.html'; // Redirect to viewmore.html
  } else {
    console.error("No laptop found at index:", index);
  }
}


document.getElementById("cardsContainer").addEventListener("click", function(event) {
  if (event.target.classList.contains("link-light")) {
    const index = parseInt(event.target.dataset.index);
    testFunction(index);
  }
});