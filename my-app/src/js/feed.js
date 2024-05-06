import { supabase } from "./name";

const laptopsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";




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
  displayLaptops(allLaptops);  // Display all laptops initially
}

// Function to display laptops
// Function to display laptops
function displayLaptops(laptops) {
  let container = document.getElementById("cardsContainer");
  container.innerHTML = "";  // Clear the container before loading new data

  laptops.forEach((laptop) => {
    container.innerHTML += `
    <div class="col-lg-4 py-2">
      <div class="card mx-auto" id="cards" data-id="${laptop.id}">
        <img src="${laptopsImageUrl}${laptop.image_path}" class="card-img-top pt-3 text-center" alt="...">
        <div class="card-body">
          <h3 class="card-title text-center"><a style="text-decoration: none;"  href="viewmore.html" class="link-dark">${laptop.model}</a></h3>
          <p class="card-text text-center">Php ${laptop.price}.00/hr</p>
        
          <div class="text-center">
            <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value="3"/>
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text">1 star</label>
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