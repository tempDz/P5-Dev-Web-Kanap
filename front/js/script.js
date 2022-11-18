async function listeProduit() {
    const catalogue = await fetch("https://jsonplaceholder.typicode.com/users")
    if (catalogue.ok === true) {
        return catalogue.json();
    }
    throw new error('Impossible de contacter le serveur')

}


// fetch("http://localhost:3000/api/products")
//     .then(function (res) {
//         if (res.ok) {
//             return res.json();
//         }
//     })
//     .then(function (value) {
//         console.log(value);
//     })
//     .catch(function (err) {
//         // Une erreur est survenue
//     });