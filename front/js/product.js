
const recupUrl = window.location.search;//récupération de la chaine de requete de l'URL


const idUrlSearchParams = new URLSearchParams(recupUrl);//recuperer l'URL
const recupId = idUrlSearchParams.get("id");//extraire l'ID

//affichage du produit correspondant al'ID
//function standard qui appel l'API
async function fetchrequest(id) {
    const fetchtReply = await fetch("http://localhost:3000/api/products/" + id);
    if (fetchtReply.ok) {
        return fetchtReply.json();
    } else {
        console.log(fetchtReply.error);
    }
}

//déclaration hors fonction pour etre réutiliser après
const colors = document.getElementById("colors");
const kanapName = document.querySelector("#title");
const price = document.querySelector("#price");
const item__img = document.querySelector(".item__img");
const img = document.createElement("img");//création de la balise image
//fonction qui nomme l'API et personnalise le lien
async function displayProduct() {
    const listId = await fetchrequest(recupId);
    //selection de la balise via son ID ou sa CLASS    
    const description = document.querySelector("#description");
    kanapName.innerText = listId.name;
    item__img.insertAdjacentElement("afterbegin", img);//insertion de la balise img
    img.setAttribute("src", listId.imageUrl);//dans la balise img, rajout de l'attribut src pour valeur url de l'image
    img.setAttribute("alt", listId.altTxt);//dans la balise img, rajout de l'attribut alt pour valeur alt dans API
    price.innerText = listId.price;//rajout du prix pris de l'API dans la balise price
    description.innerText = listId.description;//rajout de la descrition pris de l'API dans la balise description

    const fragment = document.createDocumentFragment();//création d'une balise invisible et temporaire pour inserer code de la boucle 
    for (let i = 0; i < listId.colors.length; i++) {//création d'une boucle qui récupere le nombre de couleurs présent  
        const option = document.createElement("option");//à chaque boucle : création de la balise option
        option.setAttribute("value", listId.colors[i]);//insertion de l'attribut (couleur) dans la balise option
        option.innerText = listId.colors[i];//insertion du texte (couleur) dans la balise option
        fragment.appendChild(option);//incrémente de +1 les option dans la balise fragment
    }
    colors.appendChild(fragment);//l'intégralité de la balise temporaire et inserer dans le code html
}

displayProduct();

//---------------récupération des informations du produit en préparation du panier--------------------------------
let selectedColors = "";
colors.addEventListener("change", function () {
    selectedColors = colors.value;
});

const quantity = document.querySelector(".item__content__settings__quantity input");
let selectedQuantity = 0;
quantity.addEventListener("change", function () {
    selectedQuantity = quantity.value;
});

//déclaration de la varible Array purchaseOption qui contiendra les options d'achat
let purchaseOption = {};
//nous sélectionnons le bouton Ajouter panier afin de l'écouter
const addCartButton = document.querySelector("#addToCart");
//---------------LOCAL STORAGE--------------------------------
//déclaration de la variable avec comme valeur la mémoire de Local Storage
let registeredPurchaseLocalStorage = JSON.parse(localStorage.getItem("purchaseInMemory"));

//au clic du bouton Ajouter panier nous enregistrons les selections
addCartButton.addEventListener("click", function () {
    if (selectedQuantity < 1) {//si la quantité est inférieur à 1 Alerte
        alert("Veuillez choisir une quantité surpérieur à 0");
    } else {
        purchaseOption = [
            recupId,
            selectedColors,
            img.getAttribute("src"),
            img.getAttribute("alt"),
            kanapName.innerText,
            selectedQuantity,
            price.innerText * selectedQuantity];
        //on vide le Local Storage
        registeredPurchaseLocalStorage = [];
        //On rajoute une option d'achat dans le Local Storage
        registeredPurchaseLocalStorage.push(purchaseOption);
        //on transforme en JSON pour qu'il soit compris par le navigateur
        localStorage.setItem("purchaseInMemory", JSON.stringify(registeredPurchaseLocalStorage));
    }
})