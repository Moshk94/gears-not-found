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
            let xloc = parseInt(target.id.slice());
            let yloc = parseInt(target.id.substring(2));
            let loc = [yloc,xloc];
            worldArray[yloc][xloc] = 1;

            let onPath = path.some(a => loc.every((v, i) => v === a[i]));
            
            if(onPath){
                path = (pathFind(worldArray,startCord,endCord));
                showPath();
            };

            towerID++;
            speed = power = null;
            hold = !hold;
        };
    }else{
        let targetTower = parseInt(target.childNodes[0].id.substring(5));
        console.log(targetTower);
    };
};