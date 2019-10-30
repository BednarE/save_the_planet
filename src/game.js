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
            new Collector("bucket","./img/bucket.png", 10, "bBucket"),
            new Collector("vacuum cleaner", "./img/vacuumCleaner.jpg", 100, "bVacuumCleaner"),
            new Collector("ideonella sakariensis", "./img/IdeonellaSakariensis.jpg", 200, "bIdeonellaSakariensis"),
            new Collector("drone", "./img/drone.jpg", 250, "bDrone"),
            new Collector("dip net", "./img/dipNet.jpg", 350, "bDipNet"),
            new Collector("magnetic","./img/magnetic.jpg", 450, "bMagnetic"),
            new Collector("cat", "./img/cat.jpg", 550, "bCat"),
            new Collector("net", "./img/net2.jpg", 700, "bNet2"),
            new Collector("time machine", "./img/TimeMachine.jpg", 900, "bTimeMachine"),
            new Collector("blackhole", "./img/blackhole.jpg", 1500, "bBlackhole")
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
    insertMoneyObjectToMoneyStorage(money) {
        this._statisticStorage.money.push(money)
    }

}

export default Game;