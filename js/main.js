"use strict"

let grid, x1, y1, mouseX, mouseY, documentBody;

const worldSizeProps = {
    pixelSize: 50,
    grid: {
        rows: 12,
        col: 12,
    }
};

function randomInt(min,max){
    if(isNaN(max)){
        return Math.floor(Math.random() * Math.floor(min+1));
    }else{
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
};