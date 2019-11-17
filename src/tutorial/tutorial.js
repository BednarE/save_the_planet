"use strict";

class Tutorial {

    constructor() {
        document.getElementById("title").innerText = "Die Erde retten, jetzt aber wirklich!";
        //document.getElementById("content").innerText = document.getElementById("story").innerText;
        this._tutorial = true;
    }

    async showContent() {
        let carouselSection = await import ("../tutorial/tutorialCarousel.html");
        let standard = document.createElement("div");
        standard.classList.add("tutorial");
        standard.innerHTML = carouselSection.trim();
        document.getElementById("content").appendChild(standard);

        document.getElementById("next").addEventListener("click", (mouseEvent) => {
            this.switchTutorialContent();
        });
    }

    async switchTutorialContent() {
        let tutorial = await import("../tutorial/tutorialText.html");
        let carouselSection = await import ("../tutorial/tutorialCarousel.html");
        this._tutorial = !this._tutorial;
        let newTutorial = document.createElement("div");
        if(this._tutorial === true)
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
            newTutorial.classList.add("tutorial");
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").appendChild(newTutorial);
            document.getElementById("next").addEventListener("click", (mouseEvent) => {
                this.switchTutorialContent();
            });
        }
    }

}

export default Tutorial;