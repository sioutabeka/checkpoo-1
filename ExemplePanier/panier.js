// script.js

let shoppingCart = {
    items: [],  // Tableau qui contient les articles ajoutés au panier

    // Ajouter un article dans le panier
    addItem: function(name, price) {
        if (this.items.length < 3) {  // Limiter à 3 articles
            let existingItem = this.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;  // Si le produit est déjà dans le panier, augmenter la quantité
            } else {
                this.items.push({ name, price, quantity: 1 });  // Sinon, ajouter un nouveau produit
            }
            this.displayCart();  // Met à jour l'affichage du panier
        } else {
            alert("Vous pouvez ajouter seulement 3 articles dans le panier.");
        }
    },

    // Supprimer un article du panier
    removeItem: function(name) {
        const index = this.items.findIndex(item => item.name === name);
        if (index !== -1) {
            this.items.splice(index, 1);  // Supprimer l'article du panier
            this.displayCart();  // Met à jour l'affichage après suppression
        }
    },

    // Calculer le total du panier
    getTotal: function() {
        let total = 0;
        this.items.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);  // Retourner le total arrondi à 2 décimales
    },

    // Afficher le panier (les articles et le total)
    displayCart: function() {
        const cartItemsDiv = document.getElementById("cartItems");
        cartItemsDiv.innerHTML = '';  // Réinitialiser l'affichage des articles
        this.items.forEach(item => {
            cartItemsDiv.innerHTML += `<p>${item.quantity} x ${item.name} - ${item.price}€ <button onclick="shoppingCart.removeItem('${item.name}')">Supprimer</button></p>`;
        });

        const totalAmountDiv = document.getElementById("totalAmount");
        totalAmountDiv.innerHTML = `Total: ${this.getTotal()}€`;
    },

    // Vider le panier
    clearCart: function() {
        this.items = [];
        this.displayCart();  // Mettre à jour l'affichage après avoir vidé le panier
    }
};

// Fonction pour ajouter un produit au panier via le bouton
function addToCart(productName, productPrice) {
    shoppingCart.addItem(productName, productPrice);
}

// Fonction pour vider le panier
function clearCart() {
    shoppingCart.clearCart();
}
