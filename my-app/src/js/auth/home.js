import { doLogout, supabase } from "../name";

const itemsImageUrl =
  "https://vlzwiqqexbsievtuzfgm.supabase.co/storage/v1/object/public/laptops/";

const userId = localStorage.getItem("user_id");
console.log("User ID:", userId);

getDatas();
// btn_logout.onclick = doLogout;

async function getDatas() {
  let { data: laptops, error } = await supabase.from("laptops").select("*");
  /* .eq("userinformation", userId); */

  let container = "";

  laptops.forEach((data) => {

    container += `
    <div class="col-lg-6 col-md-6 col-sm-6 justify-content-center mb-3">
    <div class="card" id="cards" data-id="${data.id}">
                  <img
                  src="${itemsImageUrl + data.image_path}"
                    class="card-img-top pt-3"
                    id="homeimg"
                    alt="..."
                  />
                  <div class="card-body">
                    <div class="row text-center">
                      <h3 class="card-title">${data.model}</h3>
                      <h6>P${data.price}/Hour</h6>
                      <p></p>
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <button
                          class="text-white custom-btn d-flex justify-content-center align-items-center"
                        >
                          <a
                            style="text-decoration: none"
                            class="link-light"
                            href="viewmore.html"
                            >View More</a
                          >
                        </button>
                      </div>
                    </div>
                  </div>
                  </div> 
                
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 justify-content-center mb-3">
                <div class="card" id="cards" data-id="${data.id}">
                              <img
                              src="${itemsImageUrl + data.image_path}"
                                class="card-img-top pt-3"
                                id="homeimg"
                                alt="..."
                              />
                              <div class="card-body">
                                <div class="row text-center">
                                  <h3 class="card-title">${data.model}</h3>
                                  <h6>P${data.price}/Hour</h6>
                                  <p></p>
                                  <div
                                    class="d-flex justify-content-center align-items-center"
                                  >
                                    <button
                                      class="text-white custom-btn d-flex justify-content-center align-items-center"
                                    >
                                      <a
                                        style="text-decoration: none"
                                        class="link-light"
                                        href="viewmore.html"
                                        >View More</a
                                      >
                                    </button>
                                  </div>
                                </div>
                              </div>
                              </div> 
                            
                            </div>
      
      `;
  });

  document.getElementById("cardsContainer").innerHTML = container;
}
