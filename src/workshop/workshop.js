"use strict";

import Product from "./Product";
import ProductTemplate from "./workshop.html";

class Workshop {

    constructor() {
        document.getElementById("title").innerText = "Workshop";

        this._products = [
            new Product("Plastikring", "Ein nicht-so glänzender Plastikring", 2, 10, null),
            new Product("Plastik Kette", "sehr leicht und bröselig", 3, 15, null)
        ];

        this.showProducts();
    }

    showProducts() {
        for (let product of this._products) {
            let newProduct = document.createElement("div");
            newProduct.innerHTML = ProductTemplate.trim();

            newProduct.getElementsByClassName("productName")[0].innerText = product._name;
            newProduct.getElementsByClassName("description")[0].innerText = product._description;
            newProduct.getElementsByClassName("plasticcost")[0].innerText = "Kostet: " + product._plasticCost + " Plastik";
            newProduct.getElementsByClassName("productMoneyValue")[0].innerText = "Wert: " + product._moneyValue + "€";
            newProduct.getElementsByClassName("buyProductButton")[0].id = product._name; //Set the id of the button
            document.getElementById("content").appendChild(newProduct);
            //You can only add the Event Listeners after the element has been added to the DOM!
            newProduct.getElementsByClassName("buyProductButton")[0].addEventListener("click", (product) => {
                this.buyProduct(product);
            });
        }
    }

    buyProduct(event) {
        console.log("You have bought a " + event.target.id);
    }

}

export default Workshop;