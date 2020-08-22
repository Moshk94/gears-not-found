function createEnemy(){
    let enemyHealth = randomInt(100,100);
    //let enemyHealth = randomInt(currentRound*75,currentRound*100);
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemies");
    enemy.setAttribute("id", `enemy-${enemyID}`);

    enemy.style.left = "0px";
    let startingCord = startCord[0]*worldSizeProps.pixelSize;
    enemy.style.top = `${startingCord}px`;
    let enemyText = document.createElement("p");
    enemyText.setAttribute("id", "enemy-0-text");
    enemy.appendChild(enemyText);

    enemyText.innerHTML = `${enemyHealth}`;
    grid.appendChild(enemy);

    enemyArray.push(new Enemy(enemyHealth,enemyID, 10, startingCord));  
    enemyID++;
};