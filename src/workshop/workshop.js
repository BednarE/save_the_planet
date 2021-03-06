"use strict";

import Swal from 'sweetalert2';

class Workshop {

    constructor(game) {
        document.getElementById("title").innerText = "Werkstatt";
        this._game = game;
    }

    async showProducts() {

        let ProductTemplate = await import("./productTemplate.html");
        let WorkshopTemplate = await import("./workshopTemplate.html");
        //Create the main workshop div
        let workshopTemplate = document.createElement("div");
        workshopTemplate.innerHTML = WorkshopTemplate.trim();
        //Add the workshop div to the content div
        document.getElementById("content").appendChild(workshopTemplate);
        //Go trough all products stored in the game & create the product-cards
        for (let product of this._game.getProducts()) {
            let newProduct = document.createElement("div");
            newProduct.innerHTML = ProductTemplate.trim();
            //Set the text inside the product card
            newProduct.getElementsByClassName("productImage")[0].src=product._picture;
            newProduct.getElementsByClassName("productName")[0].innerText = product._name;
            newProduct.getElementsByClassName("description")[0].innerText = product._description;
            newProduct.getElementsByClassName("plasticcost")[0].innerText = "Kostet: " + product._plasticCost + " Plastik";
            newProduct.getElementsByClassName("productMoneyValue")[0].innerText = "Wert: " + product._moneyValue + "€";
            newProduct.getElementsByClassName("productionTime")[0].innerText = "Produktionszeit: " + (product._productionTime / 1000) + "s";
            newProduct.id = product._name; //Set the id of the button
            document.getElementById("productSection").appendChild(newProduct);
            //You can only add the Event Listeners after the element has been added to the DOM!
            document.getElementById("plasticDisplay").innerHTML=Math.round(this._game.getPlastic());
            document.getElementById("moneyDisplayed").innerHTML=this._game.getMoney()+" €";
            newProduct.getElementsByClassName("amountProducts")[0].value = product._productAmount;
            newProduct.getElementsByClassName("amountProducts")[0].disabled = product._currentlyUnderConstruction; // If still under construction, disable input
            newProduct.getElementsByClassName("amountProducts")[0].addEventListener("input", () => {
                let productAmount;
                if(newProduct.getElementsByClassName("amountProducts")[0].value!="") {
                    productAmount = parseInt(newProduct.getElementsByClassName("amountProducts")[0].value);
                } else {
                    productAmount=1;
                }
                newProduct.getElementsByClassName("addedValue")[0].innerText = (product._moneyValue * productAmount);
                newProduct.getElementsByClassName("addedCosts")[0].innerText = (product._plasticCost * productAmount);
            });
            newProduct.getElementsByClassName("addedValue")[0].innerText = product._moneyValue; // Default
            newProduct.getElementsByClassName("addedCosts")[0].innerText = product._plasticCost; // Default
            newProduct.getElementsByClassName("buyProductButton")[0].addEventListener("click", (mouseEvent) => {
                let productAmount;
                if(newProduct.getElementsByClassName("amountProducts")[0].value!="") {
                    productAmount = parseInt(newProduct.getElementsByClassName("amountProducts")[0].value);
                    product._productAmount = productAmount;
                }else{
                    productAmount=1;
                    product._productAmount = 1;
                }
                this.buyingProduct(product);
                document.getElementById("plasticDisplay").innerHTML=Math.round(this._game.getPlastic());
                document.getElementById("moneyDisplayed").innerHTML=this._game.getMoney()+" €";
            });

            //Check if the product is currently under construction
            if (product.isCurrentlyUnderConstruction()) {
                //If yes, hide the button & show remaining time
                newProduct.getElementsByClassName("buyProductButton")[0].classList.add("hidden");
                newProduct.getElementsByClassName("productionTimeLeft")[0].innerHTML =
                    "Wird hergestellt, übrige Zeit: " + product.getLeftConstructionHours() + "h " + product.getLeftConstructionMinutes() + "m " + product.getLeftConstructionSeconds() + "s ";
            } else {
                //If it is not under construction, hide the progress bar
                newProduct.getElementsByClassName("productProgressBar")[0].classList.add("hidden");
            }
        }
    }

