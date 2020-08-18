class Enemy {
    constructor(health, id, speed,y) {
        this.health = health;
        this.id = id;
        this.speed = speed;
        this.maxHealth = health;
        this.dx = 0;
        this.dy = 0;
        this.x = 0;
        this.y = y;
        this.xpos = 0;
        this.ypos = Math.floor((y + enemyDimensions)/worldSizeProps.pixelSize);
    }
};

class Shots {
    constructor(id) {
        this.id = id;
        this.dx = 0;
        this.dy = 0;
        this.x = 0
        this.y = 0
    };
};

class Tower {
    constructor(id, power, speed, cost) {
        this.power = power;
        this.id = id;
        this.speed = speed;
        this.angle = 0;
        this.xTip = 0;
        this.yTip = 0;
        this.timeOnField = 0;
        this.cost = cost;
    };
};