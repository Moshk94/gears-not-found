const towerCost = 10;
const startingCash = towerCost*5;
const startingLives = 200;
const maxSkillPoints = 5;
const defaultRemainingPoints = Math.floor(maxSkillPoints/2)-Math.floor(maxSkillPoints/10);
let inGame = false;

let currentPower, currentSpeed, remainingSkillPoints;

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
        selectionSound.play();
    };
};

function gotoMainMenu(){
    gameOverContainer.style.opacity = "0";
    gameOverContainer.style.pointerEvents = "none";
    menuComponent.style.top = "20%";
    helpContainer.style.top = "65%";
    selectionSound.play();
};

function backToTowerCreation(){
    upgradeScreen.style.bottom = "-125px";
    document.getElementById(`${targetUpgradeTower.worldLoc[1]}-${targetUpgradeTower.worldLoc[0]}`).setAttribute("class", "game-tile");
    targetUpgradeTower = null;
    selectionSound.play();
};

function gameOverScreen(){
    gameOverContainer.style.pointerEvents = "auto";
    gameOverContainer.style.opacity = "1";
    gridContainer.style.top = "145%";
    inGame = !inGame;
};

function setSpeed(caller){
    if(caller.innerHTML == "+" && currentSpeed < maxSkillPoints){
        upgradeSound.play();
        currentSpeed++;
    }else if(caller.innerHTML == "-" && currentSpeed > 1){
        currentSpeed--;
        downgradeSound.play();
    };
    checkIfOverMaxSkill();
};

function upgradeTower(){
    if(targetUpgradeTower.upgradeLevel < maximumTowerLevel){
        upgradeSound.play();
        let cost = targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10);
        cashControl(-cost);
    
        if(targetUpgradeTower.power == targetUpgradeTower.speed){
            targetUpgradeTower.power += 1;
            targetUpgradeTower.speed += 1;
        }else if(targetUpgradeTower.power > targetUpgradeTower.speed){
            targetUpgradeTower.power += 1;
            if(targetUpgradeTower.upgradeLevel == 3){targetUpgradeTower.speed += 2;};
        }else if(targetUpgradeTower.power < targetUpgradeTower.speed){
            targetUpgradeTower.speed += 1;
            if(targetUpgradeTower.upgradeLevel == 3){targetUpgradeTower.power += 2;};
        };
        
        if(targetUpgradeTower.upgradeLevel == 3){
            let towerTimer = document.getElementById(`tower-${targetUpgradeTower.id}-timer`);
            targetUpgradeTower.timeOnField = 0;
            upgradeTimeOnField.innerHTML = `Time left:${" "}${(4040-targetUpgradeTower.timeOnField)/10}s`;
            towerTimer.style.width = "48px";
        };

        targetUpgradeTower.upgradeLevel++;
    
        upgradePower.innerHTML = `Power:${" "}${targetUpgradeTower.power}`;
        upgradeSpeed.innerHTML = `Speed:${" "}${targetUpgradeTower.speed}`;
        targetUpgradeTower.cost += cost;
        upgradeButton.innerHTML = `Upgrade${" "}Tower${" "}(-${targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)})`;
        sellButton.innerHTML = `Sell Tower${" "}(+${targetUpgradeTower.cost * 0.8})`;
        towerLevel.innerHTML = `Tower Level:${" "}${targetUpgradeTower.upgradeLevel}`;
        if(currentCash < targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)){
            disableButton(upgradeButton);
        };
    };

    if(targetUpgradeTower.upgradeLevel >= maximumTowerLevel){
        upgradeButton.setAttribute("class", "lockedButton");
        disableButton(upgradeButton);
        upgradeButton.innerHTML = `Max Upgrades`;
    }; 
};

function setPower(caller){    
    if(caller.innerHTML == "+" && currentPower < maxSkillPoints){
        upgradeSound.play();
        currentPower++;
    }else if(caller.innerHTML == "-" && currentPower > 1){
        currentPower--;
        downgradeSound.play();
    };
    checkIfOverMaxSkill();
};

function unlockTower(){
    unlockSound.play();
    let towerTimer = document.getElementById(`tower-${targetUpgradeTower.id}-timer`);
    targetUpgradeTower.timeOnField = 0;
    disableButton(unlockButton);
    timeOnFieldChange();
    towerTimer.style.width = "48px";
    cashControl(-towerCost/2);
};

