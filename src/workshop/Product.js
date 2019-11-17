"use strict";

class Product {

    constructor(name, description, moneyValue, plasticCost, picture, productionTime, currentlyUnderConstruction, leftConstructionHours, leftConstructionMinutes, leftConstructionSeconds, productAmount) {
        this._name = name;
        this._description = description;
        this._moneyValue = moneyValue;
        this._plasticCost = plasticCost;
        this._picture = picture;
        this._productionTime=productionTime;
        this._currentlyUnderConstruction = currentlyUnderConstruction;
        this._leftConstructionHours = leftConstructionHours;
        this._leftConstructionMinutes = leftConstructionMinutes;
        this._leftConstructionSeconds = leftConstructionSeconds;
        this._productAmount = productAmount;
    }

    setCurrentlyUnderConstruction(underConstruction) {
        this._currentlyUnderConstruction = underConstruction;
    }

    isCurrentlyUnderConstruction() {
        return this._currentlyUnderConstruction;
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