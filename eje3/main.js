const ProductManager = require('./productmanager');

const manager = new ProductManager('products.json');


manager.addProduct({ id: 1, title: "Mouse", description: "Mouse gamer", price: 3000 });
manager.addProduct({ id: 2, title: "Teclado", description: "Teclado mecánico", price: 7000 });


console.log("Productos actuales:", manager.getProducts());


console.log("Buscar ID 2:", manager.getProductById(2));
console.log("Buscar ID 99:", manager.getProductById(99));