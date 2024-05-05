import { supabase } from "./name";

//const userId = localStorage.getItem("user_id");
//console.log("User ID:", userId);

async function getDatas() {
    let { data: laptops, error } = await supabase.from("laptops").select("*");

    if (error) {
        console.error("Error fetching laptops:", error.message);
    } else {
        let container = "";

        laptops.forEach((data) => {
            container += `
            <div class="col">
            <div class="card" id="cards" data-id="${data.id}" >
                <img src="${data.image_path}" class="card-img-top pt-2 mx-auto" alt="...">
                <div class="card-body">
                  <div class="row text-center">
                    <h3 class="card-title">${data.model}</h3>
                    <h6>Php ${data.price}.00/hr</h6>
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
}

getDatas();
