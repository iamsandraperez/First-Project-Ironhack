class Boundary {
    static width = 40
    static height = 40
    constructor({ position, color, cellWidth }) {
        this.position = position
        this.color = color
        this.cellWidth = cellWidth// se pone aquí también 
    }

}

class Pellet {
    constructor({ position, color, cellWidth }) {
        this.position = position
        this.color = color
        this.cellWidth = 15
        this.pelletSize = {
            r: (cellWidth) * 1 / 4,
        }  //  /2poner detras de cellWidth cambio de valores 




    }
}

const map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-',],
    ['-', '.', '-', '-', '.', '-', '.', '-', '-', '-', '-', '-', '-', '.', '-', '.', '-', '-', '.', '-',],
    ['-', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '-',],
    ['-', '.', '-', '.', '-', '-', '.', '-', '-', ' ', ' ', '-', '-', '.', '-', '-', '.', '-', '.', '-',],
    ['-', '.', '.', '.', '.', '.', '.', '-', ' ', ' ', ' ', ' ', '-', '.', '.', '.', '.', '.', '.', '-',],
    ['-', '.', '-', '.', '-', '-', '.', '-', '-', '-', '-', '-', '-', '.', '-', '-', '.', '-', '.', '-',],
    ['-', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '-',],
    ['-', '.', '-', '-', '.', '-', '.', '-', '-', '-', '-', '-', '-', '.', '-', '.', '-', '-', '.', '-',],
    ['-', '.', '.', '.', '.', '-', '.', '.', '.', '.', '.', '.', '.', '.', '-', '.', '.', '.', '.', '-',],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
]

function createBoundaries(map, cellWidth) { //añado también cellWidth, todos los datos estaban hardcoreados
    const pellets = []
    const boundaries = []
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            switch (symbol) {
                case '-':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: cellWidth * j, // no se hardcorea
                                y: cellWidth * i
                            },
                            color: 'blue',
                            cellWidth,



                        })
                    )
                    break
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: cellWidth * j + cellWidth / 2,// no se hardcorea
                                y: cellWidth * i + cellWidth / 2

                            },
                            color: 'white',

                        })
                    )
                    break
            }
        })
    })
    return { boundaries, pellets }

}



function drawBoundaries(boundaries) {

    boundaries.forEach(boundary => {
        const boundaryElement = document.createElement('div')
        boundaryElement.style.position = 'absolute'
        boundaryElement.style.width = boundary.cellWidth + 'px' //datos no ponemos equivalencia así me han funcionado al final
        boundaryElement.style.height = boundary.cellWidth + 'px'
        boundaryElement.style.backgroundColor = boundary.color
        boundaryElement.style.left = boundary.position.x + 'px'
        boundaryElement.style.top = boundary.position.y + 'px'


        document.body.appendChild(boundaryElement)

    })



}

function createPellets(pellets) {
    pellets.forEach(pellet => {
        const pelletElement = document.createElement('div')
        pelletElement.style.position = 'absolute'
        pelletElement.style.width = pellet.cellWidth + 'px' //datos no ponemos equivalencia así me han funcionado al final
        pelletElement.style.height = pellet.cellWidth + 'px'
        pelletElement.style.backgroundColor = pellet.color
        pelletElement.style.left = pellet.position.x + 'px'
        pelletElement.style.top = pellet.position.y + 'px'
        pelletElement.style.borderRadius = "50%"
        pellet.element = pelletElement

        document.body.appendChild(pelletElement)
    })


}

const pelletsData = createBoundaries(map, 70)
drawBoundaries(pelletsData.boundaries)
createPellets(pelletsData.pellets)























