const ProductManager = require('./index');


const manager = new ProductManager();


manager.addProduct({ id: 1, title: "Mouse", description: "Mouse gamer", price: 3000 });
manager.addProduct({ id: 2, title: "Teclado", description: "Teclado mecánico", price: 7000 });


manager.addProduct({ id: 1, title: "Monitor", description: "Monitor 24 pulgadas", price: 15000 });


manager.addProduct({ id: 3, title: "Auriculares", price: 4000 }); // falta descripción


console.log("Todos los productos:", manager.getProducts());


console.log("Producto con ID 2:", manager.getProductById(2));


console.log("Producto con ID 99:", manager.getProductById(99));