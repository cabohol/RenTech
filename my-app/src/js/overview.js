import { supabase } from "./name";


const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";


// Fetch elements once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    let laptop_info = localStorage.getItem("laptop_info");
    console.log(laptop_info);

    // Check if laptop_info exists and parse it
    if (laptop_info) {
        laptop_info = JSON.parse(laptop_info);
        document.getElementById("model").value = laptop_info.model;
        document.getElementById("price").value = laptop_info.price;
        document.getElementById("specs").value = laptop_info.specs;
        document.getElementById("condition").value = laptop_info.condition;
        
        // Set the image path in a separate element
        const imagePath = laptop_info.image_path;
        document.getElementById("image_path").textContent = imagePath;
      }
      
    // Setup event listeners for buttons
    setupEventListeners();
});

function setupEventListeners() {
    // Delete button
    const buttonCancel = document.getElementById("buttoncancel");
    if (buttonCancel) {
        buttonCancel.addEventListener("click", deleteItem);
    } else {
        console.log('Delete button not found');
    }

    // Save button
    const buttonSave = document.getElementById("buttonsave");
    if (buttonSave) {
        buttonSave.addEventListener("click", editItem);
    } else {
        console.log('Save button not found');
    }
}
async function deleteItem(e) {
  const id = e.target.dataset.id; // Assuming you pass the id as a data attribute
  try {
      const { error } = await supabase
          .from('laptops')
          .delete()
          .eq('id', id);

      if (error) {
          throw error;
      }

      console.log('Item deleted successfully');
      // Redirect to overview1 page
      window.location.href = '/overview1.html'; // Adjust the URL as needed
  } catch (error) {
      console.error('Error deleting item:', error.message);
  }
}
// Function to fetch laptop data from Supabase
async function getDatas() {
    let { data: laptops, error } = await supabase.from("laptops").select("*");
    if (error) {
        console.error('Error fetching laptops:', error);
        return;
    }

    // Assume here that you might want to do something with the fetched laptops
    console.log('Fetched laptops:', laptops);
}



/*form_add.onsubmit = async (e) => {
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
};  */