// Récupérer élements
const form = document.querySelector(".login form");
const errorMsg = document.querySelector(".login p");




form.addEventListener("submit", async function(event){
        event.preventDefault()
        const email = document.querySelector(".login #email");
        const password = document.querySelector(".login #password");
        const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ "email": email, "password": password })
        });
console.log(response)
})