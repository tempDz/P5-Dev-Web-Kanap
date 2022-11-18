async function listeProduit() {
    const catalogue = await fetch("http://localhost:3000/api/products")
    if (catalogue.ok === true) {
        console.log(catalogue.json())
    } else {
        new error('Impossible de contacter le serveur')
        console.log('erreur serveur')
    }
}