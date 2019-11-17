"use strict";

import Product from "./workshop/Product";
import StatisticUtils from "./statistic/statisticutils";
import Collector from "./clicker/collector";
import Workshop from "./workshop/workshop";
import Swal from "sweetalert2";

const HOURINMILLIS = 3600000; //1 hour in millis

class Game {

    constructor(data) {
        if (data !== undefined && data !== null) {

            this._autoSaveInterval = data._autoSaveInterval;
            this._lastSaved = data._lastSaved;
            this._appStart = data._appStart;
            this._appStartUTCFormat = data._appStartUTCFormat;
            this._appStartMiliseconds = data._appStartMiliseconds;
            this._statisticStorage = data._statisticStorage;
            this._plastic = data._plastic;
            this._plasticPerClick = data._plasticPerClick;
            this._plasticPerSecond = data._plasticPerSecond;
            this._money = data._money;
            this._clicked = data._clicked;
            //Products
            this.geldGained=0;
            this._products = [];
            for (let productData of data._products) {
                let product = new Product(productData._name, productData._description, productData._moneyValue, productData._plasticCost, getProductPictureForName(productData._name), productData._productionTime, productData._currentlyUnderConstruction, productData._leftConstructionHours, productData._leftConstructionMinutes, productData._leftConstructionSeconds, productData._productAmount);
                this._products.push(product);
                if (product.isCurrentlyUnderConstruction()) {
                    product.setCurrentlyUnderConstruction(false); //Because of check in constructProduct

                    let offlineMilliseconds = (new Date().getTime() - this._lastSaved);
                        console.log(offlineMilliseconds);
                    let producedOffline=Math.floor(offlineMilliseconds/product._productionTime);
                        console.log(producedOffline);


                    if (producedOffline<product._productAmount) {
                        offlineMilliseconds = offlineMilliseconds - (producedOffline * product._productionTime);
                        console.log(offlineMilliseconds);


                        /**
                         * Die übrige Produktionszeit des Produkts das noch hergestellt wird = die Produktionszeit des Produktes - die Offline
                         * Zeit - die Produktionszeit des Produktes * wie viele man während der Offline Zeit hergestellt hat.
                         */
                        product.setLeftCalculatedOfflineMilliseconds(product._productionTime-(new Date().getTime() - this._lastSaved)-(product._productionTime*producedOffline));


                        this.setMoney(this.getMoney()+producedOffline*product._moneyValue);
                        product._productAmount=product._productAmount-producedOffline;
                        new Workshop().constructProduct(product, this);
                        this.geldGained=this.geldGained+producedOffline*product._moneyValue;
                    }else{
                        console.log(this.getMoney());
                        console.log(product._moneyValue);
                        console.log(product._productAmount);

                        this.setMoney(this.getMoney()+product._moneyValue*product._productAmount);
                        this.geldGained=this.geldGained+product._moneyValue*product._productAmount;
                    }

                }
            }


            //Collectors
            this.collectors = [];
            for (let collectorData of data.collectors) {
                this.collectors.push(
                    new Collector(collectorData.name, getCollectorPictureForId(collectorData.id), collectorData.requiredMoney, collectorData.id, collectorData.plasticPerSecond, collectorData.index, collectorData.count, collectorData.unlocked, collectorData.firstUnlocked)
                )
            }
            this.offlineProduction();


        } else {
            this._autoSaveInterval = 60000;
            this._lastSaved = null;
            this._appStart = new Date().toISOString();
            this._appStartUTCFormat = new Date().toLocaleString();
            this._appStartMiliseconds = new Date().getTime();
            this._statisticStorage = {
                clicksShortTerm: [],
                clicksLongTermData: [],
                plasticGathered: [],
                plasticSold: 0,
                moneyGenerated: 0,
                totalHandCollectedPlastic: 0
            };
            this._plastic = 0;
            this._plasticPerClick = 1;
            this._plasticPerSecond = 0;
            this._money = 0;
            this._clicked = 0;
            this._collectorStatisticX = [];
            this._collectorStatisticY = [];
            this._products = [

                new Product("Plastikring", "Kann leben retten oder als Schmuck dienen", 1, 10, require("./img/plasticring.jpg"), 1000, false, 0, 0, 0, 1),
                new Product("Plastik Kette", "Sehr leicht: Schwimmt auf dem Wasser", 5, 25, require("./img/plastic_chain.jpg"), 8000, false, 0, 0, 0, 1),
                new Product("Plastik Ohrringe", "Sehr zerbrechlich, aber dennoch schmückend", 12, 33, require("./img/plastic_earrings.jpg"), 9500, false, 0, 0, 0, 1),
                new Product("Plastik Handtasche", "Umweltfreundliche Handtasche", 24, 60, require("./img/plastic_handbag.jpg"), 11500, false, 0, 0, 0, 1),
                new Product("Plastik Jacke", "Mit dieser Jacke bist du DER Babo", 55, 80, require("./img/plastic_jacket.jpg"), 13500, false, 0, 0, 0, 1),
                new Product("Plastik Schuhe", "Sehr komfortabel", 61, 85, require("./img/plastic_shoes.jpg"), 15000, false, 0, 0, 0, 1),
                new Product("Plastik Raum", "Ab ins Home Business!", 167, 200, require("./img/plastic_room.jpg"), 20000, false, 0, 0, 0, 1),
                new Product("Plastik Auto", "Sehr schnell, leider nicht sehr stabil", 465, 550, require("./img/plastic_car.jpg"), 60000, false, 0, 0, 0, 1),
                new Product("Plastik Flugzeug", "Fliegt wunderbar, weil sehr leicht", 545, 635, require("./img/plastic_airplane.jpg"), 100000, false, 0, 0, 0, 1),
                new Product("Plastik Supermarkt", "Ein neuer Supermarkt zum Einkaufen", 875, 965, require("./img/plastic_supermarket.jpg"), 300000, false, 0, 0, 0, 1),
                new Product("Plastik Krankenhaus", "Zur Versorgung aller Kranken", 3895, 4125, require("./img/plastic_hospital.jpg"), 1000000, false, 0, 0, 0, 1),
                new Product("Plastik Flughafen", "... weil warum nicht?", 6950, 7500, require("./img/plastic_airport.jpg"), 3000000, false, 0, 0, 0, 1)
            ];
            this.collectors = [
                new Collector("bucket", require("./img/bucket.png"), 20, "bBucket", 0.2, 0, 0, false, false),
                new Collector("vacuum cleaner", require("./img/vacuumCleaner.jpg"), 200, "bVacuumCleaner", 5, 1, 0, false, false),
                new Collector("ideonella sakariensis", require("./img/IdeonellaSakariensis.jpg"), 400, "bIdeonellaSakariensis", 12, 2, 0, false, false),
                new Collector("drone", require("./img/drone.jpg"), 500, "bDrone", 18, 3, 0, false, false),
                new Collector("dip net", require("./img/dipNet.jpg"), 700, "bDipNet", 28, 4, 0, false, false),
                new Collector("magnetic", require("./img/magnetic.png"), 900, "bMagnetic", 38, 5, 0, false, false),
                new Collector("cat", require("./img/cat.jpg"), 1100, "bCat", 49, 6, 0, false, false),
                new Collector("net", require("./img/net2.jpg"), 1400, "bNet2", 63, 7, 0, false, false),
                new Collector("time machine", require("./img/TimeMachine.jpg"), 1800, "bTimeMachine", 88, 8, 0, false, false),
                new Collector("blackhole", require("./img/blackhole.jpg"), 3000, "bBlackhole", 150, 9, 0, false, false)
            ];
        }

        this.automaticPlasticCollection();
        this.updatePlasticGathered();
    }

