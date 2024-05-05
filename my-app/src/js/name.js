// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createClient } from '@supabase/supabase-js'

import { setRouter } from './router/router.js'; //router para dile mo gawas if naka login na

setRouter(); //uncomment for disable router

// Create a single supabase client for interacting with your database
const supabase = createClient('https://vlzwiqqexbsievtuzfgm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsendpcXFleGJzaWV2dHV6ZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUzMDYsImV4cCI6MjAyODQ2MTMwNn0.kxsiLG__FkxF2DGhuUk1Ritc6tnt-W-S0qG4kizkDfI')


function successNotification(message, seconds = 0){
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if(seconds != 0){
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");

    }, seconds * 1000);
  }

}

function errorNotification(message, seconds = 0){
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if(seconds != 0){
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");

    }, seconds * 1000);
  }

}







async function doLogout() {
    let { error } = await supabase.auth.signOut();
  
    if (error == null) {
      alert("Logout Successfully!");
  
      localStorage.clear();
  
      window.location.pathname = "/login.html";
    } else {
      alert("Logout Failed!");
    }
  }
  
  export { supabase, doLogout, successNotification, errorNotification };