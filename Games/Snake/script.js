DrawField();

let snakePosition = [[7,6],[7,7],[7,8],[7,9],[7,10]];
console.log(snakePosition);

let preyPosition = [];

let moveDirection = "none";

let score = 0;

drawSnake();

let timeOutId;

// нарисовать поле
function DrawField(){
    let field = document.querySelector(".play_field");
    let i=0;
    while (i<20){
        let line = document.createElement("div");
        line.classList.add("line");
        let j=0;
        while (j<20){
            let wrap = document.createElement("div");
            wrap.classList.add("wrap");
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.line = i;
            cell.dataset.cell = j;
            wrap.appendChild(cell);
            line.appendChild(wrap);
            j++;
        }
        field.appendChild(line);
        i++;
    }
}

// нарисовать змею
function drawSnake() {
    // убираем все цвета
    let snakeBody = document.querySelectorAll(".snake_body");
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.remove("snake_body");
    }
    let snakeHeadRight = document.querySelectorAll(".snake_head_right");
    for (let i = 0; i < snakeHeadRight.length; i++) {
        snakeHeadRight[i].classList.remove("snake_head_right");
    }
    let snakeHeadLeft = document.querySelectorAll(".snake_head_left");
    for (let i = 0; i < snakeHeadLeft.length; i++) {
        snakeHeadLeft[i].classList.remove("snake_head_left");
    }
    let snakeHeadUp = document.querySelectorAll(".snake_head_up");
    for (let i = 0; i < snakeHeadUp.length; i++) {
        snakeHeadUp[i].classList.remove("snake_head_up");
    }
    let snakeHeadDown = document.querySelectorAll(".snake_head_down");
    for (let i = 0; i < snakeHeadDown.length; i++) {
        snakeHeadDown[i].classList.remove("snake_head_down");
    }
    let snakeEnd = document.querySelectorAll(".snake_end");
    for (let i = 0; i < snakeEnd.length; i++) {
        snakeEnd[i].classList.remove("snake_end");
    }

// рисуем змею
    for (let i=0; i<snakePosition.length; i++){
        let line = snakePosition[i][0];
        let cell = snakePosition[i][1];
        if (i===snakePosition.length-1){
            if(moveDirection === "none"){
                document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_head_right");
            }
            else if(moveDirection === "right"){
                document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_head_right");
            }
            else if(moveDirection === "left"){
                document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_head_left");
            }
            else if(moveDirection === "up"){
                document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_head_up");
            }
            else if(moveDirection === "down"){
                document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_head_down");
            }
        }
        else if(i===0){
            document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_end");
        }
        else{
            document.querySelector(`div[data-line="${line}"][data-cell="${cell}"]`).classList.add("snake_body");
        }
    }
}

