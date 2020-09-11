function step() {
    if(currentLives <= 0){
        headerComponent.style.top = "-35px";
        footerComponent.style.bottom = "-125px";
        gameOverScreen();
        const elements = document.getElementsByClassName("shots");
        while (elements.length > 0) elements[0].remove();
        enemyArray = [];
        shotArray = [];
        pathArray = [];
        worldArray = [];
        grid.remove();
        stepTime = 0;
        finalRound.innerHTML = `You made it to round${" "}${currentRound}!`;
        if(currentRound > localStorage.getItem("GNFhiScore")){
            hiScore.style.visibility = "visible";
            localStorage.setItem('GNFhiScore', currentRound);
        }else{ hiScore.style.visibility = "hidden";};
        start();
    };


    stepTime++;
    if(stepTime%60 == 0){
        time++;
        if(currentRound%10 != 0 && (createdEnemies < maxRoundEnemies)){
            createEnemy(false);
        }else if(currentRound%10 == 0 && (createdEnemies < 1)){
            createEnemy(true);
        };
        createdEnemies++;
    };

    cashControl();

    if(currentRound%10 != 0 ){
        if(removedEnemies >= maxRoundEnemies){
            endRoundFunction();
        };
    }else if(removedEnemies >= 1){
        endRoundFunction();
    };
    
    
    for(let j = 0; j < towerArray.length; j++){
        let shot;
        let targetTower = document.getElementById(`tower${towerArray[j].id}`);
        if(targetTower == null){continue};
        let towerTimer = document.getElementById(`tower-${towerArray[j].id}-timer`);
        let towerCentreY = targetTower.getBoundingClientRect().y + targetTower.getBoundingClientRect().height/2;
        let towerCentreX = targetTower.getBoundingClientRect().x + targetTower.getBoundingClientRect().width/2;

        if(stepTime%6 == 0 && currentRound%10 != 0){
            
            if(towerArray[j].upgradeLevel < 4 && towerArray[j].timeOnField < 404){
                towerArray[j].timeOnField++;
                towerTimer.style.width = `${48*((404-towerArray[j].timeOnField)/404)}px`;
            }else if(towerArray[j].upgradeLevel >= 4 && towerArray[j].timeOnField < 4040){
                towerArray[j].timeOnField++;
                towerTimer.style.width = `${48*((4040-towerArray[j].timeOnField)/4040)}px`
            };
        };

        if(towerArray[j].upgradeLevel < 4){
            if(towerArray[j].timeOnField < 404){
                towerArray[j].angle = coordinateAngle(mouseY, towerCentreY, mouseX, towerCentreX);
                targetTower.style.transform  = `rotate(${towerArray[j].angle}deg)`;
                targetTower.style.transformOrigin  = `center center`;
            };
        }else if(towerArray[j].upgradeLevel >= 4){
            if(towerArray[j].timeOnField < 4040){
                towerArray[j].angle = coordinateAngle(mouseY, towerCentreY, mouseX, towerCentreX);
                targetTower.style.transform  = `rotate(${towerArray[j].angle}deg)`;
                targetTower.style.transformOrigin  = `center center`;
            }; 
        };
        
        
        towerArray[j].xTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerArray[j].angle, 25)[0]; 
        towerArray[j].yTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerArray[j].angle, 25)[1];
        
        
        if(stepTime/60 == 1){
            shot = document.createElement("div");
            shot.setAttribute("id", `shot${shotArray[j].id}`);
            shot.setAttribute("class", "shots");
            document.body.appendChild(shot);
        };
        shotArray[j].timeAlive++;
        shot = document.getElementById(`shot${shotArray[j].id}`);
        if(shot == null || (shotArray[j].timeAlive < 5)){continue};
        
        if((shotArray[j].dx && shotArray[j].dy) == 0){
            let angleRad = degreesToRadians(towerArray[j].angle);
            shotArray[j].dx = towerArray[j].speed * Math.cos(angleRad);
            shotArray[j].dy = towerArray[j].speed * Math.sin(angleRad);
        };

        shotArray[j].x = shot.getBoundingClientRect().x + shotArray[j].dx;
        shotArray[j].y = shot.getBoundingClientRect().y + shotArray[j].dy;

        shot.style.left = `${shotArray[j].x}px`;
        shot.style.top = `${shotArray[j].y}px`;
        
        
        if(outOfRange(shot.getBoundingClientRect().x, grid.getBoundingClientRect().width + grid.getBoundingClientRect().x - shot.getBoundingClientRect().width , grid.getBoundingClientRect().x) || outOfRange(shot.getBoundingClientRect().y, grid.getBoundingClientRect().height + grid.getBoundingClientRect().y - shot.getBoundingClientRect().height, grid.getBoundingClientRect().y)){
            shotRespawn(shot, targetTower,towerArray[j]);
            shotArray[j].dx = shotArray[j].dy = 0;
        };
        
        let shotRelPosX = (shotArray[j].x - grid.getBoundingClientRect().x);
        let shotRelPosY = (shotArray[j].y - grid.getBoundingClientRect().y);

        for(let i = 0; i < enemyArray.length; i++){
            if(shotRelPosX > enemyArray[i].x && (shotRelPosX < (enemyArray[i].x + enemyDimensions))){
                if(shotRelPosY > enemyArray[i].y && (shotRelPosY < (enemyArray[i].y + enemyDimensions))){
                    shotArray[j].dx = shotArray[j].dy = 0;
                    shotRespawn(shot, targetTower,towerArray[j]);
                    shotArray[j].timeAlive = 0;

                    enemyArray[i].health -= towerArray[j].power;
                    let targetEnemy = document.getElementById(`enemy-${enemyArray[i].id}`);
                    let targetEnemyHealth = document.getElementById(`enemy-${enemyArray[i].id}-text`);
                    if(targetEnemy == null || targetEnemyHealth == null){continue};
                    targetEnemyHealth.innerHTML = enemyArray[i].health;
                    if(enemyArray[i].health <= 0){
                        if(currentRound%10 != 0){
                            cashControl(Math.ceil(enemyArray[i].maxHealth/10));
                            pop(enemyArray[i].x + grid.getBoundingClientRect().x,enemyArray[i].y + grid.getBoundingClientRect().y,50);
                        }else{endOfbonus();
                            pop(enemyArray[i].x + grid.getBoundingClientRect().x,enemyArray[i].y + grid.getBoundingClientRect().y,50,"g");};
                        
                        targetEnemy.remove();
                        removedEnemies++;
                        enemyArray.splice(i, 1);
                    };
                };
            };
        };
    };

    for(let k = 0; k < enemyArray.length; k++){
        let targetEnemy;
        if(enemyArray[k] != undefined){
            targetEnemy = document.getElementById(`enemy-${enemyArray[k].id}`);
            if(targetEnemy == null){continue};
        }else{continue};


        if(enemyArray[k].ypos-1 >= 0){
            if(Array.isArray(pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos])){
                if(!pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos].includes((enemyArray[k].id))){
                    enemyArray[k].dx = 0;
                    enemyArray[k].dy = enemyArray[k].speed*-1;
                    enemyArray[k].ypos = Math.floor((enemyArray[k].y + enemyDimensions)/worldSizeProps.pixelSize);
                    if(enemyArray[k].ypos+1 < pathArray.length && Array.isArray(pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos])){
                        let lastCell = pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos];
                        pushAndDelete(lastCell, enemyArray[k].id);
                    };
                };
            };
        };
        
        if(enemyArray[k].ypos+1 < pathArray.length){
            if(Array.isArray(pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos])){
                if(!pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos].includes((enemyArray[k].id))){
                    enemyArray[k].dx = 0;
                    enemyArray[k].dy = enemyArray[k].speed;
                    enemyArray[k].ypos = Math.floor((enemyArray[k].y - enemyDimensions/10)/worldSizeProps.pixelSize);
                    if(enemyArray[k].ypos-1 >= 0 && Array.isArray(pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos])){
                        let lastCell = pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos];
                        pushAndDelete(lastCell, enemyArray[k].id);
                    };
                };
            };
        };
        
        if(enemyArray[k].xpos-1 >=0){
            if(Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1])){
                if(!pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1].includes((enemyArray[k].id))){
                    enemyArray[k].dx = enemyArray[k].speed*-1;
                    enemyArray[k].dy = 0;
                    enemyArray[k].xpos = Math.floor((enemyArray[k].x + enemyDimensions)/worldSizeProps.pixelSize);
                    if(enemyArray[k].xpos+1 < pathArray[0].length && Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1])){
                        let lastCell = pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1];
                        pushAndDelete(lastCell, enemyArray[k].id);
                    };
                };
            };
        };
        
        if(enemyArray[k].xpos+1 < pathArray[0].length){
            if(Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1])){
                if(!pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1].includes((enemyArray[k].id))){
                    enemyArray[k].dx = enemyArray[k].speed;
                    enemyArray[k].dy = 0;
                    enemyArray[k].xpos = Math.floor((enemyArray[k].x)/worldSizeProps.pixelSize);
                    if(enemyArray[k].xpos-1 >=0 && Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1])){
                        let lastCell = pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1];
                        pushAndDelete(lastCell, enemyArray[k].id);
                    };
                };
            };
        };

        enemyArray[k].y += enemyArray[k].dy;
        enemyArray[k].x += enemyArray[k].dx;
        
        targetEnemy.style.left = `${enemyArray[k].x}px`;
        targetEnemy.style.top = `${enemyArray[k].y}px`;
        
        if(enemyArray[k].xpos == path[path.length-1][1] && enemyArray[k].ypos == path[path.length-1][0]){
            if(currentRound%10 != 0){
                lifeControl(Math.ceil(enemyArray[k].health/2));
                pop(targetEnemy.getBoundingClientRect().x,targetEnemy.getBoundingClientRect().y,50);
            }else{endOfbonus();pop(enemyArray[0].x + grid.getBoundingClientRect().x,enemyArray[0].y + grid.getBoundingClientRect().y,50,"g");};
            targetEnemy.remove();
            removedEnemies++;      
        };     
    };
    running ? window.requestAnimationFrame(step): window.cancelAnimationFrame(step);
};

