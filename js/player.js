class Player {
    constructor(gameScreen, gameSize, cellWidth) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.frameCounter = 0

        this.playerSize = {
            r: (cellWidth) * 1 / 4,
        }

        this.cellWidth = cellWidth

        this.playerPos = {
            left: cellWidth + 2,
            top: cellWidth + 2,

        }
        this.playerVel = 'stopped'

        this.keys = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            up: 'ArrowUp',
            down: 'ArrowDown'
        }

        this.playerSprite = {
            backgroundPositionX: 0,
            totalFrames: 2,
            currentFrame: 0,
            spriteWidth: 35,
        }
        this.init()

    }

    init() {

        this.playerElement = document.createElement('div')
        this.playerElement.style.position = "absolute"
        this.playerElement.style.width = `${this.playerSize.r * 2}px`
        this.playerElement.style.height = `${this.playerSize.r * 2}px`
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`

        //this.playerElement.style.background = "yellow"
        //this.playerElement.style.borderRadius = "50%"

        this.playerElement.style.backgroundImage = 'url(./img/dinoswords.png)'
        this.playerElement.style.backgroundSize = 'cover'
        this.playerElement.style.backgroundPositionX = '0px'
        this.playerElement.style.overflow = 'hidden'
        this.playerElement.style.backgroundRepeat = 'no-repeat'


        this.gameScreen.appendChild(this.playerElement)
    }


    animateSprites() {
        if (this.framesCounter++ % this.playerSprite.framePause == 0) {
            this.playerSprite.currentFrame++
        }
        if (this.playerSprite.currentFrame >= this.playerSprite.totalFrames) {
            this.playerSprite.currentFrame = 0
        }
        this.playerSprite.backgroundPositionX = - this.playerSprite.spriteWidth * this.playerSprite.currentFrame
        this.updateSprite()
    }


    move() {
        this.animateSprites()
        //en el eje x e y
        switch (this.playerVel) {
            case 'right':
                this.playerPos.left += 1
                break
            case 'left':
                this.playerPos.left -= 1
                break
            case 'up':
                this.playerPos.top -= 1
                break
            case 'down':
                this.playerPos.top += 1
                break
        }
        this.updatePosition()

    }

    updateSprite() {
        this.playerElement.style.backgroundPositionX = `${this.playerSprite.backgroundPositionX}px`
    }

    updatePosition() {
        this.playerElement.style.left = `${this.playerPos.left}px`
        this.playerElement.style.top = `${this.playerPos.top}px`
    }

    keyDown(code) {
        switch (code) {
            case this.keys.left:
                this.playerVel = 'left'
                break
            case this.keys.right:
                this.playerVel = 'right'
                break
            case this.keys.up:
                this.playerVel = 'up'
                break
            case this.keys.down:
                this.playerVel = 'down'
                break
        }
    }

    getMapPosition(reference) {
        if (reference === 'left' || reference === 'top') {
            return {
                row: Math.floor(this.playerPos.top / this.cellWidth),
                col: Math.floor(this.playerPos.left / this.cellWidth),
            }
        }


        if (reference === 'right' || reference === 'bottom') {
            return {
                row: Math.floor((this.playerPos.top + this.playerSize.r * 2) / this.cellWidth),
                col: Math.floor((this.playerPos.left + this.playerSize.r * 2) / this.cellWidth),
            }
        }

    }
}

