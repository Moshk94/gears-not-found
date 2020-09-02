function createEnemy(type){
    let setSpeed = randomInt(1,4);;
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemies");
    if(type){enemy.setAttribute("class", "bonus-enemy");setSpeed = 0.5;};
    
    let enemyHealth = genEnemyHP(setSpeed);
    enemy.setAttribute("id", `enemy-${enemyID}`);
    let yCord = startCord[0]*worldSizeProps.pixelSize;
    let xCord = startCord[1]*worldSizeProps.pixelSize;
    let enemyText = document.createElement("p");
    enemyText.setAttribute("id", `enemy-${enemyID}-text`);
    enemy.appendChild(enemyText);
    enemyText.innerHTML = `${enemyHealth}`;
    grid.appendChild(enemy);
    enemyArray.push(new Enemy(enemyHealth,enemyID, setSpeed, yCord,xCord));  
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
        case 0.5:
            return (currentRound/10) * 1000;
      };
};