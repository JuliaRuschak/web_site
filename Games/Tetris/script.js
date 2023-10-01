let field_state = [];

let figure = {
    type: "square",
    position: [],
    rotation: "none",
    class: "fig3"
};

let nextFigure = {
    type: "square",
    position: [],
    rotation: "none",
    class: "fig3"
}

let score = 0;
let timeoutID;

console.log(figure);

//старт
let button_start = document.querySelector(".start");
button_start.onclick = start;

function start(){
    replaceStart();
    generateFigure();
    generateFigure();
    timeoutID = setTimeout(moveDown, 300);
    letsMove();
}

// нарисовать поле
function DrawAField(){
    let field = document.querySelector(".play_field");
    for (let i=0;i<20;i++){
        let row = document.createElement("div");
        row.classList.add("row");
        field.appendChild(row);
        for (let j=0;j<10;j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.line = i;
            cell.dataset.cell = j;
            row.appendChild(cell);
        }
    }
}
DrawAField();
iniField();
drawAdditionalField();

// инициализация поля
function iniField(){
    for (let i=0; i<20; i++){
        let line = [];
        for (let j=0; j<10; j++){
            let cell = {
                color: "black",
                free: true
            };
            line.push(cell);
        }
        field_state.push(line);
    }
}

// нарисовать вспомогательное поле
function drawAdditionalField(){
    let additionalField = document.querySelector(".next_figure");
    for (let i=0; i<4; i++){
        let line = document.createElement("div");
        line.classList.add("row");
        additionalField.appendChild(line);
        for (let j=0; j<4; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            line.appendChild(cell);
            cell.dataset.nextFigLine = i;
            cell.dataset.nextFigCell = j;
        }
    }
}

// очистить вспомогательное поле
function clearAdditionalField(){
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++)
            document.querySelector(`div[data-next-fig-line='${i}'][data-next-fig-cell='${j}']`).classList.remove("blue", "light_blue", "yellow", "orange", "red", "violet", "green");
    }
}

//нарисовать фигуру
function drawAFigure(){
    let figureClass = document.querySelectorAll("." + figure.class);
    for (let i=0; i<figureClass.length; i++){
        figureClass[i].classList.remove(figure.class);
    }

    for(let i=0; i<figure.position.length; i++){
        let line = figure.position[i][0];
        let cell = figure.position[i][1];

        let figure_cell = document.querySelector(`div[data-line='${line}'][data-cell='${cell}']`);
        if (figure_cell!=null){
            figure_cell.classList.add(figure.class);
        }
    }
}
// drawAFigure();

//фигуры движутся
function moveDown(){
    let freeze = false;
    for (let i=0; i<figure.position.length;i++){
        if (figure.position[i][0]===19){
            freeze = true;
            break;
        }else if (field_state[figure.position[i][0]+1]===undefined){
            continue;
        }
        else if (field_state[figure.position[i][0]+1][figure.position[i][1]].free===false){
            freeze = true;
            break;
        }
    }
    if (freeze){
        for (let j=0; j<figure.position.length; j++){
            if(figure.position[j][0]<0){
                clearTimeout(timeoutID);
                document.querySelector(".gameOver").style.visibility = "visible";
                return;
            }
        }
        drawAFigure();
        freezeFigure();
        checkLineCompletion();
        generateFigure();
    }else{
        for(let i=0; i<figure.position.length; i++) {
            figure.position[i][0]++;
        }
    }
    drawAFigure();
    timeoutID = setTimeout(moveDown, 300);
}
function moveRight(){
    for (let i=0; i<figure.position.length; i++){
        if (field_state[figure.position[i][0]]===undefined) {
            continue;
        } else if (figure.position[i][1]===9){
            return;
        } else if (field_state[figure.position[i][0]][figure.position[i][1]+1].free===false){
            return;
        }
    }
    for(let i=0; i<figure.position.length; i++) {
        figure.position[i][1]++;
    }
    drawAFigure();
}
function moveLeft(){
    for (let i=0; i<figure.position.length; i++){
        if (field_state[figure.position[i][0]]===undefined){
            continue;
        }else if (figure.position[i][1]===0){
            return;
        }else if (field_state[figure.position[i][0]][figure.position[i][1]-1].free===false){
            return;
        }
    }
    for(let i=0; i<figure.position.length; i++) {
        figure.position[i][1]--;
    }
    drawAFigure();
}


// подвинуть фигуру
function letsMove(){
    document.onkeydown = function (event){
        let key = event.key;
        let keyCode = event.keyCode;
        if (key === "ArrowRight"){
            moveRight();
        } else if (key === "ArrowLeft"){
            moveLeft();
        } else if (keyCode === 32){
            rotate();
            return false;
        }
    }
}

