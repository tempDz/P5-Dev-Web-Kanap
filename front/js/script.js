//function standard qui appel l'API
async function fetchrequest(request) {
    const fetchtReply = await fetch(request)
    if (fetchtReply.ok) {
        return fetchtReply.json()
    } else {
        console.log(fetchtReply.error)
    }
}


//fonction qui nomme l'API et personnalise le lien
async function displayProduct() {
    const products = await fetchrequest("http://localhost:3000/api/products");

    const section = document.getElementById("items");
    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const a = document.createElement("a")//création de la balise a
        a.setAttribute("id", product._id)//rejout de l'attribut id avec comme valeur _id dans a
        a.setAttribute("href", "./product.html?id=" + product._id)//rajout de l'attribut href avec comme valeur l'URL dans a
        a.innerHTML = `<article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>`
        fragment.appendChild(a)
    });
    section.appendChild(fragment)
}

displayProduct()

