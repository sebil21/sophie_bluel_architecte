// Récupération des travaux depuis le back-end avec la fonction fetch
const projetApi = await fetch("http://localhost:5678/api/works")
const projets = await projetApi.json()

// Récupérer l'élement du DOM pour la galerie
const galerie = document.querySelector('.gallery')

// Utiliser JS pour ajouter à la galerie les travaux de l’architecte que j'ai récupéré
async function ajouterGalerie(projets) {
    galerie.innerHTML="" // vider la galerie
    for(let i = 0; i < projets.length; i++){
        const article = projets[i]
        // Créer la balise principale
        const figure = document.createElement("figure")
        // Créer les balises enfants
        const image = document.createElement("img")
        image.src = article.imageUrl
        image.alt = article.title
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = article.title
        // Attacher les balises entre elles
        galerie.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(figCaption)
    }
}
ajouterGalerie(projets)




// Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie
const categorieApi = await fetch("http://localhost:5678/api/categories")
const categorie = await categorieApi.json()
console.log(categorie)

const categoryDiv = document.querySelector('.category')

// Boutons Objets, Appartements, Hotels & Restaurants
async function displayBtn() {
    categorie.forEach(function(categorie) {
     const btn = document.createElement("button")
     btn.textContent = categorie.name
     btn.id = categorie.id
     btn.classList.add('btn-filter', 'greenBtn')

     btn.addEventListener("click", function(event){
        event.preventDefault()
        const filterProjet = projets.filter(function(p){
            return p.categoryId === categorie.id
        })

        ajouterGalerie(filterProjet)
     })

     categoryDiv.appendChild(btn)   
    });
}
displayBtn()

// Bouton TOUS
const all = document.querySelector('.all-btn');

all.addEventListener("click", function(event){
    event.preventDefault()
    ajouterGalerie(projets)
})



// Récupérer le token depuis le stockage local
const login = window.localStorage.getItem("token");
const iconeDiv = document.querySelector(".icone");
const editionDiv = document.querySelector(".edition");
const logout = document.querySelector(".logout");

// Si User connecté
if (login) {
    console.log("Utilisateur connecté");

    // Si user connecté, supprimer filtres
    categoryDiv.innerHTML = '';

    // Créer boutons d'édition
    const iconeEntete = document.createElement("i");
    iconeEntete.classList.add("fa-regular", "fa-pen-to-square");
    const enTeteText = document.createElement("p");
    enTeteText.textContent = "Mode édition";
    editionDiv.style.display = "flex";

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    const iconText = document.createElement("p");
    iconText.textContent = "Modifier";

    // Relier les enfants aux parents
    iconeDiv.appendChild(icon);
    iconeDiv.appendChild(iconText);
    editionDiv.appendChild(iconeEntete);
    editionDiv.appendChild(enTeteText);

    // Se déconnecter
    logout.textContent = "Logout";

    logout.addEventListener("click", function (event) {
        event.preventDefault()
        window.localStorage.removeItem("token");
        document.location.reload() //Revenir à la page d'accueil après logout
    });
} 


//AFFICHAGE MODALE AU CLIC DU BOUTON MODIFIER

const modalContainer = document.querySelector(".modal-container")
const modalWindow = document.querySelector(".modal-window")
const modalWindowContain = document.querySelector(".modal-window-contain")
const closeBtn = document.querySelector(".fa-xmark")
const arrowLeft = document.querySelector(".fa-arrow-left")
const galleryModal = document.querySelector(".gallery-modal")



iconeDiv.addEventListener("click", function() {
    console.log("Modale ouverte")
    modalContainer.style.display = "flex";
    //Créer .modal-window-contain
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = "Galerie photo";
    const galleryModal = document.createElement("div");
    galleryModal.classList.add("gallery-modal")
    const modalBtnAddImg = document.createElement("button");
    modalBtnAddImg.textContent = "Ajouter une photo"
    modalBtnAddImg.classList.add("btn-add-img")
    // Relier les enfants aux parents
    modalWindowContain.appendChild(modalTitle);
    modalWindowContain.appendChild(galleryModal);
    modalWindowContain.appendChild(modalBtnAddImg);

    ajouterGalerie(projets);
})

closeBtn.addEventListener("click", function(){
    console.log("Modale fermé")
    modalContainer.style.display = "none"
})


// Ajouter galerie dans modale
