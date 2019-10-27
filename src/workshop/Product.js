"use strict";

class Product {

    constructor(name, description, moneyValue, plasticCost, picture, productionTime) {
        this._name = name;
        this._description = description;
        this._moneyValue = moneyValue;
        this._plasticCost = plasticCost;
        this._picture = picture;
        this._productionTime=productionTime;
        this.__currentlyUnderConstruction = false;
        this._leftConstructionHours = 0;
        this._leftConstructionMinutes = 0;
        this._leftConstructionSeconds = 0;
    }

    setCurrentlyUnderConstruction(underConstruction) {
        this.__currentlyUnderConstruction = underConstruction;
    }

    isCurrentlyUnderConstruction() {
        return this.__currentlyUnderConstruction;
    }

    setLeftConstructionTime(hours, minutes, seconds) {
        this._leftConstructionHours = hours;
        this._leftConstructionMinutes = minutes;
        this._leftConstructionSeconds = seconds;
    }

    getLeftConstructionHours() {
        return this._leftConstructionHours;
    }

    getLeftConstructionMinutes() {
        return this._leftConstructionMinutes;
    }

    getLeftConstructionSeconds() {
        return this._leftConstructionSeconds;
    }
}

export default Product;