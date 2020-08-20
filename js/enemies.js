function createEnemy(){
    let enemyHealthFontSize = 4;
    let enemyHealth = randomInt(100,100);
    //let enemyHealth = randomInt(currentRound*75,currentRound*100);
    let towerContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    towerContainer.setAttribute("width", `${enemyDimensions}`);
    towerContainer.setAttribute("height", `${enemyDimensions}`);
    towerContainer.setAttribute("id", `enemy-${enemyID}`);
    towerContainer.setAttribute("class", "enemies");
    towerContainer.style.left = "0px";
    let startingCord = startCord[0]*worldSizeProps.pixelSize;
    towerContainer.style.top = `${startingCord}px`
    grid.appendChild(towerContainer);

    let towerWH = towerContainer.getBoundingClientRect().width;
    let textContainer = document.createElementNS("http://www.w3.org/2000/svg", "text");
    
    textContainer.setAttribute("x", `${(50/100)*towerWH}`);
    textContainer.setAttribute("y", `${(60/100)*towerWH}`);
    textContainer.setAttribute("text-anchor", "middle");
    textContainer.setAttribute("fill", "pink");
    textContainer.setAttribute("font-size", `${towerContainer.getBoundingClientRect().width/enemyHealthFontSize}px`)
    textContainer.innerHTML = `${enemyHealth}`;
    
    let svgPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    svgPolygon.setAttribute("points", `${(50/100)*towerWH},${(0/100)*towerWH}
    ${(11/100)*towerWH},${(19/100)*towerWH}
    ${(1/100)*towerWH},${(61/100)*towerWH}
    ${(28/100)*towerWH},${(95/100)*towerWH}
    ${(72/100)*towerWH},${(95/100)*towerWH}
    ${(99/100)*towerWH},${(61/100)*towerWH}
    ${(89/100)*towerWH},${(19/100)*towerWH}`);
    towerContainer.appendChild(svgPolygon);
    towerContainer.appendChild(textContainer);
    enemyArray.push(new Enemy(enemyHealth,enemyID, 4, startingCord));
    
    enemyID++;
};