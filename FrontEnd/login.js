// Récupérer élements
const form = document.querySelector(".login form");
const errorMsg = document.querySelector(".login p");
const email = document.querySelector(".login #email").value;
const password = document.querySelector(".login #password").value;

const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
});