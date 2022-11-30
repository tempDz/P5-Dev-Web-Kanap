//récupération de la sélection pour rajouter dans le panier
//---------------LOCAL STORAGE--------------------------------
//déclaration de la variable avec comme valeur la mémoire de Local Storage
let registeredPurchaseLocalStorage = JSON.parse(localStorage.getItem("purchaseInMemory"));
let registeredPurchaseLocalStorageChart = registeredPurchaseLocalStorage[0]

const cart__items = document.getElementById("cart__items")//récupération de la balise html servant à l'insertion de l'achat

const purchaseInsertion = function () {
    let fragment = document.createDocumentFragment();//création d'un fragement de code HTML invisible
    let article = document.createElement("article")//création de la balise article
    article.setAttribute("class", "cart__item")
    article.setAttribute("data-id", `${registeredPurchaseLocalStorageChart[0]}`)
    article.setAttribute("data-color", `${registeredPurchaseLocalStorageChart[1]}`)
    // `<article class="cart__item" data-id="${registeredPurchaseLocalStorageChart[0]}" data-color="${registeredPurchaseLocalStorageChart[1]}">
    article.innerHTML = `
<div class="cart__item__img">
  <img src="${registeredPurchaseLocalStorageChart[2]}" alt="${registeredPurchaseLocalStorageChart[3]}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${registeredPurchaseLocalStorageChart[4]}</h2>
    <p>${registeredPurchaseLocalStorageChart[1]}</p>
    <p>${registeredPurchaseLocalStorageChart[6]} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${registeredPurchaseLocalStorageChart[5]}>
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
    // fragment.appendChild(a)
    cart__items.appendChild(article)
}

purchaseInsertion()