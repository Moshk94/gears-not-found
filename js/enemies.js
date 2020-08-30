function createEnemy(){
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemies");
    enemy.setAttribute("id", `enemy-${enemyID}`);
    let startingCord = startCord[0]*worldSizeProps.pixelSize;
    let enemyText = document.createElement("p");
    enemyText.setAttribute("id", `enemy-${enemyID}-text`);
    enemy.appendChild(enemyText);
    let setSpeed = 1//randomInt(1,4);
    let enemyHealth = 1//genEnemyHP(setSpeed);
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
            return maxRoundEnemies*3;
        case 3:
            return Math.floor(maxRoundEnemies*1.5);
        case 4:
            return maxRoundEnemies - Math.floor(maxRoundEnemies/2);
      };
};