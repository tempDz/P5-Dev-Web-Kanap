
const recupUrl = window.location.search;//récupération de la chaine de requete de l'URL


const idUrlSearchParams = new URLSearchParams(recupUrl)//recuperer l'URL
const recupId = idUrlSearchParams.get("id")//extraire l'ID

//affichage du produit correspondant al'ID
//function standard qui appel l'API
async function fetchrequest(id) {
    const fetchtReply = await fetch("http://localhost:3000/api/products/" + id)
    if (fetchtReply.ok) {
        return fetchtReply.json()
    } else {
        console.log(fetchtReply.error)
    }
}
const colors = document.getElementById("colors")//déclaration hors fonction pour etre réutiliser après
//fonction qui nomme l'API et personnalise le lien
async function displayProduct() {
    const listId = await fetchrequest(recupId);
    //selection de la balise via son ID ou sa CLASS
    const kanapName = document.querySelector("#title")
    const item__img = document.querySelector(".item__img")
    const price = document.querySelector("#price")
    const description = document.querySelector("#description")
    const img = document.createElement("img")//création de la balise image

    kanapName.innerText = listId.name
    item__img.insertAdjacentElement("afterbegin", img)//insertion de la balise img
    img.setAttribute("src", listId.imageUrl)//dans la balise img, rajout de l'attribut src pour valeur url de l'image
    img.setAttribute("alt", listId.altTxt)//dans la balise img, rajout de l'attribut alt pour valeur alt dans API
    price.innerText = listId.price//rajout du prix pris de l'API dans la balise price
    description.innerText = listId.description//rajout de la descrition pris de l'API dans la balise description

    const fragment = document.createDocumentFragment();//création d'une balise invisible et temporaire pour inserer code de la boucle 
    for (let i = 0; i < listId.colors.length; i++) {//création d'une boucle qui récupere le nombre de couleurs présent  
        const option = document.createElement("option")//à chaque boucle : création de la balise option
        option.setAttribute("value", listId.colors[i])//insertion de l'attribut (couleur) dans la balise option
        option.innerText = listId.colors[i]//insertion du texte (couleur) dans la balise option
        fragment.appendChild(option)//incrémente de +1 les option dans la balise fragment
    };
    colors.appendChild(fragment)//l'intégralité de la balise temporaire et inserer dans le code html
    console.log(listId)
}

displayProduct()

//---------------récupération des informations du produit en préparation du panier--------------------------------
let selectedColors = ""
colors.addEventListener("change", function () {
    selectedColors = colors.value
})
const addCartButton = document.querySelector("#addToCart")
addCartButton.addEventListener("click", function () {
    console.log(selectedColors)
})
const choiceCart = {
    selectedColors
}

console.log(choiceCart)