"use strict";

class Clicker {

    constructor() {
        document.getElementById("title").innerText = "Main Page";
    }
    var clicks = 0;
    function incrementClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };

}

export default Clicker;