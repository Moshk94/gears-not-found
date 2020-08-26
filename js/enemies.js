function createEnemy(){
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemies");
    enemy.setAttribute("id", `enemy-${enemyID}`);
    enemy.style.left = "0px";
    let startingCord = startCord[0]*worldSizeProps.pixelSize;
    enemy.style.top = `${startingCord}px`;
    let enemyText = document.createElement("p");
    enemyText.setAttribute("id", `enemy-${enemyID}-text`);
    enemy.appendChild(enemyText);
    let setSpeed = randomInt(1,4);
    let enemyHealth = genEnemyHP(setSpeed);
    enemyText.innerHTML = `${enemyHealth}`;
    grid.appendChild(enemy);
    enemyArray.push(new Enemy(enemyHealth,enemyID, setSpeed, startingCord));  
    enemyID++;
};

function genEnemyHP(currentSpeed){
    
    switch(currentSpeed) {
        case 1:
            return maxRoundEnemies*10;
        case 2:
            return maxRoundEnemies*2;
        case 3:
            return maxRoundEnemies;
        case 4:
            return maxRoundEnemies - Math.floor(maxRoundEnemies/2);
      };
};