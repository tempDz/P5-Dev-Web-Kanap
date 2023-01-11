const recupUrl = window.location.search;//récupération de la chaine de requete de l'URL
const idUrlSearchParams = new URLSearchParams(recupUrl);//recuperer l'URL
const recupId = idUrlSearchParams.get("id");//extraire l'ID
console.log(recupId)

document.getElementById("orderId").textContent = recupId