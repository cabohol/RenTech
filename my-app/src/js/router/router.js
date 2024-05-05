function setRouter() {
  
    switch (window.location.pathname) {
      // If you are logged in, you can't access outside pages; redirect to dashboard
      case "/":
      case "/index.html":
      case "/signup.html":
      case "/login.html":
        if (localStorage.getItem("access_token")) {
          window.location.pathname = "/home.html"; // default page when logged in
        }
        break;
  
      // If you are not logged in, you can't access dashboard pages; redirect to /
      case "/home.html":
      case "/aboutme.html":
      case "/add.html":
      case "/feed.html":
      case "/profile.html":
      case "/overview.html":
      case "/overview1.html":
      case "/viewmore.html":
      case "/viewmore1.html":
      
        if (!localStorage.getItem("access_token")/*  || (userRole !== "user" && userRole !== "Admin") */) {
          window.location.pathname = "/index.html"; // redirect to home page if not logged in or not an owner/admin
        }
        break;
  
   
  
      default:
        break;
    }
  }
  
  export { setRouter };
  