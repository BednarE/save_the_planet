"use strict";

import Product from "./workshop/Product";

class Game {

    constructor() {
        this._plastic = 0;
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
    }

    setPlastic(plasticAmount) {
        this._plastic = plasticAmount;
    };

    getPlastic() {
        return this._plastic;
    };

    getProducts() {
        return this._products;
    }
}

export default Game;