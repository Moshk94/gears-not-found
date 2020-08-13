"use strict"
let worldArray = [];

window.onload = function () {
  grid = document.getElementById("game-map");

  grid.style.width = `${worldSizeProps.grid.col * worldSizeProps.pixelSize}px`;
  grid.style.height = `${worldSizeProps.grid.rows * worldSizeProps.pixelSize}px`;

  let worldArrayIndex = 0;
  for (let y = 0; y < worldSizeProps.grid.col; y++) {
    worldArray.push([]);
      for (let x = 0; x < worldSizeProps.grid.rows; x++) {
          let div = document.createElement("div");
          div.classList.add("game-tile");
          div.setAttribute("id",  x + "-" + y);
          div.setAttribute("onclick", "createTower(this)");
          grid.appendChild(div);
          worldArray[worldArrayIndex].push(0);
      };
      worldArrayIndex++;
  };
};