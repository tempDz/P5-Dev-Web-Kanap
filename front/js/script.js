
//     /*
//     document.createELement() + innerHtml
//     document.createDocumentFragement()
//     .appendchild()

//     */
// }



// async function fetchProduct() {
//     const fetchProductReply = await fetch("http://localhost:3000/api/products")
//     if (fetchProductReply.ok) {
//         return fetchProductReply.json()
//     } else {
//         console.log(fetchProductReply.error)
//     }
// }

// async function displayProduct() {
//     const products = await fetchProduct();
//     console.log(products);
// }

// displayProduct()



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
    const request = await fetchrequest("http://localhost:3000/api/products");

    const img = document.querySelector("a article img")

    for (let i = 7; i >= 0; i--) {

        const items = document.querySelector(".items")
        const a = document.createElement("a")
        const article = document.createElement("article")
        const img = document.createElement("img")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")

        items.insertAdjacentElement("afterbegin", a)
        a.insertAdjacentElement("afterbegin", article)
        article.insertAdjacentElement("afterbegin", img)
        article.insertAdjacentElement("beforeend", h3)
        article.insertAdjacentElement("beforeend", p)

        a.setAttribute("id", request[i]._id)
        a.setAttribute("href", "./product.html?id=" + request[i]._id)
        img.setAttribute("src", request[i].imageUrl)
        img.setAttribute("alt", request[i].altTxt)
        h3.innerText = request[i].name
        p.innerText = request[i].description
    }
    console.log(Array(request).length);
    console.log(map[request])
}
displayProduct()

