// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createClient } from '@supabase/supabase-js'

import { setRouter } from './router/router'; //router para dile mo gawas if naka login na

setRouter(); //uncomment for disable router

// Create a single supabase client for interacting with your database
const supabase = createClient('https://vlzwiqqexbsievtuzfgm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsendpcXFleGJzaWV2dHV6ZmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4ODUzMDYsImV4cCI6MjAyODQ2MTMwNn0.kxsiLG__FkxF2DGhuUk1Ritc6tnt-W-S0qG4kizkDfI')

async function doLogout() {
    let { error } = await supabase.auth.signOut();
  
    if (error == null) {
      alert("Logout Successfully!");
  
      localStorage.clear();
  
      window.location.pathname = "/index.html";
    } else {
      alert("Logout Failed!");
    }
  }
  
  export { supabase, doLogout };