function start(){
    if(running){
        window.cancelAnimationFrame(step);
        for(let i = 0; i<shotArray.length; i++){
            shotArray[i].dx = shotArray[i].dy = 0;
            let targetShot = document.getElementById(`shot${shotArray[i].id}`);
            if(targetShot == null){break};
            targetShot.remove();
        };
    }else{window.requestAnimationFrame(step)};
    running = !running;
};

function shotRespawn(target, targetParent, id){
    if(id.status == "alive"){
        target.style.left = `${targetParent.getBoundingClientRect().x - target.getBoundingClientRect().width/2 + id.xTip}px`;
        target.style.top = `${targetParent.getBoundingClientRect().y - target.getBoundingClientRect().width/2 + id.yTip}px`;
    };
};

function deleteTower(loc){
    if(loc.findIndex(x => x.class == "Towers") != -1){
        let targetTower = loc.findIndex(x => x.class == "Towers");
        let towerIDs = loc[targetTower].id;
        loc[targetTower].status = "dead";
        let xTowerLoc = (worldSizeProps.pixelSize*loc[targetTower].worldLoc[1]);
        let yTowerLoc = (worldSizeProps.pixelSize*loc[targetTower].worldLoc[0]);
        document.getElementById(`tower${towerIDs}`).remove();
        document.getElementById(`shot${towerIDs}`).remove();
        document.getElementById(`tower-${towerIDs}-timer`).remove();
        pop(grid.getBoundingClientRect().x + xTowerLoc+25,grid.getBoundingClientRect().y + yTowerLoc+25,0);
        loc.splice(targetTower,1);
    };
};

