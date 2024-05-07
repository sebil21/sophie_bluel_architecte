// Récupération des travaux depuis le back-end avec la fonction fetch
const projetApi = await fetch("http://localhost:5678/api/works")
const projets = await projetApi.json()

// Récupérer l'élement du DOM pour la galerie
const galerie = document.querySelector('.gallery')

// Ajouter galerie
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


// Filtres
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

    // Si user connecté, supprimer filtres et remplacer par bouton d'édition
    categoryDiv.innerHTML = '';

    // Création boutons d'édition
    const iconeEntete = document.createElement("i");
    iconeEntete.classList.add("fa-regular", "fa-pen-to-square");
    const enTeteText = document.createElement("p");
    enTeteText.textContent = "Mode édition";
    editionDiv.style.display = "flex";

    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    const iconText = document.createElement("p");
    iconText.textContent = "Modifier";

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


// Affichage modale galerie
const modalContainer = document.querySelector(".modal-container")
const modalWindow = document.querySelector(".modal-window")
const modalWindowContain = document.querySelector(".modal-window-contain")
const closeBtn = document.querySelector(".fa-xmark")
const arrowLeft = document.querySelector(".fa-arrow-left")
const galleryModal = document.querySelector(".gallery-modal")
const modalForm = document.querySelector(".modal-form")

iconeDiv.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("Modale ouverte")
    modalContainer.style.display = "flex";
    modalWindowContain.innerHTML = ""

    const modalTitle = document.createElement("h3");
    modalTitle.textContent = "Galerie photo";

    const modalBtnAddImg = document.createElement("button");
    modalBtnAddImg.textContent = "Ajouter une photo"
    modalBtnAddImg.classList.add("btn-add-img")

    modalWindowContain.appendChild(modalTitle);
    modalWindowContain.appendChild(galleryModal);
    modalWindowContain.appendChild(modalBtnAddImg);

    // Affichage modale formulaire
     modalBtnAddImg.addEventListener("click", function(event){
         event.preventDefault()
         console.log("Valider la photo")
         arrowLeft.style.display = "flex";
         galleryModal.innerHTML = ""
         modalTitle.textContent = "Ajout photo"
         modalBtnAddImg.textContent = "Valider"
         modalBtnAddImg.classList.add("grey-btn")

         const form = document.createElement("form")
         form.classList.add("form-contain")
         form.action = "#"
         form.method = "post"

         const addImgDiv = document.createElement("div")
         addImgDiv.classList.add("add-img")

         const iconeImg = document.createElement("i")
         iconeImg.classList.add("fa-regular", "fa-image")

         const imageLabel = document.createElement("label")
         imageLabel.setAttribute("for", "file")
         imageLabel.textContent = "+ Ajouter photo"

         const imageInput = document.createElement("input")
         imageInput.type = "file";
         imageInput.id = "file";
         imageInput.name = "image";

         const imagePreview = document.createElement("img")
         imagePreview.src = "#";
         imagePreview.alt = "Aperçu de l'image";
         imagePreview.style.display = "none"

         const imageInfo = document.createElement("p")
         imageInfo.textContent = "jpg, png : 4mo max"

         addImgDiv.appendChild(iconeImg)
         addImgDiv.appendChild(imageLabel)
         addImgDiv.appendChild(imageInput)
         addImgDiv.appendChild(imagePreview)
         addImgDiv.appendChild(imageInfo)

         const titleLabel = document.createElement("label")
         titleLabel.setAttribute("for", "title")
         titleLabel.textContent = "Titre"

         const titleInput = document.createElement("input")
         titleInput.type = "text"
         titleInput.name = "title"
         titleInput.id = "title"

         const categoryLabel = document.createElement("label")
         categoryLabel.setAttribute("for", "category")
         categoryLabel.textContent = "Catégorie"

         const categorySelect = document.createElement("select")
         categorySelect.name = "category"
         categorySelect.id = "category"

         form.appendChild(addImgDiv)
         form.appendChild(titleLabel)
         form.appendChild(titleInput)
         form.appendChild(categoryLabel)
         form.appendChild(categorySelect)

         modalForm.appendChild(form)

    // Prévisualisation de l'image ajouté
        imageLabel.addEventListener("click", async function (event){
            event.preventDefault()
            imageInput.click()
        })
        imageInput.addEventListener("change", async function(event) {
            event.preventDefault()
            const img = imageInput.files[0]
            console.log(img)
                if(img.size < 4000000){
              const reader = new FileReader()
            reader.onload = ()=> {
                const imgUrl = reader.result
                imagePreview.src = imgUrl
                imagePreview.style.display = "flex"
                iconeImg.style.display = "none"
                imageLabel.style.display = "none"
                imageInput.style.display = "none"
                imageInfo.style.display = "none"
                }
            reader.readAsDataURL(img)  
            } else {
                 alert("Taille de l'image supérieure à 4mo")
             }
            
        })

        // Affichage catégorie dans formulaire
        async function displayCategoryModal() {
            categorie.forEach(function(categorie) {
                const categoryOption = document.createElement("option")
                categoryOption.value = categorie.id
                categoryOption.textContent = categorie.name
                categorySelect.appendChild(categoryOption)
            })
        }
        displayCategoryModal()

        // Bouton input en vert lorsque tous les champs sont remplis
        async function formCompleted() {
            form.addEventListener("input", function (event){
            event.preventDefault()
            if (titleInput.value && categorySelect.value && imageInput.value)
            modalBtnAddImg.classList.add("green-btn")
            console.log("Tous les champs sont remplis")
            })
        }
        formCompleted()

        // Methode POST
         modalBtnAddImg.addEventListener("click", async function(event) {
             event.preventDefault()
             console.log(imageInput.files)
            //  const dataForm = {
            //     "title": titleInput.value,
            //     "image": imageInput.files[0],
            //     "category": categorySelect.value
            //  }
            const dataForm = new FormData()
            dataForm.append("title", titleInput.value)
            dataForm.append("category", categorySelect.value)
            dataForm.append("image", imageInput.files[0])
             const response = await fetch("http://localhost:5678/api/works", {
                   method: "POST",
                   headers: { "Authorization": "Bearer " + login},
                   body: dataForm
             })
             if(response.status == 201) {
                const newProjectApi = await fetch("http://localhost:5678/api/works")
                const newProject = await newProjectApi.json()
                ajouterGalerie(newProject)
                modalContainer.style.display = "none"

             }
         })
    })
})

