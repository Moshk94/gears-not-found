function disableButton(b,c){
    b.disabled = true;
    b.style.backgroundColor = c;
};

function enableButton(b,c){
    b.disabled = false;
    b.style.backgroundColor = c;
};

function degreesToRadians(deg){return (deg * Math.PI / 180);};

function outOfRange(x,y,z){if((x < z || x > y)){return true;};};

function clone(items){return items.map(item => Array.isArray(item) ? clone(item) : item);}

let worldSizeProps = {
    pixelSize: 50,
    grid: {
        rows: 10,
        col: 10,
    }
};

let finalRound, hiScore, upPowerButton, upSpeedButton, remainingPoints, barMaxWidth, buyButton, barChange, round, cash, startButton,speed,power,lives,currentCash, footerComponent, menuComponent,currentLives, currentRound, grid, x1, y1, mouseX, upgradePower, upgradeScreen, mouseY, headerComponent, enemyCreationCount, gameOverContainer, upgradeSpeed, targetUpgradeTower, sellButton, unlockButton, upgradeTimeOnField,towerLevel, helpContainer, towerID, pathArray, enemyID;

let enemyDimensions = 39;
let selectionPhase = true;
let running = false;
let worldArray = [];
let enemyArray = [];
let towerArray = [];
let shotArray = [];
let stepTime = 0;
let time = 0;
let enemiesToCreate = 2;
let maxRoundEnemies = 5;
let removedEnemies = 0;
let createdEnemies = 0;
let hold = false;
let maximumTowerLevel = 4;
let maxRoundEnemiesTemp = 5;

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
    headerComponent = document.getElementById("headerComponent");
    footerComponent = document.getElementById("footerComponent");
    menuComponent = document.getElementById("mainMenu");
    upgradeScreen = document.getElementById("upgradeScreen");
    gameOverContainer = document.getElementById("gameOverContainer");
    upgradePower = document.getElementById("upgradePower");
    upgradeSpeed = document.getElementById("upgradeSpeed");
    sellButton = document.getElementById("sellButton");
    unlockButton = document.getElementById("unlockButton");
    upgradeTimeOnField = document.getElementById("upgradeTimeOnField");
    towerLevel = document.getElementById("towerLevel");
    helpContainer = document.getElementById("helpContainer");
    finalRound = document.getElementById("finalRound");
    hiScore = document.getElementById("hiScore");   
};

function cashControl(c){
    if(c != undefined){
        currentCash += c;
        cash.innerHTML = `CASH:${" "}${currentCash}`;
    };

    if((currentCash - towerCost) < 0){
        disableButton(buyButton,"red");
    }else if(currentCash >= towerCost){
        if(selectionPhase == true){
            enableButton(buyButton,"darkgreen");
        }else{
            disableButton(buyButton,"darkorange");
        };
    };
};

function lifeControl(p){currentLives -= p; lives.innerHTML = `LIVES:${" "}${currentLives}`;};

function randomInt(min,max){
    if(isNaN(max)){
        return Math.floor(Math.random() * Math.floor(min+1));
    }else{
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};