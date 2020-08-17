"use strict"
const towerCost = 10;
const startingCash = towerCost*5;
const startingLives = 200;
const startingRound = 0;
const maxSkillPoints = 5;
const defaultRemainingPoints = Math.floor(maxSkillPoints/2)-Math.floor(maxSkillPoints/10);
let inGame = false;

let currentPower, currentSpeed;
let remainingSkillPoints;

function startGame(){
    if(!inGame){
        headerComponent.style.top = "0px";
        footerComponent.style.bottom = "0px";
        menuComponent.style.top = "-50%"
        gameOverContainer.style.opacity = "0"
        gameOverContainer.style.pointerEvents = "none";
        
        resetFunction();
        createGrid();
        inGame = !inGame
    };
};

function gotoMainMenu(){
    gameOverContainer.style.opacity = "0"
    gameOverContainer.style.pointerEvents = "none";
    menuComponent.style.top = "50%"
}

function gameOverScreen(){
    gameOverContainer.style.pointerEvents = "auto";
    gameOverContainer.style.opacity = "1"
    gridContainer.style.top = "145%"
    inGame = !inGame
}

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
        buyButton.style.backgroundColor = "red";
    }else{
        disableButton(buyButton);
        buyButton.style.backgroundColor = "darkorange";
    };
    selectionPhase = false;
    start();
};

function buyTower(){
    if((speed == null || power == null) && selectionPhase == true){
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
        buyButton.style.backgroundColor = "red";
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
    
    enableButton(startButton);
    enableButton(buyButton)
    buyButton.style.backgroundColor = "green";

    towerArray = [];
    shotArray = [];
    enemyArray = [];
    enemyID = 0;
    towerID = 0;
    removedEnemies = 0;
    createdEnemies = 0;
    enemyCreationCount = 0;
    selectionPhase = true;
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