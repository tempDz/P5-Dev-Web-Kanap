
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



//function qui appel l'API - sans lien
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
    let product0 = document.querySelector(`#product0 article img`)
    product0.src = products[0].imageUrl
}
displayProduct()
