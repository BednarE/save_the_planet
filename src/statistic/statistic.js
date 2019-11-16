"use strict";
import Chart from "chart.js";

const SHORTTERMCLICKGRAPHDURATION = 1000*60*5; // 5 Minuten in die Vergangenheit
const SHORTTERMCLICKGRAPHSTEPSIZEINSECONDS = 30; //The step size of the shortterm graph
const HOURINMILLIS = 3600000; //1 hour in millis

class Statistic {

    constructor(game, rate) {
        this._game = game;
        this._rate = rate;
        document.getElementById("title").innerText = "Statistics";
    }

    async showContent() {
        let StatisticTemplate = await import("./statistic.html");
        let statisticDiv = document.createElement("div");
        statisticDiv.setAttribute("id","statisticTemplate");
        statisticDiv.innerHTML = StatisticTemplate.trim();
        //Add the template-Div class, so the div fills out the entire screen
        statisticDiv.classList.add("templateDiv");
        document.getElementById("content").appendChild(statisticDiv);
        this.showClickerStatistics();
        document.getElementById("timesClicked").innerHTML = "<b>Times clicked:</b> " + this._game.getClicked();
        document.getElementById("plasticsGathered").innerHTML = "<b>Plastics gathered:</b> " + this._game._plastic;
        document.getElementById("startDate").innerHTML = "<b>Started to save the planet on:</b> " + this._game._appStartUTCFormat;
        window.statisticUpdateInterval = setInterval(()=> this.showTimePlayed(), 1000);
    }