    addClick() {
        this._clicked = this._clicked + 1;
    }

    getClicked() {
        return this._clicked;
    }

    setPlastic(plasticAmount) {
        this._plastic = plasticAmount;
    };

    getPlastic() {
        return this._plastic;
    };

    getPlasticPerClick() {
        return this._plasticPerClick;
    }

    setPlasticPerClick(plasticAmount) {
        this._plasticPerClick = plasticAmount;
    }


    getProducts() {
        return this._products;
    }

    buttonDisableForPlastic(plastic) {
        if (this.getPlastic() < plastic) {
            return true;
        } else {
            return false;
        }
    }

    buttonDisableForMoney(money) {
        if (this.getMoney() < money) {
            return true;
        } else {
            return false;
        }
    }

    getMoney() {
        return this._money;
    }

    setMoney(money) {
        this._money = money;
    }

    insertClickObjectToShortTermClickStorage(click) {
        this._statisticStorage.clicksShortTerm.push(click)
    }

    insertPlasticToPlasticStorage(plastic) {
        this._statisticStorage.plasticAmount.push(plastic)
    }

    /**
     * adds a new data object. It has to be formatted to be usable by chart.js!
     * -->  {t: unixTimeStamp, y: value}
     *
     * @param click -->  {t: unixTimeStamp, y: value}
     */
    insertDataObjectToLongTermClickStorage(click) {
        this._statisticStorage.clicksLongTermData.push(click)
    }

    getPlasticPerSecond() {
        return this._plasticPerSecond;
    }

    setPlasticPerSecond(value) {
        this._plasticPerSecond = (Math.round(value * 10) / 10); //Smallest amount to add is 0.2
    }

