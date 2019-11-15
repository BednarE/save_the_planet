"use strict";

class Tutorial {

    constructor() {
        document.getElementById("title").innerText = "Die Erde retten, jetzt aber wirklich!";
        //document.getElementById("content").innerText = document.getElementById("story").innerText;
        this._story = true;
    }

    async showContent() {
        let tutorial = await import("../tutorial/tutorialText.html");
        let standard = document.createElement("div");
        standard.innerHTML = tutorial.trim();
        document.getElementById("content").appendChild(standard);

        document.getElementById("next").addEventListener("click", (mouseEvent) => {
            this.switchTutorialContent();
        });
    }

    async switchTutorialContent() {
        let tutorial = await import("../tutorial/tutorialText.html");
        let carouselSection = await import ("../tutorial/tutorialCarousel.html");
        this._story = !this._story;
        let newTutorial = document.createElement("div");
        if(this._story === true)
        {
            newTutorial.innerHTML = tutorial.trim();
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").appendChild(newTutorial);
            document.getElementById("next").addEventListener("click", (mouseEvent) => {
                this.switchTutorialContent();
            });
        }
        else {
            newTutorial.innerHTML = carouselSection.trim();
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").appendChild(newTutorial);
            document.getElementById("next").addEventListener("click", (mouseEvent) => {
                this.switchTutorialContent();
            });
        }
    }

}

export default Tutorial;