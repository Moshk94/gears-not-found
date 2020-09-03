function createTower(towerSpeed, towerPower,towerCostHistory, arrLoc){
        towerArray.push(new Tower(towerID, towerPower,towerSpeed,towerCostHistory, arrLoc));
        shotArray.push(new Shots(towerID));
};

function placeTower(target){
    if(target.childNodes.length == 0){
        if(hold == true && selectionPhase == true){
            cashControl(-towerCost);
            let newTower = document.createElement("div");
            target.appendChild(newTower);
            newTower.setAttribute("class", "towers");
            newTower.setAttribute("id", `tower${towerID}`);
            let xloc = parseInt(target.id.slice());
            let yloc = parseInt(target.id.substring(2));
            let loc = [yloc,xloc];
            worldArray[yloc][xloc] = 1;
            createTower(speed,power,towerCost,loc);
            let onPath = path.some(a => loc.every((v, i) => v === a[i]));
            let towerInfo = document.createElement("div");
            target.appendChild(towerInfo);
            towerInfo.setAttribute("class", "towerTimer");
            towerInfo.setAttribute("id", `tower-${towerID}-timer`);

            if(onPath){path = (pathFind(worldArray,startCord,endCord));showPath();};
            
            towerID++;
            speed = power = null;
            currentPower = currentSpeed = defaultRemainingPoints;
            checkIfOverMaxSkill();
            hold = !hold;
            enableButton(upPowerButton);
            enableButton(upSpeedButton);
            enableButton(downPowerButton);
            enableButton(downSpeedButton);
            disableButton(cancelButton,"dimgrey");
        };
    }else{
        let targetTower = parseInt(target.childNodes[0].id.substring(5));
        targetUpgradeTower = towerArray[towerArray.findIndex(x => x.id == targetTower)];
        if(selectionPhase == true){
            if(targetUpgradeTower != null){document.getElementById(`${targetUpgradeTower.worldLoc[1]}-${targetUpgradeTower.worldLoc[0]}`).setAttribute("class", "game-tile");};
            target.setAttribute("class", "game-tile selected");
            upgradeScreen.style.bottom = "0px";
            upgradeScreenChange();
        }else{
            if(target.childNodes.length > 0 && targetUpgradeTower.timeOnField > 0 && (currentCash >= -towerCost/2)){
                targetUpgradeTower.timeOnField = 0;
                cashControl(-towerCost/2);
            };
        };
    };
};