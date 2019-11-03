"use strict";

import Product from "./workshop/Product";
import StatisticUtils from "./statistic/statisticutils";
import Collector from "./clicker/collector";

class Game {

    constructor() {
        this._appStart = new Date().toISOString();
        this._appStartUTCFormat = new Date().toLocaleString();
        this._appStartMiliseconds = new Date().getTime();
        this._statisticStorage = {clicks : []};
        this._plastic = 0;
        this._plasticPerClick=1;
        this._money=0;
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
        this.collectors = [
            new Collector("bucket", require("./img/bucket.png"), 10, "bBucket", "0.2"),
            new Collector("vacuum cleaner", require("./img/vacuumCleaner.jpg"), 100, "bVacuumCleaner", "3"),
            new Collector("ideonella sakariensis", require("./img/IdeonellaSakariensis.jpg"), 200, "bIdeonellaSakariensis", "7"),
            new Collector("drone", require("./img/drone.jpg"), 250, "bDrone", "9"),
            new Collector("dip net", require("./img/dipNet.jpg"), 350, "bDipNet", "13"),
            new Collector("magnetic",require("./img/magnetic.png"), 450, "bMagnetic", "16"),
            new Collector("cat", require("./img/cat.jpg"), 550, "bCat", "23"),
            new Collector("net", require("./img/net2.jpg"), 700, "bNet2", "30"),
            new Collector("time machine", require("./img/TimeMachine.jpg"), 900, "bTimeMachine", "40"),
            new Collector("blackhole", require("./img/blackhole.jpg"), 1500, "bBlackhole", "55")
        ];

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
    insertClickObjectToClickStorage(click) {
        this._statisticStorage.clicks.push(click)
    }

}

export default Game;