//сгенерировать фигуру
function generateFigure(){
    let num = Math.floor(Math.random() * 7);
    // num = 1;
    clearAdditionalField();
    figure.type=nextFigure.type;
    figure.position=nextFigure.position;
    figure.rotation=nextFigure.rotation;
    figure.class=nextFigure.class;
    if (num === 0) {
        nextFigure = {
            type: "Blue Ricky",
            position: [[0,4], [0,5], [-1,5], [-2,5]],
            rotation: "none",
            class: "fig1"
        };
        document.querySelector(`div[data-next-fig-line="0"][data-next-fig-cell="2"]`).classList.add("blue");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="2"]`).classList.add("blue");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("blue");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("blue");

    } else if (num ===1) {
        nextFigure = {
            type: "Hero",
            position: [[-3,4],[-2,4],[-1,4],[0,4]],
            rotation: "none",
            class: "fig2"
        };
        document.querySelector(`div[data-next-fig-line="0"][data-next-fig-cell="1"]`).classList.add("light_blue");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="1"]`).classList.add("light_blue");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("light_blue");
        document.querySelector(`div[data-next-fig-line="3"][data-next-fig-cell="1"]`).classList.add("light_blue");
    } else if (num === 2) {
        nextFigure = {
            type: "Smashboy",
            position: [[0,4],[0,5],[-1,4],[-1,5]],
            rotation: "none",
            class: "fig3"
        };
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="1"]`).classList.add("yellow");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="2"]`).classList.add("yellow");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("yellow");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("yellow");
    } else if (num === 3){
        nextFigure = {
            type: "Orange Ricky",
            position: [[0,4],[0,5],[-1,4],[-2,4]],
            rotation: "none",
            class: "fig4"
        };
        document.querySelector(`div[data-next-fig-line="0"][data-next-fig-cell="1"]`).classList.add("orange");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="1"]`).classList.add("orange");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("orange");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("orange");
    } else if (num === 4) {
        nextFigure = {
            type: "Cleveland Z",
            position: [[-1,3],[-1,4],[0,4],[0,5]],
            rotation: "none",
            class: "fig5"
        };
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="0"]`).classList.add("red");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="1"]`).classList.add("red");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("red");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("red");
    } else if (num === 5) {
        nextFigure = {
            type: "Teewee",
            position: [[0,3],[0,4],[0,5],[-1,4]],
            rotation: "none",
            class: "fig6"
        };
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="1"]`).classList.add("violet");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="0"]`).classList.add("violet");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("violet");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("violet");
    } else if (num === 6) {
        nextFigure = {
            type: "Rhode Island Z",
            position: [[0,4],[0,5],[-1,5],[-1,6]],
            rotation: "none",
            class: "fig7"
        };
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="2"]`).classList.add("green");
        document.querySelector(`div[data-next-fig-line="1"][data-next-fig-cell="3"]`).classList.add("green");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="1"]`).classList.add("green");
        document.querySelector(`div[data-next-fig-line="2"][data-next-fig-cell="2"]`).classList.add("green");
    }
}

//заморозка
function freezeFigure(){
    for (let i=0; i<figure.position.length; i++){
        let figureLine = figure.position[i][0];
        let figureCell = figure.position[i][1];
        if (field_state[figureLine] === undefined){
            continue;
        }
        field_state[figureLine][figureCell].free = false;
        let frozenCell = document.querySelector(`div[data-line='${figureLine}'][data-cell='${figureCell}']`)
        if (figure.class === "fig1"){
            frozenCell.classList.add("blue");
            field_state[figureLine][figureCell].color = "blue";
        } else if (figure.class === "fig2"){
            frozenCell.classList.add("light_blue");
            field_state[figureLine][figureCell].color = "light_blue";
        } else if (figure.class === "fig3"){
            frozenCell.classList.add("yellow");
            field_state[figureLine][figureCell].color = "yellow";
        } else if (figure.class === "fig4"){
            frozenCell.classList.add("orange");
            field_state[figureLine][figureCell].color = "orange";
        } else if (figure.class === "fig5"){
            frozenCell.classList.add("red");
            field_state[figureLine][figureCell].color = "red";
        } else if (figure.class === "fig6"){
            frozenCell.classList.add("violet");
            field_state[figureLine][figureCell].color = "violet";
        } else if (figure.class === "fig7"){
            frozenCell.classList.add("green");
            field_state[figureLine][figureCell].color = "green";
        }
        frozenCell.classList.remove(figure.class);
    }
}
// проверка на заполненную линию
function checkLineCompletion(){
    for (let i=0; i<field_state.length; i++){
        let lineCompletion = 0;
        for (let j=0; j<=9; j++){
            if (!field_state[i][j].free){
                lineCompletion++;
            }
        }
        if(lineCompletion === 10){
            field_state.splice(i, 1);
            let line = [];
            let x =0;
            while (x<10){
                let cell = {
                    color: "black",
                    free: true
                };
                line.push(cell);
                x++;
            }
            field_state.unshift(line);
            // поменять цвета у клеток на поле
            for (let l=19; l>=0; l--){
                for (let c=0; c<10; c++){
                    let cell = document.querySelector(`div[data-line='${l}'][data-cell='${c}']`);
                    cell.removeAttribute('class');
                    cell.classList.add("cell");
                    let cellClass = field_state[l][c].color;
                    cell.classList.add(cellClass);
                }
            }
            scoreUpdate();
        }
    }
}

// увеличиваем счет
function scoreUpdate(){
    score += 100;
    let scoreField = document.querySelector("span");
    if (score<1000){
        scoreField.innerHTML = "000" + `${score}`;
    }
    else if (score>=1000 && score < 10000){
        scoreField.innerHTML = "00" + `${score}`;
    }
    else if (score>=10000 && score < 100000){
        scoreField.innerHTML = "0" + `${score}`;
    }
    else if (score>=100000){
        scoreField.innerHTML = `${score}`;
    }
}

// заменить старт на паузу
function replaceStart(){
    button_start.innerHTML = "Pause";
    button_start.onclick = pause;
}

function pause (){
    clearTimeout(timeoutID);
    button_start.innerHTML = "Resume";
    button_start.onclick = resume;
}

function resume(){
    moveDown();
    button_start.innerHTML = "Pause";
    button_start.onclick = pause;
}

// function testString(){
//     let s = "Blah blah blah";
//     s = trim(s);
// }
//
// function trim(data){
//     s = data.trim();
//     return s;
// }

//выпадающее меню
let button = document.querySelector(".dropdown_js");
let dropdownMenu = document.querySelector(".dropdown");
button.onmouseover = dropdownMenuShow;
button.onmouseleave = dropdownMenuHide;
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