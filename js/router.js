// router.js
import { homePage } from "./pages/home.js";
import { signinPage } from "./pages/signin.js";
import { help } from "./modules/help.js";

const routes = {
    '/home': homePage,
    '/signin': signinPage,
}

export const router = {
 async   init() {
        // Event handler for url change
        console.log("url change", window.location.pathname)
        
        window.addEventListener('popstate', async() => {
            console.log("Listener Check Route:", window.location.pathname)
            this.checkSession(window.location.pathname)
            // this.navigate(path)
        })
        // go to the current route at page loaded
        console.log("First Check Route:", window.location.pathname)
        // const path =athis.navigate(this.checkSession(window.location.pathname))
        this.checkSession(window.location.pathname)
        // console.log("path is:", path)
        // this.navigate(path)
    },    
    navigate(path) {
        
        console.log("navigate, path:", path)
        const routeHandler = routes[path];
        console.log("routeHandler:", routeHandler)
        if (routeHandler) {
            window.history.pushState({ path }, "", "/index.html");
            routeHandler(); // Call the function directly
            console.log("pushstate done")
        }else {
            console.log("No route found")
            this.navigate("/");
        }
    }, 
    checkSession(path) {

        if (help.getToken() != null) {
            this.navigate("/home");
        }else {
            this.navigate("/signin");
        }
    }
    
    // ...
}
