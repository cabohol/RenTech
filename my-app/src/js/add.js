import { supabase } from "./name";

const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

  const userId = localStorage.getItem("user_id");
  console.log("User ID:", userId); // Optional: Check the retrieved user ID in the console
  
  const form_add = document.getElementById("form_add");
  form_add.onsubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(form_add);

      console.log(formData.get("image_path"));
      const image = formData.get("image_path");
      const { data: storageData, error: storageError } = await supabase.storage
        .from('laptops')
        .upload('public/' + image.name, image, {
         cacheControl: "3600",
        upsert: true,
        });
     
      console.log(storageData);

    const image_data = storageData;

    const { data, error } = await supabase
      .from('laptops')
      .insert([
        {
          model: formData.get("model"),
          price: formData.get("price"),
          specs: formData.get("specs"),
          condition: formData.get("condition"),
          image_path: image_data == null ? null:image_data.path,
          userinformation_id: userId, // Use the retrieved user's ID here
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

async function getDatas() {
  let { data: laptops, error } = await supabase.from("laptops").select("*");

  let container = "";

  laptops.forEach((data) => {
    container += `
    <div class="col">
      <div class="card" id="cards" data-id="${data.id}" >
        <img src="${ itemsImageUrl + data.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
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
