const outOfRange = (x,y,z) => (x < z || x > y) ? true : false;
const degreesToRadians = (deg) => deg * Math.PI / 180;

let upPowerButton, upSpeedButton, remainingPoints, barMaxWidth, buyButton,
    barChange, round, cash, startButton,speed,power,lives,currentCash,
    currentLives, currentRound, grid, x1, y1, mouseX, mouseY;

let selectionPhase = true;
let running = false
let worldArray = [];
let enemyArray = [];
let towerArray = [];
let shotArray = [];
let enemyID = 0;
let pathArray;

window.onmousemove = (e) => {mouseX = e.clientX, mouseY = e.clientY};

window.onload = function() {
    upPowerButton = document.getElementById("upPowerButton");
    upSpeedButton = document.getElementById("upSpeedButton");
    remainingPoints = document.getElementById("remainingPoints");
    buyButton = document.getElementById("buyButton");
    barMaxWidth = document.getElementById("barContainer").getBoundingClientRect().width;
    barChange = (barMaxWidth/maxSkillPoints);
    round = document.getElementById("round");
    cash = document.getElementById("cash");
    startButton = document.getElementById("startButton");
    lives = document.getElementById("lives");
}

const disableButton = (b) => (b.disabled = true, b.style.cursor = "not-allowed");
const enableButton = (b) => (b.disabled = false, b.style.cursor = "default");

const worldSizeProps = {
    pixelSize: 50,
    grid: {
        rows: 10,
        col: 10,
    }
};

let enemyDimensions = worldSizeProps.pixelSize-5; // this would be based on the tile enemyDimensions

function cashControl(p){
    currentCash += p
    cash.innerHTML = `CASH:${currentCash}`;
}

function lifeControl(p){
    currentLives -= p
    lives.innerHTML = `LIVES:${currentLives}`;
}

function randomInt(min,max){
    if(isNaN(max)){
        return Math.floor(Math.random() * Math.floor(min+1));
    }else{
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};