    showTimePlayed() {
        let today = new Date();
        let diffDate = (today.getTime() - this._game._appStartMiliseconds);

        let seconds = Math.floor(diffDate / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        if (document.getElementById('timePlayed') === null) {
            //We have changed the subpage!
            clearInterval(window.statisticUpdateInterval);
            return;
        }

        if (seconds <= 59) {
            document.getElementById('timePlayed').innerHTML = "<b>Saving the planet since:</b> "
                + days + "d "+ hours + "h " + minutes + "m " + seconds + "s ";
        }
        else if (minutes <= 59) {
            document.getElementById('timePlayed').innerHTML = "<b>Saving the planet since:</b> "
                + days + "d "+ hours + "h " + minutes + "m " + (seconds - (minutes * 60)) + "s ";
        }
        else if (hours <= 23){
            document.getElementById('timePlayed').innerHTML = "<b>Saving the planet since:</b> "
                + days + "d "+ hours + "h " +(minutes - (hours * 60)) + "m " + (seconds - (minutes * 60)) + "s";
        }
        else{
            document.getElementById('timePlayed').innerHTML = "<b>Saving the planet since:</b> "
                + days + "d "+ (hours - (days * 24)) + "h " +(minutes - (hours * 60)) + "m " + (seconds - (minutes * 60)) + "s";
        }
    }

    showClickerStatistics() {
        console.log("Short Term Clicks", this._game._statisticStorage.clicksShortTerm);
        console.log("Short Term Clicks", this._game._statisticStorage.clicksLongTermData);
        console.log("Short Term Clicks", this._game._statisticStorage.plasticAmount);
        this.addShortTermDataToLongTerm();
        //We want to remove all values older than 5 minutes from the shortTermGraph
        this.removeOldShortTermData();
        let clickerDataShortTerm = this.preparePlotData(this.getClicksPer_CLICKGRAPHSTEPSIZEINSECONDS());
        let plasticData = this.preparePlasticPlotData(this.getPlasticsPerHour(this._game._statisticStorage.plasticAmount));

        //ShortTerm Clicks
        let ctx = document.getElementById('clicksShortTermChart').getContext('2d');
        ctx.canvas.width = 600;
        ctx.canvas.height = 300;
        let color = Chart.helpers.color;
        let cfg = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Times Clicked',
                    backgroundColor: color("red").alpha(0.5).rgbString(),
                    borderColor: "red",
                    data: clickerDataShortTerm,
                    type: 'line',
                    pointRadius: 2,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 3
                }]
            },
            options: {
                title: {
                    text: 'Klicks der letzten 5 Minuten, gruppiert alle 30 Sekunden',
                    display: true
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        ticks: {
                            source: 'auto',
                            autoSkip: false
                        },
                        time: {
                            displayFormats: {
                                millisecond: 'HH:mm:ss'
                            },
                            stepSize: SHORTTERMCLICKGRAPHSTEPSIZEINSECONDS,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Uhrzeit'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Klicks'
                        },
                        beginAtZero: true,
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax: 100
                        }
                    }]
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function (tooltipItem, myData) {
                            let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };
        this._clicksChart = new Chart(ctx, cfg);

        //LongTerm Clicks
        let ctx2 = document.getElementById('clicksLongTermChart').getContext('2d');
        ctx2.canvas.width = 600;
        ctx2.canvas.height = 300;
        let cfg2 = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Times Clicked',
                    backgroundColor: color("red").alpha(0.5).rgbString(),
                    borderColor: "red",
                    data: this._game._statisticStorage.clicksLongTermData,
                    type: 'line',
                    pointRadius: 2,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 3
                }]
            },
            options: {
                title: {
                    text: 'Klicks summiert bis zur vollen Stunde',
                    display: true
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        ticks: {
                            source: 'auto',
                            autoSkip: false
                        },
                        time: {
                            displayFormats: {
                                millisecond: 'DD. MMM: HH'
                            },
                            stepSize: HOURINMILLIS,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Tag. Monat: Stunde'
                        },
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Klicks'
                        },
                        beginAtZero: true,
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax: 5000
                        },
                        stepSize: 50
                    }]
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function (tooltipItem, myData) {
                            let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };
        new Chart(ctx2, cfg2);


        //Plastics
        let ctx3 = document.getElementById('plasticChart').getContext('2d');
        ctx3.canvas.width = 600;
        ctx3.canvas.height = 300;
        let cfg3 = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Plastics',
                    backgroundColor: color("red").alpha(0.5).rgbString(),
                    borderColor: "red",
                    data: plasticData,
                    type: 'line',
                    pointRadius: 2,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 3
                }]
            },
            options: {
                title: {
                    text: 'Plastics gathered in an Hour',
                    display: true
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        ticks: {
                            source: 'auto',
                            autoSkip: false
                        },
                        time: {
                            displayFormats: {
                                millisecond: 'DD. MMM: HH'
                            },
                            stepSize: HOURINMILLIS,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Hour'
                        },
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Plastics'
                        },
                        beginAtZero: true,
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax: 5000
                        },
                        stepSize: 50
                    }]
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function (tooltipItem, myData) {
                            let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };
        new Chart(ctx3, cfg3);

        //Collectors
        let ctx4 = document.getElementById('collectorChart').getContext('2d');
        ctx4.canvas.width = 600;
        ctx4.canvas.height = 300;
        let cfg4 = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'clicks',
                        backgroundColor: color("red").alpha(0.5).rgbString(),
                        borderColor: "red",
                        data: [2, 29, 5, 5, 2, 3, 10],
                        type: 'line',
                        pointRadius: 2,
                        fill: false,
                        lineTension: 0,
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'series',
                            ticks: {
                                source: 'auto',
                                autoSkip: false
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'clicks per one second'
                            }
                        }]
                    },
                    tooltips: {
                        intersect: false,
                        mode: 'index',
                        callbacks: {
                            label: function(tooltipItem, myData) {
                                var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += parseFloat(tooltipItem.value).toFixed(2);
                                return label;
                            }
                        }
                    }
                }
            };
        new Chart(ctx4, cfg4);
    }


    /**
     * Takes an array consisting of multiple clickObjects and parses it to a ploatable Array from chart.js
     * @param clicksArray
     * @returns {[]}
     */
    preparePlotData(clicksArray){
        let plotableData = [];  // Die Daten die man darstellen möchte

        for (let i = 0; i < clicksArray.length; i++){
            plotableData.push(
                {
                    t: clicksArray[i].dateUnix, //wegen chart.js
                    y: clicksArray[i].value  //wegen chart.js
                }
            );
        }
        return plotableData
    }

    preparePlasticPlotData(plasticAmount){
        let plotableData = [];
        for (let storedPlasticObject of this._game._statisticStorage.plasticAmount){
            plotableData.push(
                {
                    t: plasticAmount.dateUnix,
                    y: plasticAmount.value
                }
            );
        }
        return plotableData
    }


    /**
     * Returns an interval Array, where each borderpoint is one stepsize after the other. Starts with startDate and ends with endDate
     * @param startDate
     * @param endDate
     * @param stepsize
     * @returns {[]}
     */
    createIntervalBorders(startDate, endDate, stepsize){
        let intervals = [];
        let current = startDate;
        intervals.push(current);
        while (current <= endDate){
            intervals.push(current + stepsize);
            current = current + stepsize
        }
        return intervals
    }

    getClicksPerInterval(stepsize, clickList) {
        let earliest = new Date().getTime() - SHORTTERMCLICKGRAPHDURATION; //Show the last 5 Minutes
        earliest = (Math.round(earliest / stepsize) * stepsize); // Round it to the nearest stepsize duration value
        //e.g. every 30 seconds one value containing all the clicks for the last 30 seconds

        let filteredClicks = [];

        let latest = new Date().getTime(); //We want to add zero-values too, so let the duration of the graph go until
        //We are up to date with the current time
        latest = (Math.round(latest / stepsize) * stepsize);
        let intervalsArray = this.createIntervalBorders(earliest, latest, stepsize);

        let lower = 0;
        let upper = 0;
        for (let i = 0; i < intervalsArray.length - 1; i++) {
            lower = intervalsArray[i];
            upper = intervalsArray[i + 1];
            let clicksInInterval = 0;
            for (let y = 0; y < clickList.length; y++) {
                if (lower < clickList[y].dateUnix) {
                    if (upper > clickList[y].dateUnix) {
                        clicksInInterval = clicksInInterval + clickList[y].value;
                    }
                }
            }
            filteredClicks.push({dateUnix: upper, value: clicksInInterval})
        }
        return filteredClicks;
    }
    getPlasticsPerHour(plasticList) {
        let earliest = this._game._appStartMiliseconds;

        let filteredPlastics = [];

        let latest = new Date().getTime(); //We want to add zero-values too, so let the duration of the graph go until
        //We are up to date with the current time
        latest = (Math.round(latest / 3600000) * 3600000);
        let intervalsArray = this.createIntervalBorders(earliest, latest, 3600000);

        let lowest = 0;
        let uppest = 0;
        for (let i = 0; i < intervalsArray.length - 1; i++) {
            lowest = intervalsArray[i];
            uppest = intervalsArray[i + 1];
            let plasticInInterval = 0;
            for (let y = 0; y < plasticList.length; y++) {
                if (lowest < plasticList[y].dateUnix) {
                    if (uppest > plasticList[y].dateUnix) {
                        plasticInInterval = plasticInInterval + plasticList[y].value;
                    }
                }
            }
            filteredPlastics.push({dateUnix: uppest, value: plasticInInterval})
        }
        return filteredPlastics;
    }

    getClicksPer_CLICKGRAPHSTEPSIZEINSECONDS() {
        return this.getClicksPerInterval(1000 * SHORTTERMCLICKGRAPHSTEPSIZEINSECONDS, this._game._statisticStorage.clicksShortTerm);
    }

    /**
     * Adds the clickObjects inside the shortTermList to the longTermStorage, as long as those have not been added before
     */

    addShortTermDataToLongTerm() {
        //Get the newest entry of the longTermStorageList - We are in a simple chart.js data Array here!
        let longTermData = JSON.parse(JSON.stringify(this._game._statisticStorage.clicksLongTermData));
        //JSON parse & stringify to get a deep copy without references

        for (let clickObject of this._game._statisticStorage.clicksShortTerm) {
            if (!clickObject.alreadyAddedToLongTermStorage) {
                this.addValueToLongTermStorage(clickObject);
            }
        }
        return longTermData;
    }

    /**
     * Removes all the Clickobjects from the shortTerm Storage which are older than the SHORTTERMCLICKGRAPHDURATION.
     * Removes the values attached to a fixed time point (graph is rounded to 30 seconds) all at once.
     */
    removeOldShortTermData() {

        let stepSizeInMillis = SHORTTERMCLICKGRAPHSTEPSIZEINSECONDS*1000;
        let earliest = new Date().getTime() - SHORTTERMCLICKGRAPHDURATION; //The earliest is the oldest value in the graph
        earliest = (Math.round(earliest / stepSizeInMillis) * stepSizeInMillis);
        let latest = new Date().getTime();
        let intervals = this.createIntervalBorders(earliest, latest, stepSizeInMillis);

        //Remove values that would be going outside the graph (first entry in intervals)
        for (let clickObject of this._game._statisticStorage.clicksShortTerm) {
            if (clickObject.dateUnix < intervals[0]+1) {
                //Remove all entries from the graph which are before the first interval's start +1 millisecond
                //(+1 because we do not want to remove the very first entry, as this entry still is inside the graphs range)
                this._game._statisticStorage.clicksShortTerm.shift(); //Remove first value from list
            }
        }
    }

    /**
     * Adds the clickObject given to the longTermStorage.
     * Does not just append the clickObject to the array, but does add its value to the nearest hour-mark of the longtermStorage Graph
     * @param clickObject
     */
    addValueToLongTermStorage(clickObject) {
        //Round the timestamp of the clickObject to the next hour, so all values up until this hour-border are added to it
        let timeRoundedToHours = Math.ceil(clickObject.dateUnix / HOURINMILLIS) * HOURINMILLIS;
        let lastEntryInLongTermList = this._game._statisticStorage.clicksLongTermData[this._game._statisticStorage.clicksLongTermData.length-1];
        if (lastEntryInLongTermList !== undefined && lastEntryInLongTermList !== null && lastEntryInLongTermList.t === timeRoundedToHours) {
            //The data entry is there and it is the right hour to add the clicksum value to the entry
            lastEntryInLongTermList.y = lastEntryInLongTermList.y + clickObject.value;
        } else {
            //New entry, we have played over an hour!
            this._game.insertDataObjectToLongTermClickStorage({
                t: timeRoundedToHours,
                y: clickObject.value
            });
        }
        //Mark it as added
        clickObject.alreadyAddedToLongTermStorage = true;
    }

}
export default Statistic;