function sellTower(){
    cashControl(targetUpgradeTower.cost * 0.8);
    let pos = towerArray.findIndex(x => x.id == targetUpgradeTower.id);
    let targetTower = document.getElementById(`tower${targetUpgradeTower.id}`);
    let towerTimer = document.getElementById(`tower-${targetUpgradeTower.id}-timer`);
    worldArray[targetUpgradeTower.worldLoc[0]][targetUpgradeTower.worldLoc[1]] = 0;
    towerTimer.remove();
    targetTower.remove();
    towerArray.splice(pos,1);
    shotArray.splice(pos,1);
    backToTowerCreation();
    cash2Sound.play();
};

function upgradeScreenChange(){
    if(currentCash < targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)){
        disableButton(upgradeButton);
    }else{
        enableButton(upgradeButton);
    };

    sellButton.innerHTML = `Sell Tower${" "}(+${targetUpgradeTower.cost * 0.8})`;
    towerLevel.innerHTML = `Tower Level:${" "}${targetUpgradeTower.upgradeLevel}`;
    upgradePower.innerHTML = `Power:${" "}${targetUpgradeTower.power}`;
    upgradeSpeed.innerHTML = `Speed:${" "}${targetUpgradeTower.speed}`;
   
    unlockButton.innerHTML = `Unlock tower${" "}(-${towerCost/2})`;
    if(targetUpgradeTower.upgradeLevel >= maximumTowerLevel){
        disableButton(upgradeButton);
        upgradeButton.innerHTML = `Max Upgrades`;
    }else{
        upgradeButton.innerHTML = `Upgrade Tower${" "}(-${targetUpgradeTower.cost+(targetUpgradeTower.upgradeLevel*10)})`;
    };
    function timeFormat(target){
        if(target <= 0){
            return 0;
        }else{return target};
    };

    timeOnFieldChange();

    if(targetUpgradeTower.timeOnField == 0 || currentCash < towerCost/2){
        disableButton(unlockButton);
    }else{
        enableButton(unlockButton);
    };
};

function timeOnFieldChange(){
    if(targetUpgradeTower.upgradeLevel < 4){
        upgradeTimeOnField.innerHTML = `Time left:${" "}${(404-targetUpgradeTower.timeOnField)/10}s`;
    }else if(targetUpgradeTower.upgradeLevel >= 4){
        upgradeTimeOnField.innerHTML = `Time left:${" "}${(4040-targetUpgradeTower.timeOnField)/10}s`;
    };
}

function roundsControl(){
    selectionSound.play();
    currentRound++;
    round.innerHTML = `ROUND:${" "}${currentRound}`;
    disableButton(startButton);
    disableButton(cancelButton);
    selectionPhase = false;
    if(targetUpgradeTower != null){backToTowerCreation();};
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
    disableButton(cancelButton);
    enableButton(buyButton,"darkgreen");
    cancelButtonSound.play();
};

function buyTower(){
    if((speed == null || power == null) && selectionPhase == true  && hold == false){
        selectionSound.play();
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
        enableButton(cancelButton);
    };
};

function resetFunction(){
    currentLives = startingLives;
    currentCash = startingCash;
    currentRound = 0;

    lives.innerHTML = `LIVES:${" "}${currentLives}`;
    cash.innerHTML = `CASH:${" "}${currentCash}`;
    round.innerHTML = `ROUND:${" "}${currentRound}`;
    currentSpeed = currentPower = defaultRemainingPoints;
    remainingSkillPoints = maxSkillPoints - currentPower - currentSpeed + 1;
    
    powerBar.style.width = speedBar.style.width = `${barChange*defaultRemainingPoints}px`;
    remainingPoints.innerHTML = remainingSkillPoints;
    buyButton.innerHTML = `BUY<br>(-${towerCost}${" "}CASH)<br><br>(P:${currentPower}${" "}S:${currentSpeed})`;
    enableButton(buyButton,"darkgreen");
    enableButton(startButton);
    enableButton(buyButton);

    towerArray = [];
    shotArray = [];
    enemyArray = [];
    enemyID = 0;
    towerID = 0;
    removedEnemies = 0;
    createdEnemies = 0;
    enemyCreationCount = 0;
    selectionPhase = true;
    maxRoundEnemies = maxRoundEnemiesTemp = 5;
};

function checkIfOverMaxSkill(){
    powerBar.style.width = `${barChange*currentPower}px`;
    speedBar.style.width = `${barChange*currentSpeed}px`;
    buyButton.innerHTML = `BUY<br>(-${towerCost}${" "}CASH)<br><br>(P:${currentPower}${" "}S:${currentSpeed})`;
    
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