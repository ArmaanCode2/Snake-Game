// game Constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

//getting div elements
const scoreElem = document.querySelector("#score");
const highscoreBox = document.querySelector("#highscoreBox");
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 10};

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function setScore(val){
    score = val;
    scoreElem.innerHTML = "Score: " + val;
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if you bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
        
}

function gameEngine(){
    //Part 1: updating the snake variable
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};

        alert("Game Over. Press any key to play again");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        setScore(0);
    }

    //if you have eaten the food increment the score and regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        setScore(score += 1);
        speed += 0.2;
        if(score > highscoreval){
            highscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(highscoreval));
        highscoreBox.innerHTML = `High Score: ${highscoreval}`;
        }
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: render the snake and food
    //displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    //displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

























//main logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    let highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = `High Score: ${highscore}`;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x: 0, y: 1}//starting the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "s":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "a":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "d":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});