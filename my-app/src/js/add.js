import { supabase, errorNotification, successNotification, } from "./name";

const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

  const userId = localStorage.getItem("user_id");
  console.log("User ID:", userId); // Optional: Check the retrieved user ID in the console
  

  const cancelBtn = document.getElementById("buttoncan");
  cancelBtn.addEventListener("click", () => {
    form_add.reset();
  });
  


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
      errorNotification("Cannot Add Laptop.", 10);
        console.log(error);
    } else {
      successNotification("Laptop Added Successfully!", 10);   
      form_add.reset();   // Redirect to home page or trigger a refresh to update the displayed laptops
      window.location.href = "home.html";
    }
  };