// убираем всю добычу с поля и ставим добычу
function preyAllocation(){
    let allocatedPrey = document.querySelectorAll(".prey");
    for (let i=0; i<allocatedPrey.length; i++){
        allocatedPrey[i].classList.remove("prey");
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let line = getRandomInt(20);
    let cell = getRandomInt(20);
    let randomCell = document.querySelector(`div[data-line='${line}'][data-cell='${cell}']`);
    if (!randomCell.classList.contains("snake_body") && !randomCell.classList.contains("snake_head") && !randomCell.classList.contains("snake_end")){
        randomCell.classList.add("prey");
        preyPosition = [line, cell];
    }
    else {
        preyAllocation();
    }
}

// старт
let button = document.querySelector(".start");
button.onclick = start;

function start(){
    preyAllocation();
    document.onkeydown = moveDirectionChange;
    move();
    button.style.display = "none";
    document.querySelector(".score").style.display = "block";
}

// меняем направление движения змеи
function moveDirectionChange(event){
    console.log(event);
    if(event.key === "ArrowRight" && moveDirection !== "left"){
        moveDirection = "right";
    }
    else if (event.key === "ArrowLeft" && moveDirection !== "right" && moveDirection!== "none"){
        moveDirection = "left";
    }
    else if(event.key === "ArrowUp" && moveDirection !== "down"){
        moveDirection = "up";
    }
    else if(event.key === "ArrowDown" && moveDirection !== "up"){
        moveDirection = "down";
    }
    else if (moveDirection === "none"){
        return;
    }
}

// двигаем змею
function move(){
    if(moveDirection === "right"){
        moveRight();
    }
    else if(moveDirection === "left"){
        moveLeft();
    }
    else if(moveDirection === "up"){
        moveUp();
    }
    else if(moveDirection === "down"){
        moveDown();
    }
    timeOutId = setTimeout(move, 600);
}

// двигаем змею вправо
function moveRight(){
    let lastElement = snakePosition.length-1;
    if(snakePosition[lastElement][1]+1>19){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }
    if (collision()){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    };

    if(snakePosition[lastElement][0]===preyPosition[0] && snakePosition[lastElement][1]+1 === preyPosition[1]){
        snakePosition.push([snakePosition[lastElement][0],snakePosition[lastElement][1]+1]);
        drawSnake();
        preyAllocation();
        score+=100;
        updateScore();
        return;
    }

    snakePosition.push([snakePosition[lastElement][0],snakePosition[lastElement][1]+1]);
    snakePosition.shift();

    drawSnake();
}

// двигаем змею влево
function moveLeft(){
    let lastElement = snakePosition.length-1;
    if(snakePosition === "none"){
        return;
    }
    if (collision()){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }
    else if(snakePosition[lastElement][1]-1<0){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }

    if(snakePosition[lastElement][0]===preyPosition[0] && snakePosition[lastElement][1]-1 === preyPosition[1]){
        snakePosition.push([snakePosition[lastElement][0],snakePosition[lastElement][1]-1]);
        drawSnake();
        preyAllocation();
        score+=100;
        updateScore();
        return;
    }

    snakePosition.push([snakePosition[lastElement][0],snakePosition[lastElement][1]-1]);
    snakePosition.shift();

    drawSnake();
}

// двигаем змею вверх
function moveUp(){
    let lastElement = snakePosition.length-1;
    if(snakePosition[lastElement][0]-1<0){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }
    if (collision()){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }

    if(snakePosition[lastElement][0]-1===preyPosition[0] && snakePosition[lastElement][1] === preyPosition[1]){
        snakePosition.push([snakePosition[lastElement][0]-1,snakePosition[lastElement][1]]);
        drawSnake();
        preyAllocation();
        score+=100;
        updateScore();
        return;
    }

    snakePosition.push([snakePosition[lastElement][0]-1,snakePosition[lastElement][1]]);
    snakePosition.shift();

    drawSnake();
}

// двигаем змею вниз
function moveDown(){
    let lastElement = snakePosition.length-1;
    if(snakePosition[lastElement][0]+1>19){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }
    if (collision()){
        document.querySelector(".game_over").style.visibility = "visible";
        clearTimeout(timeOutId);
        return;
    }

    if(snakePosition[lastElement][0]+1===preyPosition[0] && snakePosition[lastElement][1] === preyPosition[1]){
        snakePosition.push([snakePosition[lastElement][0]+1,snakePosition[lastElement][1]]);
        drawSnake();
        preyAllocation();
        score+=100;
        updateScore();
        return;
    }

    snakePosition.push([snakePosition[lastElement][0]+1,snakePosition[lastElement][1]]);
    snakePosition.shift();

    drawSnake();
}

// обновляем счет
function updateScore(){
    if (score<1000){
        document.querySelector(".score").innerHTML = "000" + score;
    }
    else if (score < 10000){
        document.querySelector(".score").innerHTML = "00" + score;
    }
    else if (score<100000){
        document.querySelector(".score").innerHTML = "0" + score;
    }
    else if (score > 100000){
        document.querySelector(".score").innerHTML = score;
    }
}

function collision(){
    let lastElement = snakePosition.length-1;
    let headLine = snakePosition[lastElement][0];
    let headCell = snakePosition[lastElement][1];

    for (let i =0; i<lastElement; i++){
        if (snakePosition[i][0]===headLine && snakePosition[i][1]===headCell){
            return true;
        }
    }
}

//выпадающее меню
let button_dropdown = document.querySelector(".dropdown_js");
let dropdownMenu = document.querySelector(".dropdown");
button_dropdown.onmouseover = dropdownMenuShow;
button_dropdown.onmouseleave = dropdownMenuHide;
dropdownMenu.onmouseover = dropdownMenuShow;
dropdownMenu.onmouseleave = dropdownMenuHide;
let timeOutID;

function dropdownMenuShow() {
    document.querySelector(".dropdown").style.visibility = "visible";
    clearTimeout(timeOutID);
}
function dropdownMenuHide(){
    timeOutID = setTimeout(function (){
        document.querySelector(".dropdown").style.visibility = "hidden";
    },15)
}