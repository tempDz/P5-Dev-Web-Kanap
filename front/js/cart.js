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

//récupération de la sélection pour rajouter dans le panier
//---------------LOCAL STORAGE = LS--------------------------------
//déclaration de la variable avec comme valeur la mémoire de LS
const selectedProducts = JSON.parse(localStorage.getItem("purchaseInMemory"));
//récupération de la balise html servant à l'insertion de l'achat
const cart__items = document.getElementById("cart__items")
async function purchaseInsertion() {
  //création d'un fragement de code HTML invisible
  let fragment = document.createDocumentFragment();
  //boucle, pour chaque produit trouvé dans liste produits du LS
  for (product of selectedProducts) {
    //variable qui récupère les informations dans l'API grace à l'ID du produit dans le LS
    const productApi = await fetchrequest(product.id);
    //création de la balise article et ses attributs
    //product = info dans LS - productApi = info dans API
    let article = document.createElement("article")
    article.setAttribute("class", "cart__item")
    article.dataset.id = product.id;
    article.setAttribute("data-id", `${product.id}`)
    article.setAttribute("data-color", `${product.color}`)
    //alimentation de la balise article par du texte HTML + variable
    article.innerHTML =
      `<div class="cart__item__img">
      <img src="${productApi.imageUrl}" alt="${productApi.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productApi.name}</h2>
        <p>${product.color}</p>
        <p>${productApi.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
    //alimentation du fragement par l'ensemble des articles créés
    fragment.appendChild(article)
  }
  //une fois que l'ensemble des articles sont dans le fragement
  //on insere le fragement dans le code HTML
  cart__items.appendChild(fragment)
  //************SUPPRESSION PRODUIT************************************************
  //boucle sur l'ensemble des boutons supprimer du code HTML
  document.querySelectorAll(".deleteItem").forEach(deleteItemButton => {
    //nous écoutons le bouton
    deleteItemButton.addEventListener('click', function (event) {
      //on boucle sur l'ensemble des produits enregistrés dans le LS
      selectedProducts.forEach(product => {
        // quand le bouton supprimer correspond au produit dans le LS =>...
        if (product.id === deleteItemButton.closest(".cart__item").getAttribute("data-id") &&
          product.color === deleteItemButton.closest(".cart__item").getAttribute("data-color")) {
          //...=> nous le supprimons, mettons à jour le LS et on raffraichi
          let delProduct = selectedProducts.filter(item => item.id != product.id && item.color != product.color)
          localStorage.setItem("purchaseInMemory", JSON.stringify(delProduct));
          window.location.reload();
        }
      })
    })
  })
  //************MODIFICATION QUANTITE************************************************

}
purchaseInsertion()
//-----------------------------BOUTTON MODIFIER QUANTITE----------------------------------------
// let modifQuantity = document.querySelectorAll(".itemQuantity")
// for (let i = 0; i < modifQuantity.length; i++) {
//   modifQuantity[i].addEventListener("change", (modify) => {
//     console.log(selectedProducts[i].quantity)
//   })
// }
//-----------------------------BOUTTON SUPPRIMER----------------------------------------



