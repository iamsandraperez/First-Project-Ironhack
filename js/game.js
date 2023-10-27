

const game = {
    gameScreen: document.querySelector('#gameScreen'),
    player: undefined,
    enemy: [],
    boundary: undefined,

    ///
    pellets: [],
    /////
    framesCounter: 0,
    // // Iniciamos las funciones a utilizar
    state: 'playing',
    score: 0,


    init() {
        window.addEventListener('resize', () => { // esto reajusta la pantalla
            this.setDimensions()
        })
        this.setDimensions()
        this.createElements()
        this.setEventListener()
        this.start()
    },



    // // aqui vamos a declarar los valores de los metodos 

    setDimensions() {

        this.gameSize = {
            w: window.innerWidth - 100,
            h: window.innerHeight - 100,
        }

        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`

    },




    start() {
        this.createElements()
        this.gameLoop()

    },


    createElements() {
        this.boundaryElement = new Boundary({
            position: { x: 0, y: 0 },
            gameSize: this.gameSize,
        })

        this.pellets = pelletsData.pellets

        this.player = new Player(this.gameScreen, this.gameSize, 70)

        this.enemy = []
        const colors = ['red', 'blue', 'yellow', 'purple']
        const enemyPositions = [
            { left: 575, top: 365 },
            { left: 645, top: 365 },
            { left: 715, top: 365 },
            { left: 785, top: 365 },

        ]
        for (let i = 0; i < 4; i++) {
            const color = colors[i]
            const enemyPos = enemyPositions[i]
            this.enemy.push(new Enemy(this.gameScreen, this.gameSize, 70, color, enemyPos))
        }


    },
    gameLoop() {
        if (this.state == 'playing') {
            this.moveElements()
            this.moveEnemies()
            this.drawElements()
            this.detectCollision()
            this.checkCollisions()
            this.setEventListener()
            this.drawAll()
            this.incrementFrames()

        }
        window.requestAnimationFrame(() => {    // solicita el proximo frame para animacion es mejor que el setInterval, INVESTIGAR
            this.gameLoop()
        })
    },

    incrementFrames() {
        this.frameIndex > 5000 ? this.frameIndex = 0 : this.frameIndex++
    },

    drawAll() {
        this.player.move(this.frameIndex)


    },
    //COLISION CON MONEDAS
    checkCollisions() {
        const scoreEl = document.querySelector('#ScoreEl')
        const playerPos = this.player.getMapPosition('left');

        for (let i = this.pellets.length - 1; i >= 0; i--) {
            const pellet = this.pellets[i];
            const pelletPos = {
                row: Math.floor(pellet.position.y / 70),
                col: Math.floor(pellet.position.x / 70),
            };

            // AQUIIIIIII Comprueba si el jugador ha colisionado con el pellet

            if (playerPos.row === pelletPos.row && playerPos.col === pelletPos.col) {
                // alert('it´s working')
                document.body.removeChild(pellet.element); // Elimina el elemento del pellet del DOM
                this.pellets.splice(i, 1); // Elimina el pellet de la lista de pellets
                this.score++
                scoreEl.textContent = this.score
                console.log('score')
            }

        }
    },

    detectCollision() {


        const playerPos = this.player.playerPos
        const enemyPos = this.enemy.enemyPos

        //colisione con muros

        switch (this.player.playerVel) {
            case 'left': {
                const mapPos = this.player.getMapPosition('left')
                let colCheck = mapPos.col // IZQ
                if (map[mapPos.row][colCheck] == "-") {
                    this.player.playerVel = 'right'
                    // alert('left')
                }
                break
            }
            case 'right': {
                const mapPos = this.player.getMapPosition('right')
                let colCheck = mapPos.col // DCHA
                if (map[mapPos.row][colCheck] == '-') {
                    this.player.playerVel = 'left'
                    // alert('right')
                }
                break
            }
            case 'up': {
                const mapPos = this.player.getMapPosition('top')
                let colCheck = mapPos.col
                if (map[mapPos.row][colCheck] == '-') {

                }
                break
            }
            case 'down': {
                const mapPos = this.player.getMapPosition('bottom')
                let colCheck = mapPos.col      // tener en cuenta la altura 
                if (map[mapPos.row][colCheck] == '-') {
                    this.player.playerVel = 'up'
                    // alert('down')
                }
                break
            }
        }
        // colisiones con fantasmas


        for (const enemy of this.enemy) {
            const dx = this.player.playerPos.left - enemy.enemyPos.left
            const dy = this.player.playerPos.top - enemy.enemyPos.top
            const distance = Math.sqrt(dx * dx + dy * dy)      // distancia entre dos puntos sacada con la raiz cuadrada
            if (distance <= 35) { // la medida de los fantasmas 
                this.state = 'gameOver'
                alert("Game Over")
            }
        }



    },





    moveElements() {
        this.player.move()


    },

    moveEnemies() {
        for (const enemy of this.enemy) {
            enemy.move(this.gameSize)
        }
    },

    drawElements() {
        this.pellets

    },



    setEventListener() {
        document.onkeydown = (event) => {
            const { code } = event
            //const code = event.code  // tambien se puede sacar con un const code = event.code 
            // si no funciona no se la dirección ya esta en la clase player
            this.player.keyDown(code)

        }
    },


    start() {
        this.gameLoop()
    },

}