"use strict"
const towerCost = 10;
const startingCash = towerCost*5;
const startingLives = 200;
const maxSkillPoints = 5;
const defaultRemainingPoints = Math.floor(maxSkillPoints/2)-Math.floor(maxSkillPoints/10);
let inGame = false;

let currentPower, currentSpeed;
let remainingSkillPoints;

function startGame(){
    if(!inGame){
        headerComponent.style.top = "0px";
        footerComponent.style.bottom = "0px";
        menuComponent.style.top = "-50%";
        gameOverContainer.style.opacity = "0";
        gameOverContainer.style.pointerEvents = "none";
        helpContainer.style.top = "150%";
        
        resetFunction();
        createGrid();
        inGame = !inGame;
    };
};

function gotoMainMenu(){
    gameOverContainer.style.opacity = "0";
    gameOverContainer.style.pointerEvents = "none";
    menuComponent.style.top = "20%";
    helpContainer.style.top = "65%";
};

function backToTowerCreation(){
    upgradeScreen.style.bottom = "-125px";
    targetUpgradeTower = null;
};

function gameOverScreen(){
    gameOverContainer.style.pointerEvents = "auto";
    gameOverContainer.style.opacity = "1";
    gridContainer.style.top = "145%";
    inGame = !inGame;
};

function setSpeed(caller){
    if(caller.innerHTML == "+" && currentSpeed < maxSkillPoints){
        currentSpeed++;
    }else if(caller.innerHTML == "-" && currentSpeed > 1){
        currentSpeed--;
    };
    checkIfOverMaxSkill();
};

function upgradeTower(){
    if(targetUpgradeTower.upgradeLevel < maximumTowerLevel){
        let cost = targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10);
        cashControl(-cost);
    
        if(targetUpgradeTower.power == targetUpgradeTower.speed){
            targetUpgradeTower.power += 2;
            targetUpgradeTower.speed += 2;
        }else if(targetUpgradeTower.power > targetUpgradeTower.speed){
            targetUpgradeTower.power += 3;
            targetUpgradeTower.speed += 1;
        }else if(targetUpgradeTower.power < targetUpgradeTower.speed){
            targetUpgradeTower.power += 1;
            targetUpgradeTower.speed += 2;
        };
        
        targetUpgradeTower.upgradeLevel++;
    
        upgradePower.innerHTML = `Power: ${targetUpgradeTower.power}`;
        upgradeSpeed.innerHTML = `Speed: ${targetUpgradeTower.speed}`;
        targetUpgradeTower.cost += cost;
        upgradeButton.innerHTML = `Upgrade Tower (-${targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)})`;
        sellButton.innerHTML = `Sell Tower (+${targetUpgradeTower.cost * 0.8})`;
        towerLevel.innerHTML = `Tower Level: ${targetUpgradeTower.upgradeLevel}`;
        if(currentCash < targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)){
            disableButton(upgradeButton,"red");
        };
    };

    if(targetUpgradeTower.upgradeLevel >= maximumTowerLevel){
        disableButton(upgradeButton,"dimgrey");
        upgradeButton.innerHTML = `Max Upgrades`;
    };
    
};

function setPower(caller){    
    if(caller.innerHTML == "+" && currentPower < maxSkillPoints){
        currentPower++;
    }else if(caller.innerHTML == "-" && currentPower > 1){
        currentPower--;
    };
    checkIfOverMaxSkill();
};

function unlockTower(){
    targetUpgradeTower.timeOnField = 0;
    disableButton(unlockButton,"dimgrey");
    upgradeTimeOnField.innerHTML = `Time left: ${(404-targetUpgradeTower.timeOnField)/10}s`;
    cashControl(-towerCost/2);
};

function sellTower(){
    cashControl(targetUpgradeTower.cost * 0.8);
    let pos = towerArray.findIndex(x => x.id == targetUpgradeTower.id);
    let targetTower = document.getElementById(`tower${targetUpgradeTower.id}`);
    worldArray[targetUpgradeTower.worldLoc[0]][targetUpgradeTower.worldLoc[1]] = 0;
    targetTower.remove();
    towerArray.splice(pos,1);
    shotArray.splice(pos,1);
    backToTowerCreation();
};