function angleCoordinates(angle, distace){
    let xx = Math.ceil(distace * Math.cos(degreesToRadians(angle))); 
    let yy = Math.ceil(distace * Math.sin(degreesToRadians(angle)));
    return [xx, yy];
};

function coordinateAngle(y2, y1, x2, x1){
    let my = (y2-y1);
    let mx = (x2-x1);
    let phi = (Math.atan2(my,mx) * (180/Math.PI));
    if(phi < 0){
        return phi+360;
    }else{
        return phi;
    };  
};

function endRoundFunction(){
    enableButton(startButton);
    selectionPhase = true;
    enemyID = 0;
    enemyCreationCount = 0;
    enemyArray = [];
    removedEnemies = 0;
    createdEnemies = 0;
    stepTime = 0;
    for(let i = 0; i <towerArray.length; i++){
        if(towerArray[i].status != "alive"){
            worldArray[towerArray[i].worldLoc[0]][towerArray[i].worldLoc[1]] = 0;
            towerArray.splice(i,1);
            shotArray.splice(i,1);
        };
    };
    showPath();
    start();
    maxRoundEnemiesTemp *= 1.1;
    maxRoundEnemies = Math.floor(maxRoundEnemiesTemp);
    cashControl(Math.ceil(towerCost/5)+Math.floor(currentRound/2));
};

function endOfbonus(){
    let proportionalHealth = (1-(enemyArray[0].health/enemyArray[0].maxHealth))
    cashControl(Math.ceil((270*proportionalHealth) - Math.ceil(towerCost/5)+Math.floor(currentRound/2) + 10))
    lifeControl(Math.ceil((200*proportionalHealth)*-1));
};

function pushAndDelete(cell,id){
    cell.push(id);
    deleteTower(cell);
};