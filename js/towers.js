const outOfRange = (x,y) => (x < 0 || x > y) ? true : false;
const degreesToRadians = (deg) => deg * Math.PI / 180;

window.onmousemove = (e) => {mouseX = e.clientX,mouseY = e.clientY};


let towerID = 0;
let towerArray = [];
let shotArray = [];
let running = false;
documentBody = document.getElementById("pagebody");

function createTower(target){
    if(target.childNodes.length == 0){
        let newTower = document.createElement("div");
        newTower.setAttribute("class", "towers");
        newTower.setAttribute("id", `tower${towerID}`);
        target.appendChild(newTower);

        towerArray.push(new tower(towerID, 1,3));
        shotArray.push(new shots(towerID));
        towerID++;
    };
};

function step() {
    // Tower movement
    for(let j = 0; j < towerArray.length; j++){
        let targetTower = document.getElementById(`tower${towerArray[j].id}`)
        let towerCentreY = targetTower.getBoundingClientRect().y + targetTower.getBoundingClientRect().height/2;
        let towerCentreX = targetTower.getBoundingClientRect().x + targetTower.getBoundingClientRect().width/2;
        let towerAngle = coordinateAngle(mouseY, towerCentreY, mouseX, towerCentreX);
        
        towerArray[j].angle = towerAngle 
        
        targetTower.style.transform  = `rotate(${towerAngle}deg)`;
        targetTower.style.transformOrigin  = `center center`;
        towerArray[j].xTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerAngle, 25)[0]; 
        towerArray[j].yTip = targetTower.getBoundingClientRect().width/2 + angleCoordinates(towerAngle, 25)[1];
        
        let shot = document.getElementById(`shot${shotArray[j].id}`);
        if(shot == null){break}

        if((shotArray[j].dx && shotArray[j].dy) == 0){
            let angleRad = degreesToRadians(towerAngle);
            shotArray[j].dx = towerArray[j].speed * Math.cos(angleRad);
            shotArray[j].dy = towerArray[j].speed * Math.sin(angleRad);
        };

        shot.style.left = `${shot.getBoundingClientRect().x + shotArray[j].dx}px`
        shot.style.top = `${shot.getBoundingClientRect().y + shotArray[j].dy}px`
        
        if(outOfRange(shot.getBoundingClientRect().x, window.innerWidth) || outOfRange(shot.getBoundingClientRect().y, window.innerHeight)){
            shotRespawn(shot, targetTower,towerArray[j]);
            shotArray[j].dx = shotArray[j].dy = 0;
        };
    
    };
    running ? window.requestAnimationFrame(step): window.cancelAnimationFrame(step);
};

class tower {
    constructor(id, power, speed) {
        this.power = power;
        this.id = id;
        this.speed = speed;
        this.angle = 0;
        this.xTip = 0;
        this.yTip = 0;
    };
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
            documentBody.appendChild(newShot);
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

class shots {
    constructor(id) {
        this.id = id;
        this.dx = 0;
        this.dy = 0;
    };
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