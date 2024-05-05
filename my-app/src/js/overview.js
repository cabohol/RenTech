import { supabase } from "./name";


const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

const form_add = document.getElementById("form_add");

let laptop_info = localStorage.getItem("laptop_info");

//const userId = localStorage.getItem("user_id");
//console.log("User ID:", userId);
console.log(laptop_info);
document.getElementById("model").value = JSON.parse(laptop_info).model;
document.getElementById("price").value = JSON.parse(laptop_info).price;
document.getElementById("specs").value = JSON.parse(laptop_info).specs;
document.getElementById("condition").value = JSON.parse(laptop_info).condition;
document.getElementById("image_path").value = JSON.parse(laptop_info).image_path;
//getDatas();
// btn_logout.onclick = doLogout;

async function getDatas() {
  let { data: laptops, error } = await supabase.from("laptops").select("*");
  /* .eq("userinformation", userId); */

  let container = "";

  laptops.forEach((data) => {

    container += `
    <div class="col">
  <div class="card" id="cards" data-id="${data.id}" >
      <img src="${data.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
      <div class="card-body">
        <div class="row text-center">
          <h3 class="card-title">${data.model}</h3>
          <h6>P${data.price}/hr</h6>
          <p class="card-text"></p>
          <div class="d-flex justify-content-center align-items-center">
              <button class="text-white custom-btn"><a style="text-decoration: none;" class="link-light" href="viewmore.html">View More</a></button>
          </div>
           
        </div>
      </div>
  </div>
</div>
      `;
  });

  document.getElementById("cardsContainer").innerHTML = container;
}

form_add.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData (form_add);

  const { data, error } = await supabase
  .from('laptops')
  .insert([
    { model: formData.get("model") ,
    price: formData.get("price"),
    specs: formData.get("specs"),
    condition: formData.get("condition"),
    image_path: formData.get("image_path"),
  },
  ])
  .select();
  if (error) {
    console.error("Error adding laptop:", error.message);
} else {
    console.log("Laptop added successfully:", data);
    // Redirect to home page or trigger a refresh to update the displayed laptops
    window.location.href = "home.html";
}
};