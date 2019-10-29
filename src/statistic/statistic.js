"use strict";
import StatisticTemplate from "./statistic.html";
import Chart from "chart.js";
import StatisticUtils from "./statisticutils";

class Statistic {

    constructor(game) {
        this._game = game;
        document.getElementById("title").innerText = "Statistics";
        let statisticDiv = document.createElement("div");
        statisticDiv.innerHTML = StatisticTemplate.trim();
        document.getElementById("content").appendChild(statisticDiv);
        this.showClickerStatistics();
    }

    showClickerStatistics(){
        this._clickerData = this.preparePlotData(this.getClicksPerTenSeconds());

        let ctx = document.getElementById('clicksChart').getContext('2d');
        ctx.canvas.width = 600;
        ctx.canvas.height = 300;

        let color = Chart.helpers.color;
        let cfg = {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'clicks',
                    backgroundColor: color("red").alpha(0.5).rgbString(),
                    borderColor: "red",
                    data: this._clickerData,
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
                        },
                        time: {
                            displayFormats: {
                                millisecond: 'hh:mm:ss'
                            },
                            stepSize: 10,
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'clicks per one second'
                        },
                        beginAtZero: true,
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax: 100
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(tooltipItem, myData) {
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
    }

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

    getClicksDuring(startDate, endDate) {
        let allClicks = this._game._statisticStorage.clicks;
        let filteredClicks = [];
        let parsed = 0;
        for (let i = 0; i < allClicks.length; i++) {
            let unixTS = allClicks[i].dateUnix;
            if (unixTS > startDate) {
                if (unixTS < endDate) {
                    filteredClicks.push(allClicks[i])
                }
            }
        }
        return filteredClicks
    }

    findEarliest(clicksArray){
        let minimum = clicksArray[0].dateUnix;
        for (let i = 0; i < clicksArray.length; i++) {
            if (minimum > clicksArray[i].dateUnix) {
                minimum = clicksArray[i].dateUnix;
            }
        }
        return minimum;
    }

    findLatest(clicksArray){
        let maximum = clicksArray[0].dateUnix;
        for (let i = 0; i < clicksArray.length; i++) {
            if (maximum < clicksArray[i].dateUnix) {
                maximum = clicksArray[i].dateUnix
            }
        }
        return maximum
    }

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

    getClicksPerInterval(stepsize) {
        let allClicks = this._game._statisticStorage.clicks;
        if (allClicks.length === 0) {
            return [];
        }

        //Only show round 10 secs. earliest = earliest dateUnix value from array
        let earliest = this.findEarliest(allClicks);
        let rounded = (Math.round( earliest / 10000) * 10000);
        earliest = rounded;

        let filteredClicks = [];
        let clicksInInterval = 0;
        //Alle Werte die vor dem ersten auf 10 Sekunden aufgerundeten Wert liegen diesem hinzufügen
        for (let y = 0; y < allClicks.length; y++) {
            if (allClicks[y].dateUnix < earliest) {
                clicksInInterval = clicksInInterval + allClicks[y].value;
            }
        }
        if (clicksInInterval !== 0) {
            filteredClicks.push({dateUnix: earliest, value: clicksInInterval})
        }

        let latest = this.findLatest(allClicks);
        let intervalsArray = this.createIntervalBorders(earliest, latest, stepsize);

        let lower = 0;
        let upper = 0;
        let middle = 0;

        for (let i = 0; i < intervalsArray.length - 1; i++) {
            lower = intervalsArray[i];
            upper = intervalsArray[i + 1];
            middle = (lower + upper) / 2;
            let clicksInInterval = 0;
            for (let y = 0; y < allClicks.length; y++) {
                if (lower < allClicks[y].dateUnix) {
                    if (upper > allClicks[y].dateUnix) {
                        clicksInInterval = clicksInInterval + allClicks[y].value;
                    }
                }
            }
            filteredClicks.push({dateUnix: upper, value: clicksInInterval})
        }
        return filteredClicks
    }

    getClicksPerOneSecond() {
        return this.getClicksPerInterval(1000);
    }

    getClicksPerTenSeconds() {
        return this.getClicksPerInterval(10 * 1000);
    }

    getClicksPerThirtySeconds(){
        return this.getClicksPerInterval(1000*30);
    }

    getClicksPerTSixtySeconds() {
        return this.getClicksPerInterval(60 * 1000);
    }

    getClicksPerOneHour(){
        return this.getClicksPerInterval(1000*60*60);
    }
}
export default Statistic;