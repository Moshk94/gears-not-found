function step() {
    if(currentLives <= 0){
        headerComponent.style.top = "-35px";
        footerComponent.style.bottom = "-125px";
        gameOverScreen();
        enemyArray = []
        grid.remove();
        start();
    }
    // Tower & Shot movement
    stepTime++
    if(stepTime%60 == 0){
        if(createdEnemies < maxRoundEnemies){
            createEnemy();
            createdEnemies++
        };
    };
    if((currentCash - towerCost) > 0){buyButton.style.backgroundColor = "darkorange"};

    if(removedEnemies == maxRoundEnemies){
        enableButton(startButton);
        if((currentCash - towerCost) < 0){
            disableButton(buyButton);
        }else{
            enableButton(buyButton)
            buyButton.style.backgroundColor = "green";
        };
        selectionPhase = true;
        enemyID = 0;
        enemyCreationCount = 0;
        enemyArray = [];
        removedEnemies = 0;
        createdEnemies = 0;
        showPath();
        start();
    };
    
    for(let j = 0; j < towerArray.length; j++){
        let targetTower = document.getElementById(`tower${towerArray[j].id}`)
        let towerCentreY = targetTower.getBoundingClientRect().y + targetTower.getBoundingClientRect().height/2;
        let towerCentreX = targetTower.getBoundingClientRect().x + targetTower.getBoundingClientRect().width/2;
        let towerAngle = coordinateAngle(mouseY, towerCentreY, mouseX, towerCentreX);
        
        towerArray[j].angle = towerAngle;
        
        targetTower.style.transform  = `rotate(${towerAngle}deg)`;
        targetTower.style.transformOrigin  = `center center`;
        towerArray[j].xTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerAngle, 25)[0]; 
        towerArray[j].yTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerAngle, 25)[1];
        
        
        let shot = document.getElementById(`shot${shotArray[j].id}`);
        if(shot == null){break};

        if((shotArray[j].dx && shotArray[j].dy) == 0){
            let angleRad = degreesToRadians(towerAngle);
            shotArray[j].dx = towerArray[j].speed * Math.cos(angleRad);
            shotArray[j].dy = towerArray[j].speed * Math.sin(angleRad);
        };

        
            shotArray[j].x = shot.getBoundingClientRect().x + shotArray[j].dx
            shotArray[j].y = shot.getBoundingClientRect().y + shotArray[j].dy
            shot.style.left = `${shotArray[j].x}px`
            shot.style.top = `${shotArray[j].y}px`

        if(outOfRange(shot.getBoundingClientRect().x, grid.getBoundingClientRect().width + grid.getBoundingClientRect().x - shot.getBoundingClientRect().width , grid.getBoundingClientRect().x) ||
        outOfRange(shot.getBoundingClientRect().y, grid.getBoundingClientRect().height + grid.getBoundingClientRect().y - shot.getBoundingClientRect().height, grid.getBoundingClientRect().y)){
                shotRespawn(shot, targetTower,towerArray[j]);
                shotArray[j].dx = shotArray[j].dy = 0;
        };
        
        let shotRelPosX = (shotArray[j].x - grid.getBoundingClientRect().x)
        let shotRelPosY = (shotArray[j].y - grid.getBoundingClientRect().y)
        // Collision detection
        for(let i = 0; i < enemyArray.length; i++){
            if(shotRelPosX > enemyArray[i].x && (shotRelPosX < (enemyArray[i].x + enemyDimensions))){
                if(shotRelPosY > enemyArray[i].y && (shotRelPosY < (enemyArray[i].y + enemyDimensions))){
                    
                    shotRespawn(shot, targetTower,towerArray[j]);
                    shotArray[j].dx = shotArray[j].dy = 0;
                    
                    enemyArray[i].health -= towerArray[j].power
                    let targetEnemy = document.getElementById(`enemy-${i}`)
                    if(targetEnemy == null){continue}
                    targetEnemy.childNodes[1].innerHTML = enemyArray[i].health
                    if(enemyArray[i].health <= 0){
                        cashControl(Math.ceil(enemyArray[i].maxHealth/10))
                        pop(targetEnemy.getBoundingClientRect().x,targetEnemy.getBoundingClientRect().y)
                        targetEnemy.remove()
                        removedEnemies++
                    };
                };
            };
        };
    };

    for(let k = 0; k < enemyArray.length; k++){
        let targetEnemy
        if(enemyArray[k] != undefined){
            targetEnemy = document.getElementById(`enemy-${enemyArray[k].id}`);
            if(targetEnemy == null){ continue};
        }else{continue}

        if(!pathArray[enemyArray[k].ypos][enemyArray[k].xpos].includes((enemyArray[k].id))){
            pathArray[enemyArray[k].ypos][enemyArray[k].xpos].push(enemyArray[k].id)
        };
       
        
        //start()
        if(enemyArray[k].ypos-1 >= 0){
            if(Array.isArray(pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos])){
                if(!pathArray[enemyArray[k].ypos-1][enemyArray[k].xpos].includes((enemyArray[k].id))){
                    enemyArray[k].dx = 0
                    enemyArray[k].dy = enemyArray[k].speed*-1
                    enemyArray[k].ypos = Math.floor((enemyArray[k].y + enemyDimensions)/worldSizeProps.pixelSize);
                };
            };
        };
        
        if(enemyArray[k].ypos+1 < pathArray.length){
            if(Array.isArray(pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos])){
                if(!pathArray[enemyArray[k].ypos+1][enemyArray[k].xpos].includes((enemyArray[k].id))){
                    enemyArray[k].dx = 0
                    enemyArray[k].dy = enemyArray[k].speed
                    enemyArray[k].ypos = Math.floor((enemyArray[k].y)/worldSizeProps.pixelSize);
                };
            };
        };
        
        if(enemyArray[k].xpos-1 >=0){
            if(Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1])){
                if(!pathArray[enemyArray[k].ypos][enemyArray[k].xpos-1].includes((enemyArray[k].id))){
                    enemyArray[k].dx = enemyArray[k].speed*-1
                    enemyArray[k].dy = 0
                    enemyArray[k].xpos = Math.floor((enemyArray[k].x + enemyDimensions)/worldSizeProps.pixelSize);
                };
            };
        };
        
        if(enemyArray[k].xpos+1 < pathArray[0].length){
            if(Array.isArray(pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1])){
                if(!pathArray[enemyArray[k].ypos][enemyArray[k].xpos+1].includes((enemyArray[k].id))){
                    enemyArray[k].dx = enemyArray[k].speed
                    enemyArray[k].dy = 0
                    enemyArray[k].xpos = Math.floor((enemyArray[k].x)/worldSizeProps.pixelSize);
                };
            }
        };

        if(enemyArray[k].xpos == path[path.length-1][1] && enemyArray[k].ypos == path[path.length-1][0]){
            enemyArray[k].dx = enemyArray[k].speed
            enemyArray[k].dy = 0
        }

        enemyArray[k].y += enemyArray[k].dy;
        enemyArray[k].x += enemyArray[k].dx;
        
        targetEnemy.style.left = `${enemyArray[k].x}px`
        targetEnemy.style.top = `${enemyArray[k].y}px`
        if((enemyArray[k].x + enemyDimensions )> grid.getBoundingClientRect().width){
            lifeControl(Math.ceil(enemyArray[k].health/2))
            pop(targetEnemy.getBoundingClientRect().x,targetEnemy.getBoundingClientRect().y)
            targetEnemy.remove()
            removedEnemies++
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
    }else{
        for(let i = 0; i<shotArray.length; i++){
            let towerContainer = document.getElementById(`tower${towerArray[i].id}`);
            let newShot = document.createElement("div");
            newShot.setAttribute("id", `shot${shotArray[i].id}`);
            newShot.setAttribute("class", "shots");
            document.body.appendChild(newShot);
            shotRespawn(newShot, towerContainer, towerArray[i]);
        }
        window.requestAnimationFrame(step);
    };
    running = !running;
};

function shotRespawn(target, targetParent, id){
    target.style.left = `${targetParent.getBoundingClientRect().x - target.getBoundingClientRect().width/2 + id.xTip}px`;
    target.style.top = `${targetParent.getBoundingClientRect().y - target.getBoundingClientRect().width/2 + id.yTip}px`;    
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