"use strict";

import Product from "./Product";
import ProductTemplate from "./workshop.html";

class Workshop {

    constructor() {
        document.getElementById("title").innerText = "Workshop";

        this._products = [
            new Product("Plastikring", "Ein nicht-so glänzender Plastikring", 2, 10, null, 1000),
            new Product("Plastik Kette", "sehr leicht und bröselig", 3, 15, null, 5000),
            new Product("Plastik Ohrringe","sehr leicht zerbrechlich, aber dennoch schmückend", 5, 25,null, 10000),
            new Product("Plastik Handtasche","umweltfreundliche Handtasche", 10, 45,null, 30000),
            new Product("Plastik Jacke","sehr stylisch, sorgt für anziehende Blicke", 17, 65,null, 80000),
            new Product("Plastik Schuhe","sehr komfortabel", 20, 70,null, 75000),
            new Product("Plastik Raum","zum Versammeln mit Umweltaktivisten, so wie Greta Thunberg", 50, 180,null, 500000),
            new Product("Plastik Auto","sehr schnell, dafür das es nur aus Plastik ist", 100, 300,null, 800000),
            new Product("Plastik Flugzeug","sehr stabil für seine Verhältnisse", 150, 400,null, 1000000),
            new Product("Plastik Supermarkt","ein neuer Supermarkt zum Einkaufen", 300, 750,null, 3000000),
            new Product("Plastik Krankenhaus","zur Versorgung von kranken Umweltaktivisten", 1000, 4000,null, 10000000),
            new Product("Plastik Flughafen","damit die Umweltaktivisten um die Welt reisen können", 1500, 6000,null, 30000000)
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
            newProduct.getElementsByClassName("productionTime")[0].innerText = "Produktionszeit: " + (product._productionTime /1000) + "s";
            newProduct.id = product._name; //Set the id of the button
            document.getElementById("content").appendChild(newProduct);
            //You can only add the Event Listeners after the element has been added to the DOM!
            newProduct.getElementsByClassName("buyProductButton")[0].addEventListener("click", (mouseEvent) => {
                this.buyProduct(product);
            });
        }
    }

    buyProduct(product) {
        console.log("Trying to buy a " + product._name);
        document.getElementById(product._name).getElementsByClassName("buyProductButton")[0].setAttribute("disabled", "disabled");
        let waitTime = product._productionTime;
        let constructionInterval = setInterval(function () {
            let seconds = Math.floor((waitTime / 1000));
            let minutes = Math.floor((waitTime / (1000 * 60)));
            let hours = Math.floor((waitTime / (1000 * 60 * 60)));

            document.getElementById(product._name).getElementsByClassName("productionTimeLeft")[0].innerHTML =
                "Left: " + hours + "h " + minutes + "m " + seconds + "s ";

            if (waitTime <= 0) {
                clearInterval(constructionInterval);
                document.getElementById(product._name).getElementsByClassName("buyProductButton")[0].removeAttribute("disabled");
                document.getElementById(product._name).getElementsByClassName("productionTimeLeft")[0].innerHTML = "";
            }
            waitTime = waitTime - 1000;
        },1000);
    }
}

export default Workshop;