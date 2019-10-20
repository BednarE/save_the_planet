"use strict";

class Product {

    constructor(name, description, moneyValue, plasticCost, picture, productionTime) {
        this._name = name;
        this._description = description;
        this._moneyValue = moneyValue;
        this._plasticCost = plasticCost;
        this._picture = picture;
        this._productionTime=productionTime;
    }
}

export default Product;