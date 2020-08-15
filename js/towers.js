let towerID = 0;
let hold = false;

function createTower(towerSpeed, towerPower){
        towerArray.push(new Tower(towerID, towerPower,towerSpeed));
        shotArray.push(new Shots(towerID));
        hold = !hold;
};

function placeTower(target){
    if(target.childNodes.length == 0){
        if(hold){
            let newTower = document.createElement("div");
            target.appendChild(newTower);
            newTower.setAttribute("class", "towers");
            newTower.setAttribute("id", `tower${towerID}`);
            towerID++;
            speed = power = null;
            hold = !hold;
        };
    }else{
        console.log("open upgrade menu")
    };
};