class Enemy {
    constructor(health, id, speed,y,x) {
        this.health = health;
        this.id = id;
        this.speed = speed;
        this.maxHealth = health;
        this.dx = 0;
        this.dy = 0;
        this.x = x
        this.y = y+5;
        this.xpos = Math.floor(x/worldSizeProps.pixelSize);
        this.ypos = Math.floor(y/worldSizeProps.pixelSize);
    };
};

class Shots {
    constructor(id) {
        this.id = id;
        this.dx = 0;
        this.dy = 0;
        this.x = 0;
        this.y = 0;
        this.timeAlive = 0;
    };
};

class Tower {
    constructor(id, power, speed, cost, worldLoc) {
        this.power = power;
        this.id = id;
        this.speed = speed;
        this.angle = 0;
        this.xTip = 0;
        this.yTip = 0;
        this.timeOnField = 0;
        this.cost = cost;
        this.worldLoc = worldLoc;
        this.upgradeLevel = 0;
        this.status = "alive";
        this.class = "Towers";
    };
};