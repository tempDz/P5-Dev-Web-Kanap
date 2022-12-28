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
//déclaration variable globale pour futur donnée LS
let productApi = []

async function purchaseInsertion() {
  //création d'un fragement de code HTML invisible
  let fragment = document.createDocumentFragment();
  //boucle, pour chaque produit trouvé dans liste produits du LS
  for (product of selectedProducts) {
    //variable qui récupère les informations dans l'API grace à l'ID du produit dans le LS
    productApi = await fetchrequest(product.id);
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
    const article = deleteItemButton.closest("article");
    //nous écoutons le bouton
    deleteItemButton.addEventListener('click', function (event) {
      //on boucle sur l'ensemble des produits enregistrés dans le LS
      selectedProducts.forEach(product => {
        // quand le bouton supprimer correspond au produit dans le LS =>...
        if (product.id === article.getAttribute("data-id") &&
          product.color === article.getAttribute("data-color")) {
          //...=> nous le supprimons, mettons à jour le LS et on raffraichi
          let delProduct = selectedProducts.filter(item => item.id != product.id) && selectedProducts.filter(item => item.color != product.color)
          localStorage.setItem("purchaseInMemory", JSON.stringify(delProduct));
          article.remove();
          updateTotal();
        }
      })
    })
  })

  //************MODIFICATION QUANTITE************************************************
  //boucle sur l'ensemble des boutons quantité du code HTML
  document.querySelectorAll(".itemQuantity").forEach(itemQuantity => {
    itemQuantity.addEventListener('change', function (event) {
      //on boucle sur l'ensemble des produits enregistrés dans le LS
      selectedProducts.forEach(product => {
        // quand le bouton supprimer correspond au produit dans le LS =>...
        if (product.id === itemQuantity.closest(".cart__item").getAttribute("data-id") &&
          product.color === itemQuantity.closest(".cart__item").getAttribute("data-color")) {
          //...=> nous le supprimons, mettons à jour le LS et on raffraichi
          if (itemQuantity.value > 100 || itemQuantity.value < 1) {
            alert("Veuillez choisir une quantité entre 1 et 100");
          } else {
            itemQuantity.closest(".itemQuantity").setAttribute("value", itemQuantity.value)
            product.quantity = itemQuantity.value
            localStorage.setItem("purchaseInMemory", JSON.stringify(selectedProducts));
            updateTotal();
          }
        }
      })
    })
  })

  updateTotal();
}
purchaseInsertion()

function updateTotal() {
  //************ TOTAL CADDIT ************************************************
  let totalPriceProduct = 0
  let totalQteProduct = 0
  let totalPrice = document.querySelector("#totalPrice")
  let totalQte = document.querySelector("#totalQuantity")
  const allPrices = document.querySelectorAll(".cart__item__content__description :nth-child(3)");
  for (const price of allPrices) {
    baliseQte = price.closest("article").querySelector(".itemQuantity");
    totalQteProduct += parseInt(baliseQte.value);
    totalPriceProduct += parseInt(price.textContent) * parseInt(baliseQte.value);
  }
  totalPrice.textContent = totalPriceProduct;
  totalQte.textContent = totalQteProduct;
}

//***********************FORMULAIRE CONTACT********************************************
function ValidateEmail(inputText) {
  const mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (inputText.value.match(mailformat)) {
    return true;
  }
  else {
    alert("Vous avez saisi une adresse mail invalide !");    //The pop up alert for an invalid email address
    document.getElementById("email").focus();
    return false;
  }
}

let order = document.getElementById("order")
// let cartValidation = JSON.parse(localStorage.getItem("cartValidation"));

order.addEventListener("click", (event) => {
  event.preventDefault();
  let formulaire = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  }
  let test = false
  for (const [key, value] of Object.entries(formulaire)) {
    if (!value && test === false) {
      alert("Veuillez remplir tous les champs")
      document.getElementById(`${key}`).focus();
      test = true
    }
  }
  if (test === false) {
    ValidateEmail(email)
    localStorage.setItem("cartValidation", JSON.stringify(formulaire));
  }
})
//*******************************************BOUTON COMMANDER**********************************
let buttonOrder = document.getElementById("order")