    /**
     * Starts the construction of the given product if it is not yet under construction
     * @param product - the product to be constructed
     */
    constructProduct(product, game) {
        //Get the product html
        let waitTime;
        let productHtml = document.getElementById(product._name);
        if(product.getLeftCalculatedOfflineMilliseconds()>0){

            waitTime=product.getLeftCalculatedOfflineMilliseconds(); // dient zur nachträglichen Produktion für die Offline Zeit
        }else {
            waitTime = product._productionTime;
        }
        //Check if it is already unter construction
        if (!product.isCurrentlyUnderConstruction()) {
            if (productHtml !== null) {
                //Hide the button
                productHtml.getElementsByClassName("buyProductButton")[0].classList.add("hidden");
                //Disable the amount input
                productHtml.getElementsByClassName("amountProducts")[0].disabled = true;
                //Show the progress bar
                productHtml.getElementsByClassName("productProgressBar")[0].classList.remove("hidden");
                //Hide the cost & money hints
                productHtml.getElementsByClassName("costAndMoneyHint")[0].classList.add("hidden");
            }
            product.setCurrentlyUnderConstruction(true);
            //Add the interval to the window object, so it will continue to run even if the Workshop class has been unloaded.
            //We need to add it with a different name for each product, so different products wil not overwrite each other
            var workshop=this;
            window["constructionInterval_" + product._name] = setInterval(function () {
                let seconds = Math.floor((waitTime / 1000));
                let minutes = Math.floor((waitTime / (1000 * 60)));
                let hours = Math.floor((waitTime / (1000 * 60 * 60)));
                seconds = seconds - (minutes * 60);
                minutes = minutes - (hours * 60);
                //Store the productionTime inside the product, so we can display it right away once the subpage has been switched to another page
                //and back
                product.setLeftConstructionTime(hours, minutes, seconds);
                let productHtml = document.getElementById(product._name);
                //Check if the productHtml is not null, so no nullpointers wil be thrown if the page has been switched and the div unloaded
                if (productHtml != null) {
                    productHtml.getElementsByClassName("productionTimeLeft")[0].innerHTML =
                        "Wird hergestellt, übrige Zeit: " + hours + "h " + minutes + "m " + seconds + "s ";
                    let percent = Math.round((1 - (waitTime / product._productionTime)) * 100);
                    productHtml.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", "" + percent);
                    productHtml.getElementsByClassName("progress-bar")[0].style = "width: " + percent + "%;";
                    productHtml.getElementsByClassName("progress-bar")[0].innerHTML = percent + "%";
                }

                //Construction has been finished
                if (waitTime <= 0) {
                    clearInterval(window["constructionInterval_" + product._name]);
                    product.setCurrentlyUnderConstruction(false);
                    product.setLeftConstructionTime(0, 0, 0);
                    game.setMoney(game.getMoney() + product._moneyValue);
                    game._statisticStorage.moneyGenerated = game._statisticStorage.moneyGenerated + product._moneyValue;
                    if (document.getElementById("moneyDisplayed") !== null) {
                        document.getElementById("moneyDisplayed").innerHTML=game.getMoney()+" €";
                    }
                    product._productAmount--;
                    if (productHtml != null) {
                        document.getElementById(product._name).getElementsByClassName("buyProductButton")[0].classList.remove("hidden");
                        document.getElementById(product._name).getElementsByClassName("productionTimeLeft")[0].innerHTML = "";
                        productHtml.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", "0");
                        productHtml.getElementsByClassName("progress-bar")[0].style = "width: 0%;";
                        productHtml.getElementsByClassName("progress-bar")[0].innerHTML = "0%";
                        productHtml.getElementsByClassName("productProgressBar")[0].classList.add("hidden");
                        productHtml.getElementsByClassName("amountProducts")[0].value = product._productAmount;
                    }
                    if(product._productAmount>0){
                        workshop.constructProduct(product, game);
                    } else {
                        product._productAmount = 1; //Set back to default
                        //Finished job
                        if (productHtml != null) {
                            productHtml.getElementsByClassName("amountProducts")[0].disabled = false;
                            productHtml.getElementsByClassName("amountProducts")[0].value = product._productAmount;
                            productHtml.getElementsByClassName("addedValue")[0].innerText = (product._moneyValue * product._productAmount);
                            productHtml.getElementsByClassName("addedCosts")[0].innerText = (product._plasticCost * product._productAmount);
                            productHtml.getElementsByClassName("costAndMoneyHint")[0].classList.remove("hidden");
                        }
                    }
                }
                 waitTime = waitTime - 100;
            }, 100);
        } else {
            //We should never reach this point as the button should be hidden if it is under construction
            console.error("The product is still under construction!", product);
        }
    }

    buyingProduct(product) {
        //Check if enough plastic to buy a product then reduce the plastic
        if(product._productAmount>0) {
            if (this._game.getPlastic() >= (product._plasticCost*product._productAmount)) {
                this._game._statisticStorage.plasticSold = this._game._statisticStorage.plasticSold + (product._plasticCost*product._productAmount);
                this._game.setPlastic(this._game.getPlastic() - (product._plasticCost*product._productAmount));
                // now it can be constructed
                this.constructProduct(product, this._game);
                // after construction you get the money

            } else {  //needs to be imported to make it work, when the buttons are disabled this will be unnecessary
                Swal.fire("Nicht genügend Plastik", "Produkt kann nicht gekauft werden sammle " + Math.round(product._plasticCost*product._productAmount - this._game.getPlastic()) + " mehr Plastik um das zu konstruieren.", "error");
            }
        }
    }

    plasticEnoughForBuying() { // for disabling buttons while checking every second if the button needs to be disabled
        setInterval(function () {
            for (let products of this._products) {
                if (this._game.buttonDisableForPlastic(products._plasticCost)) {
                    document.getElementById(products._name).getElementsByClassName("buyProductButton")[0].setAttribute("disabled", "disabled");
                } else{
                    document.getElementById(products._name).getElementsByClassName("buyProductButton")[0].removeAttribute("disabled");
                }
            }
        }, 1000);
    }
}


export default Workshop;