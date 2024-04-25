// Récupérer élements
const form = document.querySelector(".login form");
const errorMsg = document.querySelector(".login p");

// Connexion
form.addEventListener("submit", async function(event){
        event.preventDefault()

        const email = document.querySelector(".login #email");
        const password = document.querySelector(".login #password");
        console.log(email, password)

        const body = {
                "email": email.value,
                "password": password.value
        }

        const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
        });
        console.log(response)

        if (response.status === 200) {
                // Récupérer API users/login
                const user = await response.json(); 
                const token = user.token;
                
                // Stocker token dans le localStorage
                window.localStorage.setItem("token", token);
                
                // Redirection vers index.html
                window.location.href = "index.html";
                                
            } else {
                errorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe";
            }
});


