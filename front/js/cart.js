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
let selectedProducts = JSON.parse(localStorage.getItem("purchaseInMemory"));
//récupération de la balise html servant à l'insertion de l'achat
let cart__items = document.getElementById("cart__items");
//déclaration variable globale pour futur donnée LS
let productApi = [];

async function purchaseInsertion() {
    //création d'un fragement de code HTML invisible
    let fragment = document.createDocumentFragment();
    //boucle, pour chaque produit trouvé dans liste produits du LS
    for (const product of selectedProducts) {
        /*variable qui récupère les informations dans l'API
        grace à l'ID du produit dans le LS*/
        productApi = await fetchrequest(product.id);
        //création de la balise article et ses attributs
        //product = info dans LS - productApi = info dans API
        let article = document.createElement("article")
        article.className = "cart__item";
        article.dataset.id = product.id;
        article.dataset.color = product.color;
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
            <input type="number" class="itemQuantity"
            name="itemQuantity" min="1" max="100" value=${product.quantity}>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`;
        //alimentation du fragement par l'ensemble des articles créés
        fragment.appendChild(article)
    };
    //une fois que l'ensemble des articles sont dans le fragement
    //on insere le fragement dans le code HTML
    cart__items.appendChild(fragment)

    //************SUPPRESSION PRODUIT***********
    //boucle sur l'ensemble des boutons supprimer du code HTML
    document.querySelectorAll(".deleteItem").forEach(deleteItemButton => {
        const article = deleteItemButton.closest("article");
        //nous écoutons le bouton
        deleteItemButton.addEventListener("click", function () {
            //on boucle sur l'ensemble des produits enregistrés dans le LS
            selectedProducts.forEach(product => {
                // quand le bouton supprimer correspond au produit dans le LS =>...
                if (product.id === article.getAttribute("data-id") &&
                    product.color === article.getAttribute("data-color")) {
                    //...=> nous le supprimons, mettons à jour le LS et on raffraichi
                    const dialogRemove = confirm(`Souhaitez-vous vraiment supprimer ce produit ?`);
                    if (dialogRemove) {
                        selectedProducts = selectedProducts.filter(item => item.id
                            != product.id)
                            && selectedProducts.filter(item => item.color != product.color)
                        localStorage.setItem("purchaseInMemory", JSON.stringify(selectedProducts));
                        article.remove();
                        updateTotal();
                    }
                }
            })
        }
        )
    })

    //************MODIFICATION QUANTITE*******
    //boucle sur l'ensemble des boutons quantité du code HTML
    document.querySelectorAll(".itemQuantity").forEach(itemQuantity => {
        itemQuantity.addEventListener("change", function (event) {
            //on boucle sur l'ensemble des produits enregistrés dans le LS
            selectedProducts.forEach(product => {
                // quand le bouton supprimer correspond au produit dans le LS =>...
                if (product.id === itemQuantity.closest(".cart__item").getAttribute("data-id")
                    && product.color === itemQuantity.closest(".cart__item").getAttribute("data-color")) {
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
/*Cette fonction permet d'actualiser la quantité de produit
et le produit total, elle appeler lors de l'ouverture de la page
et lors d'une modification de quantité et suppression de produit*/
function updateTotal() {
    //************ TOTAL CADDIT ************************************************
    //déclaration des variables quantité et prix
    let totalPriceProduct = 0
    let totalQteProduct = 0
    //sélection des balises dans le HTML
    let totalPrice = document.querySelector("#totalPrice")
    let totalQte = document.querySelector("#totalQuantity")
    //nous selectionnons l'ensemble des 3eme enfant de la class .cart__item__content__description
    const allPrices = document.querySelectorAll(".cart__item__content__description :nth-child(3)");
    //nous bouclons afin d'avoir a tour de rôle les prix
    for (const price of allPrices) {
        // pour chaque prix nous récupérons la quantité qui lui est associé
        let baliseQte = price.closest("article").querySelector(".itemQuantity");
        // nous incrémentons la quantité
        totalQteProduct += parseInt(baliseQte.value);
        // multiplication de la quantité X le prix
        totalPriceProduct += parseInt(price.textContent) * parseInt(baliseQte.value);
    }
    //nous modifions le HTML avec les nouvelles valeurs
    totalPrice.textContent = totalPriceProduct;
    totalQte.textContent = totalQteProduct;
}

/*cette fonction permet de verifier si la caddie est vide
pour cela nous observons l'élement ID totalQuantity du HTML*/
function cartEmpty() {
    const newValue = document.getElementById('totalQuantity').textContent;
    if (newValue == 0 || newValue == "") {
        const dialog = confirm(`Le panier est vide. Vous allez maintenant être redirigé vers la liste des produits.`);
        if (!dialog) {
        } else {
            window.location.href = "http://127.0.0.1:5500/front/html/index.html";
        }
    }
}

//***********************FORMULAIRE CONTACT********************************************
//récupération des info du formulaire dans un objet
let formulaire = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
}

/*fonction qui détecte si un chiffre est présent dans
les formulaires nom, prénom ville*/
function containsNumbers(str, balise) {
    if (/^[a-zA-Z]{2,}$/.test(str)) {
        return document.querySelector(`#${balise}ErrorMsg`).textContent = ""
    } else {
        return document.querySelector(`#${balise}ErrorMsg`).textContent = "Ne peut contenir que des lettres et doit contenir au moins 2 caractères."
    }
}
/*boucle sur les formulaires et controle uniquement
les saisies nom, prénom et ville*/
for (const property in formulaire) {
    if (property === "firstName" ||
        property === "lastName" ||
        property === "city") {
        document.querySelector(`#${property}`).addEventListener("input", function () {
            containsNumbers(document.getElementById(property).value, property)
        })
    }
}

//fonction trouvée sur web afin de controler conformité email
function ValidateEmail(inputText) {
    const mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (inputText.match(mailformat)) {
        testMail = true
        return document.querySelector("#emailErrorMsg").textContent = ""
    }
    else {
        testMail = false
        return document.querySelector("#emailErrorMsg").textContent = "Adresse mail non conforme"
    }
}
//on test la conformité du mail en temps réél
document.querySelector("#email").addEventListener("input", function () {
    ValidateEmail(document.getElementById("email").value)
})

/*fonction qui détecte si le texte informant d'une mauvaise saisie
dans le formulaire est présent, pour cela nous observons le HTML
et les balises contenant le nom du formulaire avec ErrorMsg*/
let products = [];
function errorMsg() {
    let isError = false;
    for (const property in formulaire) {
        if (document.querySelector(`#${property}ErrorMsg`).innerText !== "" ||
            document.querySelector(`#${property}`).value === "") {
            isError = true;
        }
    }
    if (isError) {
        return alert("Veuillez vérifier la saisie de votre formulaire avant de le soumettre.\nAssurez-vous que tous les champs obligatoires ont été remplis et que les informations saisies sont correctes.");
    }
    else {
        selectedProducts.forEach(product => {
        })
    }
}

//*******************************************BOUTON COMMANDER**********************************
let submitButton = document.getElementById("order")
// function qui appel l'API et la méthode POST
async function orderBasket(form) {
    const fetchtReply = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
    })
    if (fetchtReply.ok) {
        return fetchtReply.json()
    } else {
        console.log(fetchtReply.error)
    }
}

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    cartEmpty();

    errorMsg();

    const sendCommand = {
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        },
        products: products
    }
    const order = await orderBasket(sendCommand);
    localStorage.setItem("order", JSON.stringify(order));
    document.location.href = 'confirmation.html?id=' + order.orderId;
    localStorage.clear();
}
)