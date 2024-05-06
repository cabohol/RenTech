import { supabase } from "./name";

let laptops = []; // Tukuyin ang laptops sa labas ng getDatas function at bigyan ito ng default na kahon


const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";




async function getDatas() {
  let { data, error } = await supabase.from("laptops").select("*");
  laptops = data || []; // Isalin ang data sa laptops, kung wala, ilagay ang kahon
  console.log(laptops);
  let userId = localStorage.getItem("user_id");
  if (error) {
    console.error("Error fetching laptops:", error.message);
  } else {
    let container = "";
    laptops.forEach((data, index) => {
      if (data.userinformation_id == userId) {
        container += `
          <div class="col">
            <div class="card" data-id="${data.id}">
              <img src="${itemsImageUrl}${data.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
              <div class="card-body">
                <div class="row text-center">
                  <h3 class="card-title">${data.model}</h3>
                  <p class="card-text"></p>
                  <div class="d-flex justify-content-center align-items-center">
                    <button class="text-white custom-btn view-button" data-index="${index}">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    });
    document.getElementById("cardsContainer").innerHTML = container;
  }
}

async function testFunction(index) {
  const laptop = laptops[index]; // Kumuha ng laptop sa index na binigay
  if (laptop) { // Tiyakin na mayroong laptop sa index na ito
    localStorage.setItem("laptop_info", JSON.stringify(laptop));
    console.log(laptop);
    // Dito ay maaari mong gawin ang anumang iba pang mga hakbang na may kinalaman sa pagpapakita ng impormasyon
    window.location.pathname = '/overview.html';
    } else {
    console.error("No laptop found at index:", index);
  }
}

getDatas(); // Tawagin ang getDatas nang mauna upang kunin agad ang mga data

document.getElementById("cardsContainer").addEventListener("click", function(event) {
  if (event.target.classList.contains("view-button")) {
    const index = parseInt(event.target.dataset.index);
    testFunction(index);
  }
});