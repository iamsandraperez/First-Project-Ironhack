class Enemy {
    constructor(gameScreen, gameSize, cellWidth, color, enemyPos) {
        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.cellWidth = cellWidth;
        this.color = color;
        this.enemyPos = enemyPos;
        this.step = 0;
        this.enemyVel = this.generateRandomDirection();

        this.enemySize = {
            w: 35,
            h: 35,
        };
        this.enemySprite = {
            backgroundPositionX: cellWidth,
            totalFrames: 1,
            currentFrame: 1,
            frameSpeed: 4

        }

        this.init();
    }

    init() {
        this.enemyElement = document.createElement("div");
        this.enemyElement.style.position = "absolute";
        this.enemyElement.style.width = `${this.enemySize.w}px`;
        this.enemyElement.style.height = `${this.enemySize.h}px`;
        // this.enemyElement.style.background = this.color;
        this.enemyElement.style.left = `${this.enemyPos.left}px`;
        this.enemyElement.style.top = `${this.enemyPos.top}px`;

        this.enemyElement.style.backgroundImage = 'url(./img/fantasma.png)'
        this.enemyElement.style.backgroundSize = 'cover'
        this.enemyElement.style.backgroundPositionX = '0px'
        this.enemyElement.style.overflow = 'hidden'
        this.enemyElement.style.backgroundRepeat = 'no-repeat'

        this.gameScreen.appendChild(this.enemyElement);
    }

    move(framesIndex) {
        this.animateSprites(framesIndex)
        this.updatePosition()
    }

    animateSprites(framesIndex) {
        if (framesIndex % this.enemySprite.frameSpeed == 0) {
            this.enemySprite.currentFrame++
        }
        if (this.enemySprite.currentFrame >= this.enemySprite.totalFrames) {
            this.enemySprite.currentFrame = 0
        }
        this.enemySprite.cellWidth = -this.enemySprite.backgroundPositionX * this.enemySprite.currentFrame
        this.updateSprite()
    }

    generateRandomDirection() {
        const directions = ["right", "left", "up", "down"];
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }


    move(gameBoundaries) {
        if (this.step++ > 30) {
            this.step = 0;
            this.enemyVel = this.generateRandomDirection();
        }

        const { left, top } = this.enemyPos;
        const { w, h } = this.enemySize;

        const dx = { right: 8, left: -8, up: 0, down: 0 };
        const dy = { right: 0, left: 0, up: -8, down: 8 };

        this.enemyPos.left = Math.min(Math.max(left + dx[this.enemyVel], 0), gameBoundaries.w - w);
        this.enemyPos.top = Math.min(Math.max(top + dy[this.enemyVel], 0), gameBoundaries.h - h);


        this.updatePosition();
    }

    updateSprite() {
        this.enemyElement.style.backgroundPositionX = `${this.enemySprite.backgroundPositionX}px`
    }

    updatePosition() {
        this.enemyElement.style.left = `${this.enemyPos.left}px`;
        this.enemyElement.style.top = `${this.enemyPos.top}px`;
    }



    getMapPosition(reference) {
        if (true || reference === "left" || reference === "top") {
            return {
                row: Math.floor(this.enemyPos.top / this.cellWidth),
                col: Math.floor(this.enemyPos.left / this.cellWidth),
            };
        }

    }
}
