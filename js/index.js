// game Constants
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

//getting div elements
const scoreElem = document.querySelector("#score");
const highscoreElem = document.querySelector("#highscoreElem");
const musicElem = document.querySelector("#music");

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

let highscore = localStorage.getItem(Object.keys(localStorage));
function gameEngine(){
    //checking for highest score
    if(highscore === null){
        highscore = 0;
    }else{
        highscore = localStorage.getItem(Object.keys(localStorage));
    }

    //Part 1: updating the snake variable
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x: 0, y: 0};

        //asking username when game ends
        if(score > highscore){
            const userName = prompt("Congratulations. You made the highest score. Please enter your name");
            setLocalStorage(userName,score)
        }else{
            alert("Game Over. Press any key to play again");
        }
        snakeArr = [{x: 13, y: 15}];
        setScore(0);
        speed = 5;
        showSpeed(speed)
    }

    //if you have eaten the food increment the score and regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        setScore(score += 1);
        speed += 0.2;
        showSpeed(speed);
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

    showScore();
}

function startMusic(e){
    if(musicElem.checked){
        musicSound.play();
    }else{
        musicSound.pause();
    }
}

function showSpeed(val){
    sp = Math.floor(val);
    document.querySelector(".current-speed").innerHTML = `Current Speed: ${sp}`;
}

//to display the highscore
function showScore(){
    let Ahighscore = localStorage.key(0);
    let AhighscoreValue = localStorage.getItem(Ahighscore);
    if (Ahighscore === null|| AhighscoreValue === null){
        highscoreElem.innerHTML = `No High score`;
    }else{
        highscoreElem.innerHTML = `Highest Score By ${Ahighscore}: ${AhighscoreValue}`;
    }
}





















//main logic starts here
function setLocalStorage(username, score){
    if(score > highscore){
        localStorage.clear();
        localStorage.setItem(username, JSON.stringify(score));
    }else if(highscore === null){
        highscoreElem.innerHTML = `no high score`;
    }
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x: 0, y: 1}//starting the game
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