// cart.js

// Vérifier si le panier est déjà sauvegardé dans localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fonction pour afficher les articles dans le panier
function displayCart() {
    let cartList = document.getElementById("cart-list");
    cartList.innerHTML = ''; // On vide le panier à chaque mise à jour

    // Si le panier est vide, afficher un message
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    // Afficher chaque article dans une liste
    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        
        div.innerHTML = `
            <p>${item.quantity} x ${item.name} - ${item.price}€</p>
            <button onclick="removeItem(${index})">Supprimer</button>
        `;
        cartList.appendChild(div);
    });
}

// Fonction pour ajouter un article au panier
function addToCart(name, price) {
    // Chercher si l'article existe déjà dans le panier
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;  // Augmenter la quantité si l'article existe
    } else {
        cart.push({ name, price, quantity: 1 }); // Ajouter un nouvel article au panier
    }
    
    // Sauvegarder le panier dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Mettre à jour l'affichage
    displayCart();
}

// Fonction pour supprimer un article du panier
function removeItem(index) {
    cart.splice(index, 1); // Retirer l'article du tableau
    localStorage.setItem("cart", JSON.stringify(cart)); // Mettre à jour le panier dans localStorage
    displayCart(); // Mettre à jour l'affichage
}

// Fonction pour vider le panier
function clearCart() {
    cart = []; // Vider le panier
    localStorage.setItem("cart", JSON.stringify(cart)); // Mettre à jour dans localStorage
    displayCart(); // Mettre à jour l'affichage
}

// Initialiser le panier à la première visite
window.onload = displayCart;
