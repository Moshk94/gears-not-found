"use strict"
/**
 * [0,0] is on the top left of the clonedworld. For the start and end array first value is the Y co-rodinates and the second value is the X co-ordinates;
 * @param {array} world Nested Array - 0 Indicates valid tiles. 
 * @param {array} start 2x1 Array of Co-ordinates.
 * @param {array} end 2x1 Array of Co-ordinates.
 * @return {array} Nested array with co-ordinates to the end path
 */
function pathFind(world, start, end){
    const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
    const randomInt = (max) => Math.floor(Math.random() * Math.floor(max));
    const g = (x,y) => Math.abs(start[0]-y)+Math.abs(start[1]-x)
    const h = (x,y) => Math.abs(end[0]-y)+Math.abs(end[1]-x)
    
    let finalList = [];
    let openList = [];
    let closedList = [];
    let wallList = [];
    let clonedworld = clone(world);
    let currentNode,startNode,finalNode;
    
    class nodes {
        constructor(x,y,p) {
            this.id = `${y}${x}`;
            this.x = x;
            this.y = y;
            this.g = g(x,y);
            this.h = h(x,y);
            this.f = g(x,y) + h(x,y);
            this.parent = p;
        };
    };
    
    currentNode = startNode = new nodes(start[1],start[0])
    finalNode = new nodes(end[1],end[0])
    closedList.push(currentNode);

    var runTime = 0;

    while(currentNode.id != finalNode.id){
        if(runTime >= (clonedworld.length * clonedworld[0].length)){
            var randomWallIndex = randomInt(wallList.length);
            var breakY = wallList[randomWallIndex].y;
            var breakX = wallList[randomWallIndex].x;
            clonedworld[breakY][breakX] = 0;
            openList.push(wallList[randomWallIndex]);
        };

        let parent = `${currentNode.y}${currentNode.x}`;

        if((currentNode.y - 1 >= 0)){
            if(!(closedList.some(obj => obj.id == `${currentNode.y - 1}${currentNode.x}`))){
                let newNode = new nodes(currentNode.x,currentNode.y-1,parent);
                
                if((clonedworld[currentNode.y - 1][currentNode.x] == 0)){
                    openList.push(newNode);
                }else if((clonedworld[currentNode.y - 1][currentNode.x] == 1)){
                    if(!(wallList.some(obj => obj.id == `${currentNode.y - 1}${currentNode.x}`))){
                        wallList.push(newNode);
                    };
                };   
            };
        };

        if((currentNode.y + 1 < clonedworld.length)){
            if(!(closedList.some(obj => obj.id == `${currentNode.y + 1}${currentNode.x}`))){
                let newNode = new nodes(currentNode.x,currentNode.y+1,parent);
                if((clonedworld[currentNode.y + 1][currentNode.x] == 0)){
                    openList.push(newNode);
                }else if((clonedworld[currentNode.y + 1][currentNode.x] == 1)){
                    if(!(wallList.some(obj => obj.id == `${currentNode.y + 1}${currentNode.x}`))){
                        wallList.push(newNode);
                    };
                };
            };
        };

        if((currentNode.x + 1 < clonedworld[0].length)){
            if(!(closedList.some(obj => obj.id == `${currentNode.y}${currentNode.x + 1}`))){
                let newNode = new nodes(currentNode.x + 1,currentNode.y,parent);
                if((clonedworld[currentNode.y][currentNode.x + 1] == 0)){
                    openList.push(newNode)
                }else if((clonedworld[currentNode.y][currentNode.x + 1] == 1)){
                    if(!(wallList.some(obj => obj.id == `${currentNode.y}${currentNode.x + 1}`))){
                        wallList.push(newNode);
                    };
                };
            };
        };

        if((currentNode.x - 1 >= 0)){
            if(!(closedList.some(obj => obj.id == `${currentNode.y}${currentNode.x - 1}`))){
                let newNode = new nodes(currentNode.x - 1,currentNode.y,parent);
                if((clonedworld[currentNode.y][currentNode.x - 1] == 0)){
                    openList.push(newNode);
                }else if((clonedworld[currentNode.y][currentNode.x - 1] == 1)){
                    if(!(wallList.some(obj => obj.id == `${currentNode.y}${currentNode.x - 1}`))){
                        wallList.push(newNode);
                    };
                };
            };
        };

        if(openList.length != 0){
            currentNode = openList[lowestFIndex(openList)]
            closedList.push(openList[lowestFIndex(openList)]);
            openList.splice(lowestFIndex(openList),1);
        }else(runTime++)  
    };

    var pos = closedList.findIndex(x => x.id == finalNode.id);
    var referenceNode = closedList[pos];
    finalList.unshift([referenceNode.y,referenceNode.x])
    while(referenceNode.id != startNode.id){
        pos = closedList.findIndex(x => x.id == referenceNode.parent);
        referenceNode = closedList[pos];
        finalList.unshift([referenceNode.y,referenceNode.x])
    };
    return finalList;

    function lowestFIndex(a) {
        let lowestVal = a.reduce(function(res, obj) {return (obj.f < res.f) ? obj : res});
        let pos = a.map(function(e) { return e.f; }).indexOf(lowestVal.f);
        return pos;
      };
};