    automaticPlasticCollection() {
        setInterval(() => {

            this.setPlastic(this.getPlastic() + (this.getPlasticPerSecond() / 100));
            let plasticDisplay = document.getElementById("plasticDisplay");
            if (plasticDisplay !== null) {
                document.getElementById("plasticDisplay").innerHTML = "" + Math.round(this.getPlastic());
            }
        }, 10);
    }

    updatePlasticGathered() {
        //Jede sekunde das automatische Plastik aufaddieren
        setInterval(() => {
            let lastEntry = this._statisticStorage.plasticGathered[this._statisticStorage.plasticGathered.length - 1];
            let currentTime = new Date().getTime();
            currentTime = (Math.round(currentTime / 3600000) * 3600000);
            if (lastEntry === undefined) {
                lastEntry = {
                    value: 0,
                    dateUnix: currentTime
                };
                this._statisticStorage.plasticGathered.push(lastEntry);
            }
            if (lastEntry.dateUnix + HOURINMILLIS < currentTime) {
                //Neue Stunde erreicht -> Neues Objekt erzeugen
                let dataObject = {
                    value: this.getPlasticPerSecond(),
                    dateUnix: currentTime
                };
                this._statisticStorage.plasticGathered.push(dataObject);
            } else {
                //Auf das bisherige Objekt addieren
                lastEntry.value = (Math.round((lastEntry.value + this._plasticPerSecond) * 10) / 10);
            }
        }, 1000);
    }

    offlineProduction() {
        let offlineSeconds = Math.floor((new Date().getTime() - this._lastSaved) / 1000);
        let generatedPlastic = this.getPlasticPerSecond() * offlineSeconds;
        this.setPlastic(this.getPlastic() + generatedPlastic);

        let offlineMinutes = Math.floor(offlineSeconds / 60);
        let offlineHours = Math.floor(offlineMinutes / 60);
        offlineSeconds = offlineSeconds - (offlineMinutes * 60);
        offlineMinutes = offlineMinutes - (offlineHours * 60);

        let generatedPlasticPerHour = generatedPlastic / offlineHours;

        for (let i = 0; i < offlineHours; i++) {
            this._statisticStorage.plasticGathered[i] = generatedPlasticPerHour;
        }


        Swal.fire("Offline Produktion", "Du warst für " + offlineHours + " Stunden " + offlineMinutes + " Minuten " + offlineSeconds + " Sekunden offline. In dieser Zeit wurde " + Math.round(generatedPlastic*10)/10 + " Plastik produziert und "+this.geldGained+" Geld generiert", "success");
    }

}
/**
 * returns the picture for the given collector Id
 * @param id
 * @returns {picture}
 */
function getCollectorPictureForId(id) {
    switch(id) {
        case "bBucket":
            return require("./img/bucket.png");
        case "bVacuumCleaner":
            return require("./img/vacuumCleaner.jpg");
        case "bIdeonellaSakariensis":
            return require("./img/IdeonellaSakariensis.jpg");
        case "bDrone":
            return require("./img/drone.jpg");
        case "bDipNet":
            return require("./img/dipNet.jpg");
        case "bMagnetic":
            return require("./img/magnetic.png");
        case "bCat":
            return require("./img/cat.jpg");
        case "bNet2":
            return require("./img/net2.jpg");
        case "bTimeMachine":
            return require("./img/TimeMachine.jpg");
        case "bBlackhole":
            return require("./img/blackhole.jpg");
        default:
            return null;
    }
}
/**
 * returns the picture for the given product name
 * @param name
 * @returns {picture}
 */
function getProductPictureForName(name) {
    switch(name) {
        case "Plastikring":
            return require("./img/plasticring.jpg");
        case "Plastik Kette":
            return require("./img/plastic_chain.jpg");
        case "Plastik Ohrringe":
            return require("./img/plastic_earrings.jpg");
        case "Plastik Handtasche":
            return require("./img/plastic_handbag.jpg");
        case "Plastik Jacke":
            return require("./img/plastic_jacket.jpg");
        case "Plastik Schuhe":
            return require("./img/plastic_shoes.jpg");
        case "Plastik Raum":
            return require("./img/plastic_room.jpg");
        case "Plastik Auto":
            return require("./img/plastic_car.jpg");
        case "Plastik Flugzeug":
            return require("./img/plastic_airplane.jpg");
        case "Plastik Supermarkt":
            return require("./img/plastic_supermarket.jpg");
        case "Plastik Krankenhaus":
            return require("./img/plastic_hospital.jpg");
        case "Plastik Flughafen":
            return require("./img/plastic_airport.jpg");
        default:
            return null;
    }
}

export default Game;