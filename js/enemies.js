function createEnemy(){
    
    //let enemyHealth = randomInt(currentRound*75,currentRound*100);
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
            return randomInt(currentRound*25,currentRound*30+15);
        case 2:
            return randomInt(currentRound*20,currentRound*25+15);
        case 3:
            return randomInt(currentRound*15,currentRound*20+15);
        case 4:
            return randomInt(currentRound*10,currentRound*15);
        default:
      };
};

