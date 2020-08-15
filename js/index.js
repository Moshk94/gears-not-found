"use strict"
const startingCash = 30;
const startingLives = Infinity;
const startingRound = Infinity;
const maxSkillPoints = 5;
const defaultRemainingPoints = Math.floor(maxSkillPoints/2)-Math.floor(maxSkillPoints/10);

let towerCost = 10;
let currentPower, currentSpeed;
let remainingSkillPoints;

function startGame(){
    let headerComponent = document.getElementById("headerComponent");
    let footerComponent = document.getElementById("footerComponent");
    let menuComponent = document.getElementById("mainMenu");
    
    headerComponent.style.top = "0px";
    footerComponent.style.bottom = "0px";
    menuComponent.style.top = "-50%"
    
    resetFunction();
    createGrid();
};

function setSpeed(caller){
    if(caller.innerHTML == "+" && currentSpeed < maxSkillPoints){
        currentSpeed++;
    }else if(caller.innerHTML == "-" && currentSpeed > 1){
        currentSpeed--;
    };
    checkIfOverMaxSkill();
};

function setPower(caller){    
    if(caller.innerHTML == "+" && currentPower < maxSkillPoints){
        currentPower++;
    }else if(caller.innerHTML == "-" && currentPower > 1){
        currentPower--;
    };
    checkIfOverMaxSkill();
};

function roundsControl(){
    currentRound++;
    round.innerHTML = `ROUND:${currentRound}`;
    disableButton(startButton);
    if((currentCash - towerCost) < 0){
        disableButton(buyButton);
    }else{
        disableButton(buyButton);
        buyButton.style.backgroundColor = "darkorange";
    };
    selectionPhase = false
    start();
    createEnemy();
};

function buyTower(){
    if((speed == null || power == null) && selectionPhase == true){
        console.log("buy")
        currentCash -= towerCost;
        cash.innerHTML = `CASH:${currentCash}`;
        speed = currentSpeed;
        power = currentPower
        createTower(speed,power);
        currentPower = currentSpeed = defaultRemainingPoints;
    };

    checkIfOverMaxSkill();

    if((currentCash - towerCost) < 0){
        disableButton(buyButton);
    };
};

function resetFunction(){
    currentLives = startingLives;
    currentCash = startingCash;
    currentRound = startingRound;

    lives.innerHTML = `LIVES:${currentLives}`;
    cash.innerHTML = `CASH:${currentCash}`;
    round.innerHTML = `ROUND:${currentRound}`;
    currentSpeed = currentPower = defaultRemainingPoints
    remainingSkillPoints = maxSkillPoints - currentPower - currentSpeed + 1;
    
    powerBar.style.width = speedBar.style.width = `${barChange*defaultRemainingPoints}px`;
    remainingPoints.innerHTML = remainingSkillPoints;
    buyButton.innerHTML = `BUY<br>(${towerCost} CASH)<br><br>(P:${currentPower} S:${currentSpeed})`;
};

function checkIfOverMaxSkill(){
    powerBar.style.width = `${barChange*currentPower}px`;
    speedBar.style.width = `${barChange*currentSpeed}px`;
    buyButton.innerHTML = `BUY<br>(${towerCost} CASH)<br><br>(P:${currentPower} S:${currentSpeed})`
    
    if(((currentPower + currentSpeed) >= maxSkillPoints+1)){
        disableButton(upPowerButton);
        disableButton(upSpeedButton);
    }else if(((currentPower + currentSpeed) < maxSkillPoints+1)){
        enableButton(upPowerButton);
        enableButton(upSpeedButton);
    };
    
    remainingSkillPoints = (maxSkillPoints+1)-(currentSpeed+currentPower);
    remainingPoints.innerHTML = remainingSkillPoints;
};