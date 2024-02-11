// js/pages/signin.js

import { signinPageModule } from "../modules/signinPageModule.js";

export function signinPage() {
    // Logique pour afficher la page de connexion
    const homepage = document.querySelector('.homepage'); // Sélectionnez l'élément homepage
    let app = homepage.querySelector('.app'); // Essayez de trouver .app à l'intérieur de .homepage

    // Si .app n'existe pas déjà à l'intérieur de .homepage, créez-le et ajoutez-le
    if (!app) {
        app = document.createElement('div');
        app.classList.add('app');
        homepage.appendChild(app); // Ajoutez app à homepage
    }
    document.querySelector(".logout").style.display = 'none';
    // Nettoyez le contenu existant de .app et ajoutez le formulaire de connexion
    app.innerHTML = "";
    app.appendChild(createLoginForm());
    errorMessage()
    console.log('Affichage de la page de connexion');
    signinPageModule.init();
}

function createLoginForm() {
    const form = document.createElement('form');
    form.classList.add('auth-form');

        form.innerHTML = `
            <label for="username">Username</label><br>
            <input type="text" id="username" name="username"><br>
            <label for="pwd">Password</label><br>
            <input type="password" id="pwd" name="pwd"><br>
            <input class="submit" type="submit" value="Submit">
            `
    return form;
}

function errorMessage() {
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList.add("error-message")
    errorMessageDiv.style.display = 'none';

    // Créer le paragraphe à l'intérieur de la div
    const errorMessageParagraph = document.createElement('p');
    errorMessageParagraph.textContent = 'Error Username or password';

    // Ajouter le paragraphe à la div
    errorMessageDiv.appendChild(errorMessageParagraph);

    // Ajouter la div au body du document
    document.body.appendChild(errorMessageDiv);
}