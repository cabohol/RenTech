import { supabase } from "./name";

const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

// Fetch elements once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  let laptop_info = localStorage.getItem("laptop_info");

  // Check if laptop_info exists and parse it
  if (laptop_info) {
    laptop_info = JSON.parse(laptop_info);
    document.getElementById("model").value = laptop_info.model;
    document.getElementById("price").value = laptop_info.price;
    document.getElementById("specs").value = laptop_info.specs;
    document.getElementById("condition").value = laptop_info.condition;
    

    let imgElement = document.getElementById("image_path");
    if (laptop_info.image_path) {
        imgElement.src = itemsImageUrl + laptop_info.image_path;
    } else {
        imgElement.src = itemsImageUrl + laptop_info.image_path; // Specify a default image path if no image is available
        imgElement.alt = "Not available";
    }
   


  }
});


document
  .getElementById("buttoncancel")
  .addEventListener("click", async function (event) {
    // Disable the button and change text to indicate loading
    const deleteButton = document.getElementById("buttoncancel");
    deleteButton.disabled = true;
    deleteButton.textContent = 'Deleting...';

    let laptop_info = localStorage.getItem("laptop_info");
    await deleteItem(JSON.parse(laptop_info).id);

    // Optionally re-enable the button and reset text if needed here
    deleteButton.disabled = false;
    deleteButton.textContent = 'Delete';
  });


async function deleteItem(id) {
  const { error } = await supabase.from("laptops").delete().eq("id", id);
  window.location.pathname = "/overview1.html"; // Adjust the URL as needed
}

document
  .getElementById("buttonsave")
  .addEventListener("click", async function (event) {
    const saveButton = document.getElementById("buttonsave");
    saveButton.disabled = true;
    saveButton.textContent = 'Saving...';

    // Fetch updated values from the form
    const model = document.getElementById("model").value;
    const price = document.getElementById("price").value;
    const specs = document.getElementById("specs").value;
    const condition = document.getElementById("condition").value;
    const image = document.getElementById("image_path");

    // Upload image to Supabase storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('laptops')
      .upload('public/' + image.name, image, {
        cacheControl: "3600",
        upsert: true,
      });

    // Handle storage errors if any
    if (storageError) {
      console.error('Storage upload error:', storageError);
      alert('Failed to upload image: ' + storageError.message);
      saveButton.disabled = false;
      saveButton.textContent = 'Save';
      return;
    }

    // Update item in Supabase with image path
    const image_path = storageData.Key; // Assuming the image path is in storageData.Key
    let laptop_info = localStorage.getItem("laptop_info");
    if (laptop_info) {
      laptop_info = JSON.parse(laptop_info);
      await updateItem({...laptop_info, model, price, specs, condition, image_path});
    }

    saveButton.disabled = false;
    saveButton.textContent = 'Save';
  });

async function updateItem(updatedItem) {
  const { data, error } = await supabase
    .from("laptops")
    .update({
      model: updatedItem.model, 
      price: updatedItem.price, 
      specs: updatedItem.specs, 
      condition: updatedItem.condition, 
      image_path: updatedItem.image_path
    })
    .eq("id", updatedItem.id)
    .select();
  if (error) {
    console.error('Update error:', error);
    alert('Failed to save changes: ' + error.message);
  } else {
    window.location.pathname = "/overview1.html"; // Adjust the URL as needed
  }
}
