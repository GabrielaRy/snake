const grid = document.querySelector('.grid');
const btnStart = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
const squares = [];
let currentSnake=[2,1,0]
let direction = 1;
let width = 20;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let timerId = 0;

function makeGrid() {
    for(let i=0; i<width * width; i++){
        let square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
    console.log(grid)
    console.log(squares)
}

makeGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove apple
    squares[appleIndex].classList.remove('apple')

    //reset everything else
    clearInterval(timerId)

    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    score = 0
    scoreDisplay.textContent = score

    direction=1
    intervalTime = 1000
    generateApple()
    timerId = setInterval(move, intervalTime)
}

//correct this function to work on different grid size!!
function move() {
    if(
        (currentSnake[0] - width < 0 && direction === -10)   ||   //if snake has hit top
        (currentSnake[0] % width === 9 && direction === 1) ||   //hit right
        (currentSnake[0] + width >= 100 && direction === 10) ||    //hit bottom
        (currentSnake[0] % width === 0 && direction === -1) ||    //left
        squares[currentSnake[0] + direction].classList.contains('snake') //eat tail
        )    
    return clearInterval(timerId)

     //remove last element from our currentSnake array
    let tail = currentSnake.pop()

    //remove styling from last element
    squares[tail].classList.remove('snake')

    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    //snake eats apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()

        score++
        scoreDisplay.textContent = score

        //make snake faster
        clearInterval(timerId)
        intervalTime = intervalTime * 0.9
        timerId = setInterval(move, intervalTime)

    }

    //add class
    squares[currentSnake[0]].classList.add('snake');
}

//dont forget to invoke function!!


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 40) {
        direction = +width
    }
}
document.addEventListener('keyup', control)
btnStart.addEventListener('click', startGame)