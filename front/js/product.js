//récupération de la chaine de requete de l'URL
const recupUrl = window.location.search;

//extraire l'ID
const idUrlSearchParams = new URLSearchParams(recupUrl)
const recupId = idUrlSearchParams.get("id")

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

//fonction qui nomme l'API et personnalise le lien
async function displayProduct() {
    const request = await fetchrequest(recupId);

    const item__img = document.querySelector(".item__img")
    const price = document.querySelector("#price")
    const description = document.querySelector("#description")
    const colors = document.querySelector("#colors")
    const img = document.createElement("img")

    item__img.insertAdjacentElement("afterbegin", img)
    img.setAttribute("src", request.imageUrl)
    img.setAttribute("alt", request.altTxt)
    price.innerText = request.price
    description.innerText = request.description

    for (let i = 0; i < request.colors.length; i++) {
        const option = document.createElement("option")
        colors.insertAdjacentElement("beforeend", option)
        option.setAttribute("value", request.colors[i])
        option.innerText = request.colors[i]
    }
}
displayProduct()