function upgradeScreenChange(){
    if(currentCash < targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)){
        disableButton(upgradeButton, "red");
    }else{
        enableButton(upgradeButton,"darkgreen");
    };

    sellButton.innerHTML = `Sell Tower (+${targetUpgradeTower.cost * 0.8})`;
    towerLevel.innerHTML = `Tower Level: ${targetUpgradeTower.upgradeLevel}`;
    upgradePower.innerHTML = `Power: ${targetUpgradeTower.power}`;
    upgradeSpeed.innerHTML = `Speed: ${targetUpgradeTower.speed}`;
    upgradeTimeOnField.innerHTML = `Time left: ${(404-targetUpgradeTower.timeOnField)/10} s`;
    unlockButton.innerHTML = `Unlock tower (-${towerCost/2})`;
    if(targetUpgradeTower.upgradeLevel >= maximumTowerLevel){
        disableButton(upgradeButton,"dimgrey");
        upgradeButton.innerHTML = `Max Upgrades`;
    }else{
        upgradeButton.innerHTML = `Upgrade Tower (-${targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)})`;
    };
    function timeFormat(target){
        if(target <= 0){
            return 0;
        }else{return target};
    };
    upgradeTimeOnField.innerHTML= `Time Left: ${timeFormat((404-targetUpgradeTower.timeOnField)/10)}s`;

    if(targetUpgradeTower.timeOnField == 0 || currentCash < towerCost/2){
        disableButton(unlockButton,"dimgrey");
    }else{
        enableButton(unlockButton,"darkgreen");
    };
};

function roundsControl(){
    currentRound++;
    round.innerHTML = `ROUND:${currentRound}`;
    disableButton(startButton,"red");
    selectionPhase = false;
    backToTowerCreation();
    cashControl();
    start();
    speed = power = null;
    currentPower = currentSpeed = defaultRemainingPoints;
    hold = false;
};

function cancelPlacement(){
    hold = false;
    speed = null;
    power = null;
    enableButton(upPowerButton);
    enableButton(upSpeedButton);
    enableButton(downPowerButton);
    enableButton(downSpeedButton);
    disableButton(cancelButton,"dimgrey");
    enableButton(buyButton,"darkgreen");
};

function buyTower(){
    if((speed == null || power == null) && selectionPhase == true  && hold == false){
        speed = currentSpeed;
        power = currentPower;
        hold = true;
        checkIfOverMaxSkill();
        cashControl();
        disableButton(upPowerButton);
        disableButton(upSpeedButton);
        disableButton(downPowerButton);
        disableButton(downSpeedButton);
        disableButton(buyButton,"dimgrey");
        enableButton(cancelButton, "red");
    };
};

function resetFunction(){
    currentLives = startingLives;
    currentCash = startingCash;
    currentRound = 0;

    lives.innerHTML = `LIVES:${currentLives}`;
    cash.innerHTML = `CASH:${currentCash}`;
    round.innerHTML = `ROUND:${currentRound}`;
    currentSpeed = currentPower = defaultRemainingPoints;
    remainingSkillPoints = maxSkillPoints - currentPower - currentSpeed + 1;
    
    powerBar.style.width = speedBar.style.width = `${barChange*defaultRemainingPoints}px`;
    remainingPoints.innerHTML = remainingSkillPoints;
    buyButton.innerHTML = `BUY<br>(-${towerCost} CASH)<br><br>(P:${currentPower} S:${currentSpeed})`;
    
    enableButton(startButton,"darkgreen");
    enableButton(buyButton,"darkgreen");

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
    buyButton.innerHTML = `BUY<br>(-${towerCost} CASH)<br><br>(P:${currentPower} S:${currentSpeed})`;
    
    if(((currentPower + currentSpeed) >= maxSkillPoints+1)){
        disableButton(upPowerButton,"");
        disableButton(upSpeedButton,"");
    }else if(((currentPower + currentSpeed) < maxSkillPoints+1)){
        enableButton(upPowerButton,"");
        enableButton(upSpeedButton,"");
    };
    
    remainingSkillPoints = (maxSkillPoints+1)-(currentSpeed+currentPower);
    remainingPoints.innerHTML = remainingSkillPoints;
};