"use strict";

import Product from "./workshop/Product";
import StatisticUtils from "./statistic/statisticutils";
import Collector from "./clicker/collector";

class Game {

    constructor() {
        this._appStart = new Date().toISOString();
        this._appStartUTCFormat = new Date().toLocaleString();
        this._appStartMiliseconds = new Date().getTime();
        this._statisticStorage = {clicksShortTerm : [], clicksLongTermData : [], plasticAmount:[]};
        this._plastic = 100000;
        this._plasticPerClick=1;
        this._plasticPerSecond=0;
        this._money=0;
        this._clicked = 0;
        this._collectorStatisticX = [];
        this._collectorStatisticY = [];
        this._products = [

            new Product("Plastikring", "Ein nicht-so glänzender Plastikring", 1, 10, require("./img/plasticring.jpg"), 1000),
            new Product("Plastik Kette", "sehr leicht und bröselig", 3, 15, require("./img/plastic_chain.jpg"), 5000),
            new Product("Plastik Ohrringe","sehr leicht zerbrechlich, aber dennoch schmückend", 5, 25,require("./img/plastic_earrings.jpg"), 10000),
            new Product("Plastik Handtasche","umweltfreundliche Handtasche", 10, 45,require("./img/plastic_handbag.jpg"), 30000),
            new Product("Plastik Jacke","sehr stylisch, sorgt für anziehende Blicke", 17, 65,require("./img/plastic_jacket.jpg"), 80000),
            new Product("Plastik Schuhe","sehr komfortabel", 20, 70,require("./img/plastic_shoes.jpg"), 75000),
            new Product("Plastik Raum","zum Versammeln mit Umweltaktivisten, so wie Greta Thunberg", 50, 180,require("./img/plastic_room.jpg"), 500000),
            new Product("Plastik Auto","sehr schnell, dafür das es nur aus Plastik ist", 100, 300,require("./img/plastic_car.jpg"), 800000),
            new Product("Plastik Flugzeug","sehr stabil für seine Verhältnisse", 150, 400,require("./img/plastic_airplane.jpg"), 1000000),
            new Product("Plastik Supermarkt","ein neuer Supermarkt zum Einkaufen", 300, 750,require("./img/plastic_supermarket.jpg"), 3000000),
            new Product("Plastik Krankenhaus","zur Versorgung von kranken Umweltaktivisten", 1000, 4000,require("./img/plastic_hospital.jpg"), 10000000),
            new Product("Plastik Flughafen","damit die Umweltaktivisten um die Welt reisen können", 1500, 6000,require("./img/plastic_airport.jpg"), 30000000)
        ];
        this.collectors = [
            new Collector("bucket", require("./img/bucket.png"), 10, "bBucket", 0.2,0),
            new Collector("vacuum cleaner", require("./img/vacuumCleaner.jpg"), 100, "bVacuumCleaner", 3,1),
            new Collector("ideonella sakariensis", require("./img/IdeonellaSakariensis.jpg"), 200, "bIdeonellaSakariensis", 7,2),
            new Collector("drone", require("./img/drone.jpg"), 250, "bDrone", 9,3),
            new Collector("dip net", require("./img/dipNet.jpg"), 350, "bDipNet", 13,4),
            new Collector("magnetic",require("./img/magnetic.png"), 450, "bMagnetic", 16,5),
            new Collector("cat", require("./img/cat.jpg"), 550, "bCat", 23,6),
            new Collector("net", require("./img/net2.jpg"), 700, "bNet2", 30,7),
            new Collector("time machine", require("./img/TimeMachine.jpg"), 900, "bTimeMachine", 40,8),
            new Collector("blackhole", require("./img/blackhole.jpg"), 1500, "bBlackhole", 55,9)
        ];

        this.automaticPlasticCollection();
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
    buttonDisableForPlastic(plastic){
        if(this.getPlastic()<plastic){
            return true;
        }else{
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

    insertPlasticToPlasticStorage(plastic){
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
        this._plasticPerSecond = value;
    }

    automaticPlasticCollection() {
        setInterval(() => {

            this.setPlastic(this.getPlastic() + (this.getPlasticPerSecond() / 100));
            let plasticDisplay = document.getElementById("plasticDisplay");
            if (plasticDisplay !== null) {
                document.getElementById("plasticDisplay").innerHTML = ""+ Math.round(this.getPlastic());
            }
        }, 10);
    }
}

export default Game;