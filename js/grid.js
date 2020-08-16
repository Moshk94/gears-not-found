let startCell;
let endCell;
let startPoint;
let endPoint
let endCord = []
let startCord = []
let path;
function createGrid(){
    grid = document.createElement("div");
    grid.setAttribute("id", "game-map");

    gridContainer.appendChild(grid)
    grid.style.width = `${worldSizeProps.grid.col * worldSizeProps.pixelSize}px`;
    grid.style.height = `${worldSizeProps.grid.rows * worldSizeProps.pixelSize}px`;

    let worldArrayIndex = 0;
    for (let y = 0; y < worldSizeProps.grid.col; y++) {
        worldArray.push([]);
        for (let x = 0; x < worldSizeProps.grid.rows; x++) {
            let div = document.createElement("div");
            div.classList.add("game-tile");
            div.setAttribute("id",  x + "-" + y);
            div.setAttribute("onclick", " placeTower(this)");
            grid.appendChild(div);
            worldArray[worldArrayIndex].push(0);
        };
        worldArrayIndex++;
    };
    gridContainer.style.top = "45%"
    startPoint = randomInt(worldSizeProps.grid.rows-1);
    endPoint = randomInt(filter(startPoint-1),filter(startPoint+1));
    startCell = document.getElementById(`0-${startPoint}`);
    endCell = document.getElementById(`${worldSizeProps.grid.col-1}-${endPoint}`);
    startCord[0] = startPoint, startCord[1] = 0
    endCord[0] = endPoint, endCord[1] = worldSizeProps.grid.col-1;
    path = (pathFind(worldArray,startCord,endCord))
    showPath()
}

function confgureCell(targetCell){
    targetCell.removeAttribute("onclick")
    targetCell.style.backgroundColor = "darkorange";
    targetCell.style.cursor = "not-allowed"
    targetCell.setAttribute("class", "game-tile");
};

function filter(input){
    if(input < 0){
        return 0;
    }else if(input > worldSizeProps.grid.rows-1){
        return worldSizeProps.grid.rows-1;
    }else{
        return input;
    }
};
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
function showPath(){
    let tst = document.getElementsByClassName("game-tile")
    pathArray = clone(worldArray)
    for(let k=0; k<tst.length; k++){
        tst[k].setAttribute("class", "game-tile");
    }

    for(let i=1; i < path.length; i++){
        let targetPath = document.getElementById(`${path[i][1]}-${path[i][0]}`);
        targetPath.setAttribute("class", "game-tile path")
        pathArray[path[i][0]][path[i][1]] = 2
    }
    confgureCell(startCell);
    confgureCell(endCell);
}