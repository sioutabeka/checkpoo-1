// On s'entaine en POO : En faisant un panier 

// Créez une classe d'objet pour le produit afin de 
// stocker les propriétés pour l'id, le nom et le prix du produit.


class Product {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
    }
}

// Crée une classe pour l'élément du panier d'achat
class ShoppingCartItem {
    constructor(produit, quantite) {
        this.produit = produit;
        this.quantite = quantite;
    }

    // Méthode pour calculer le prix total de l'élément (produit * quantité)
    getTotalPrice() {
        return this.produit.prix * this.quantite;
    }
}

// Représente un panier d'achats contenant des éléments (ShoppingCartItem)
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Méthode pour calculer le total des éléments dans le panier
    getTotal() {
        let total = 0; // Initialisation du total à 0
        this.items.forEach(item => {
            total += item.getTotalPrice(); // Additionne le prix total de chaque item
        });
        return total;
    }

    // Méthode pour ajouter un produit dans le panier
    addItem(produit, quantite) {
        let item = this.items.find(i => i.produit.id === produit.id);

        if (item) {
            item.quantite += quantite; // Si le produit existe déjà, on augmente sa quantité
        } else {
            this.items.push(new ShoppingCartItem(produit, quantite)); // Sinon, on l'ajoute
        }
    }

    // Supprimer l'article
    removeItem(id) {
        this.items = this.items.filter(item => item.produit.id !== id); // Filtre le panier pour exclure l'élément
    }

    // Afficher les éléments du panier sur la page
    displayCart() {
        const cartList = document.getElementById("listePanier");
        const totalElement = document.getElementById("total");

        cartList.innerHTML = ""; // Réinitialise la liste pour éviter les doublons

        this.items.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = `${item.produit.nom} - ${item.quantite} x ${item.produit.prix}€ = ${item.getTotalPrice()}€`;

            // Créer le bouton "Supprimer" pour chaque item
            let removeButton = document.createElement("button");
            removeButton.textContent = "Supprimer";
            removeButton.classList.add("remove-item");

            // Ajouter un écouteur d'événement pour supprimer l'élément du panier
            removeButton.addEventListener('click', () => {
                this.removeItem(item.produit.id); // Supprime l'élément du panier
                this.displayCart(); // Met à jour l'affichage du panier
            });

            // Ajouter le bouton "Supprimer" dans le li
            li.appendChild(removeButton);

            // Ajouter l'élément li dans la liste du panier
            cartList.appendChild(li);
        });

        // Mettre à jour le total du panier
        totalElement.textContent = `Total = ${this.getTotal()}€`;
    }
}

// Création des produits (istance de classe Product)
const tShirtRouge = new Product(1, "T-shirt Rouge", 15);
const jeansBleu = new Product(2, "Jeans Bleu", 25);
const basketNoir = new Product(3, "Basket Noir", 45);
const sweatCapuche = new Product(4, "Sweat à Capuche", 35);
const montreCuir = new Product(5, "Montre en Cuir", 80);
const sacADos = new Product(6, "Sac à Dos", 50);
const chapeauPaille = new Product(7, "Chapeau de Paille", 20);

const listProduct = [tShirtRouge, jeansBleu, basketNoir, sweatCapuche, montreCuir, sacADos, chapeauPaille]
console.log(listProduct);

const htmlProduct = document.querySelector('.produits')


// Boucle complete pr cree la card produit (donc la div dans le container)
listProduct.forEach(prodintab => {
    const creatediv = document.createElement('div')
    creatediv.classList.add('produit')
    creatediv.setAttribute('data-id', prodintab.id)
    creatediv.innerHTML = `
        <p class="nom-produit">${prodintab.nom}</p>
        <p class="prix">${prodintab.prix}€</p>
        <button class="add-to-cart">Ajouter au panier</button>
    `
    htmlProduct.append(creatediv)
}) ; 

const panier = new ShoppingCart();

// créer une fonction qui ajouter le produit au panier
// lorsque l'user click sur 
// un bouton ajouter 

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(){
        const produitId = parseInt(this.parentElement.getAttribute('data-id'));
        let produit = listProduct[produitId-1]

        // 1. Créer un tableau avec tous tes produits
        // 2. Utilise filtre sur le tableau en cherchant par id


        // if(produit){
        //     panier.addItem(produit, 1);
        //     panier.displayCart();
        // }else{
        //     console.error('produit pas trouvé mon frere');
        // //         return // ici on recup l'id 
        // }

        //  Associer le prod à lobj Product 

        // switch (produitId){
        //     case 1:
        //     produit = tShirtRouge
        //     break;
        //     case 2:
        //     produit = jeansBleu
        //     break;
        //     case 3:
        //     produit = basketNoir
        //     break;
        //     case 4:
        //     produit = sweatCapuche
        //     break;
        //     case 5:
        //     produit = montreCuir
        //     break;
        //     case 6:
        //     produit = sacADos
        //     break;
        //     case 7:
        //     produit = chapeauPaille
        //     break;
        //     default: 
        //         console.error('produit pas trouvé mon frere');
        //         return // ici on recup l'id 
        // }

        panier.addItem(produit, 1); // Ajoute le produit en 1 

        panier.displayCart(); // Show le panier 

    })
});


document.getElementById("clearCart").addEventListener('click', function(){
    panier.items = [];
    panier.displayCart();
})