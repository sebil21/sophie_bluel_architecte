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

// Boutons Tous, Objets, Appartements, Hotels & Restaurants
//*****Création des boutons = OK */
async function displayBtn() {
    categorie.forEach(function(element) {
     const btn = document.createElement("button")
     btn.textContent = element.name
     btn.id = element.id
     btn.classList.add('btn-filter', 'greenBtn')
     btn.addEventListener("click", function(event){
        event.preventDefault()
        const filterProjet = projets.filter(function(p){
            return p.categoryId === element.id
        })
        ajouterGalerie(filterProjet)
     })
     categoryDiv.appendChild(btn)   
    });
}
displayBtn()

// Filtre au clic par catégorie
//*****Sélection bouton TOUS */
const all = document.querySelector('.all-btn');

// Ajout d'un écouteur d'événements sur le bouton TOUS
all.addEventListener("click", function(event){
    event.preventDefault()
    ajouterGalerie(projets)
})