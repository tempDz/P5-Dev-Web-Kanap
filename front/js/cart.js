//récupération de la sélection pour rajouter dans le panier
//---------------LOCAL STORAGE--------------------------------
//déclaration de la variable avec comme valeur la mémoire de Local Storage
let registeredPurchaseLocalStorage = JSON.parse(localStorage.getItem("purchaseInMemory"));
let registeredPurchaseLocalStorageChart = registeredPurchaseLocalStorage[0]
console.log(registeredPurchaseLocalStorageChart)
const cart__items = document.getElementById("cart__items")
cart__items.innerHTML =
    `<article class="cart__item" data-id="${registeredPurchaseLocalStorageChart[0]}" data-color="${registeredPurchaseLocalStorageChart[1]}">
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
</article>`