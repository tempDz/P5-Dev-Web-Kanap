//récupération de la sélection pour rajouter dans le panier
//---------------LOCAL STORAGE--------------------------------


//déclaration de la variable avec comme valeur la mémoire de Local Storage
const registeredPurchaseLocalStorage = JSON.parse(localStorage.getItem("purchaseInMemory"));

//récupération de la balise html servant à l'insertion de l'achat
const cart__items = document.getElementById("cart__items")

const purchaseInsertion = function () {
  //création d'un fragement de code HTML invisible
  let fragment = document.createDocumentFragment();
  //boucle, pour chaque option d'achat trouvé dans le Local Storage
  registeredPurchaseLocalStorage.forEach(purchase => {
    let article = document.createElement("article")//création de la balise article
    article.setAttribute("class", "cart__item")
    article.setAttribute("data-id", `${purchase.idCart}`)
    article.setAttribute("data-color", `${purchase.colorCart}`)
    //alimentation de la balise article par du texte HTML + variable
    article.innerHTML =
      `<div class="cart__item__img">
      <img src="${purchase.imgSrcCart}" alt="${purchase.imgAltCart}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${purchase.kanapNameCart}</h2>
        <p>${purchase.descriptionCart}</p>
        <p>${purchase.totalPriceCart} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${purchase.quantityCart}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
    fragment.appendChild(article)
  })
  cart__items.appendChild(fragment)
}

purchaseInsertion(purchase.idCart)