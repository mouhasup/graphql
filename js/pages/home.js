
import { homepageModule } from "../modules/homepageModule.js";

export async function homePage() {
  // Logique pour afficher la page d'accueil
  console.log('Home page loading');
  createContainer();

  console.log('Affichage de la page d\'accueil');
  homepageModule.init()
  
//   addLogoutButton();
}

function createContainer() {
    const homepage = document.querySelector('.homepage'); // Sélectionnez l'élément homepage
    let app = homepage.querySelector('.app'); // Essayez de trouver .app à l'intérieur de .homepage

    // Si .app n'existe pas déjà à l'intérieur de .homepage, créez-le et ajoutez-le
    if (!app) {
        app = document.createElement('div');
        app.classList.add('app');
        homepage.appendChild(app); // Ajoutez app à homepage
    }
    document.querySelector(".logout").style.display = 'block';

    const block1 = document.createElement("div")
    const block2 = document.createElement("div")
    const block3 = document.createElement("div")
    block1.className="box"
    block2.className="box"
    block3.className="box"
    addBlock("userinfos",block1)
    addBlock("xps",block1)
    addBlock("audits",block2)
    addBlock("skills",block2)
    addBlock("progress",block3)

    app.appendChild(block1)
    app.appendChild(block2)
    app.appendChild(block3)
    console.error("Welcome")
    

    


}

function addBlock(className, block) {
    const newDiv =  document.createElement('div');
        newDiv.classList.add(className);
        newDiv.classList.add("cave")
        block.appendChild(newDiv);
}


