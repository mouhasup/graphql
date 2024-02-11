// js/modules/signinPageModule.js


import { help } from "./help.js"

export const signinPageModule = {
    init() {
        // Initialisez le module de la page de connexion
        // Configurer les gestionnaires d'événements liés à la connexion
        // signinPage()
        // console.log("Initialisation")
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Ajoutez des gestionnaires d'événements pour le formulaire de connexion
        const form = document.querySelector('.auth-form'); // Assurez-vous que c'est le sélecteur correct pour votre formulaire
    
        form.addEventListener("submit", (event) => {
            // Empêcher le comportement par défaut du formulaire
            event.preventDefault();

            // Récupérer les informations du formulaire
            var username = document.getElementById('username').value;
            var password = document.getElementById('pwd').value;

            console.log('Username:', username);
            console.log('Password:', password);
            
            this.login(username, password)
                .then((jwtToken) => {
                  help.saveToken(jwtToken)
                  window.location.pathname = "/"
                })
        })
        
    },
    async login(username, password) {
        console.log("Login...")
        const url = 'https://learn.zone01dakar.sn/api/auth/signin';
        const credentials = `${username}:${password}`;
        const base64Credentials = btoa(credentials);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error response not ok")
          this.showErrorMessage()
          throw new Error(errorData.error);
        }
      
        const data = await response.json();
        console.log("data:", data)
        return data; // Le jeton JWT
      },
      showErrorMessage() {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.style.display = 'block';
    
        setTimeout(() => {
            errorMessage.style.display = 'none';
        },  3000); //  3000 millisecondes =  3 secondes
      }
    // Ajoutez d'autres méthodes selon les besoins
};