// Fermeture modale
closeBtn.addEventListener("click", function(event){
    event.preventDefault()
    console.log("Modale fermé")
    modalContainer.style.display = "none"
    document.location.reload()
})

// Flèche gauche modale
arrowLeft.addEventListener("click", function (event){
    event.preventDefault()
    console.log("Retour à la modale initiale")
    modalForm.style.display = "none"
    galleryModal.style.display = "flex"

})

// Ajouter galerie dans modale
async function displayGalleryModal (projets) {
    modalWindowContain.innerHTML = ""
    for(let i = 0; i < projets.length; i++){
        const article = projets[i] 
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        image.src = article.imageUrl
        image.alt = article.title
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can")
        trash.id = image.id
        figure.appendChild(trash)
        figure.appendChild(image)
        galleryModal.appendChild(figure)

        // Méthode DELETE, supprimer image dans modale
        trash.addEventListener("click", function(event){
            event.preventDefault()
            console.log("tu as cliqué sur la corbeille")
            const imageId = trash.id
            const response = fetch("http://localhost:5678/api/works/1", {
                   method: "DELETE",
                   headers: { "Authorization": "Bearer " + login},
             })
             if(response.status == 200) {
                const deleteApi = await fetch("http://localhost:5678/api/works/1")
                const delete = await deleteApi.json()
                imageId.removeItem()
             }
        })
    }
}
displayGalleryModal(projets)
    
       