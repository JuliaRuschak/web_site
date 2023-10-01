//увеличение  поля

let plus = document.querySelector(".increase")
plus.onclick = fieldIncrease;
function fieldIncrease(){
    document.querySelector(".decrease").classList.remove("decrease_with_warning");
    let field = document.querySelector(".table");
    let cell = document.querySelector(".cell");
    let line = document.querySelector(".line");
    let lines = document.querySelectorAll(".line");
    if (lines.length>25){
        return;
    }

    field.innerHTML += line.outerHTML;
    lines = document.querySelectorAll(".line");

    for (let i = 0; i<lines.length;i++){
        lines[i].innerHTML+= cell.outerHTML;
    }

    for (let i = 0; i<lines.length;i++){
        for (let j=0; j<lines[i].children.length; j++){
            lines[i].children[j].dataset.line = i;
            lines[i].children[j].dataset.cell = j;
        }
    }
}

//умеьшение  поля

let minus = document.querySelector(".decrease")
minus.onclick = fieldDecrease;
function fieldDecrease() {
    let lines = document.querySelectorAll(".line");
    if (lines.length === 5) {
        setTimeout(popUpDelay,500);
    }
    if (lines.length === 4) {
        return;
    }
        lines[lines.length - 1].remove();
        for (let i = 0; i < lines.length; i++) {
            lines[i].children[lines[i].children.length - 1].remove();
        }
}

function popUpDelay(){
    document.querySelector(".decrease").classList.add("decrease_with_warning");
}

//начало игры
let start_button = document.querySelector(".start");
start_button.onclick = start;
let bombQuantity = 0;

function start(){
    bomb_quantity();
    bombAllocation();
    document.querySelector(".hidden").style.display="none";
    document.querySelector(".restart").style.visibility="visible";
    let cells = document.querySelectorAll(".cell");
    for (let i=0; i<cells.length; i++){
        cells[i].oncontextmenu = () => false;
        cells[i].onmousedown = function(event) {
            if (event.buttons === 1 && this.dataset.clickCount!=="?" && this.dataset.clickCount !=="empty") {
                play(this);
            } else if (event.buttons === 2 && !this.classList.contains("empty")) {
                markBomb(this);
            }
        }
    }
}

function bomb_quantity(){
    let cells = document.querySelectorAll(".cell");
    bombQuantity = Math.round(cells.length / 6);
    document.querySelector(".bomb_quantity").innerHTML = "Количество мин: " + bombQuantity;
}

function bombAllocation(){
    let cells = document.querySelectorAll(".cell")
    let count = 0;
    while (count<bombQuantity){
        let index = Math.floor(Math.random() * cells.length);
        let bomb_cell = cells[index];
        if (bomb_cell.dataset.bomb !== "true"){
                bomb_cell.dataset.bomb = "true";
            count++;
        }
    }
}

// игра
function play(clickedCell) {
    console.log(this);
    if(clickedCell.dataset.bomb==="true"){
        clickedCell.innerHTML = '<img src="Images/bomb.png" alt="Bomb" class="bomb">';
        clickedCell.classList.add("cell_bomb");
        let cells = document.querySelectorAll(".cell");
        for (let i = 0; i<cells.length; i++){
            cells[i].onmousedown = undefined;
            cells[i].oncontextmenu = undefined;
            if (cells[i].dataset.bomb === "true"){
                cells[i].innerHTML = '<img src="Images/bomb.png" alt="Bomb" class="bomb">';
            }
        }
        document.querySelector(".restart").classList.add("restartAfterLost");
    }else{
        clickedCell.classList.add("empty");
        bombCount(clickedCell);
    }
}

function bombCount(clickedCell){
    let lineIndex = +clickedCell.dataset.line;
    let cellIndex = +clickedCell.dataset.cell;
    let bomb = 0;
    let cellsNearby = [];

    let cell1 = document.querySelector(`div[data-line='${lineIndex-1}'][data-cell='${cellIndex-1}']`);
    let cell2 = document.querySelector(`div[data-line='${lineIndex-1}'][data-cell='${cellIndex}']`);
    let cell3 = document.querySelector(`div[data-line='${lineIndex-1}'][data-cell='${cellIndex+1}']`);
    let cell4 = document.querySelector(`div[data-line='${lineIndex}'][data-cell='${cellIndex+1}']`);
    let cell5 = document.querySelector(`div[data-line='${lineIndex+1}'][data-cell='${cellIndex+1}']`);
    let cell6 = document.querySelector(`div[data-line='${lineIndex+1}'][data-cell='${cellIndex}']`);
    let cell7 = document.querySelector(`div[data-line='${lineIndex+1}'][data-cell='${cellIndex-1}']`);
    let cell8 = document.querySelector(`div[data-line='${lineIndex}'][data-cell='${cellIndex-1}']`);

    cellsNearby.push(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8);
    console.log(cellsNearby);

    for (let i =0;i<cellsNearby.length; i++){
        if (cellsNearby[i]!==null){
            if (cellsNearby[i].dataset.bomb==="true"){
                bomb++;
            }
        }
    }
    if (bomb!=0){
        clickedCell.innerHTML = bomb;
    }else{
        for (let i =0;i<cellsNearby.length; i++){
            if (cellsNearby[i]!==null && !cellsNearby[i].classList.contains("empty")){
                cellsNearby[i].classList.add("empty");
                cellsNearby[i].innerHTML="";
                if (cellsNearby[i].dataset.clickCount==="?"){
                    bombQuantity++;
                    document.querySelector(".bomb_quantity").innerHTML = "Количество мин: " + bombQuantity;
                }
                bombCount(cellsNearby[i]);
                }
            }
        }
    };

function markBomb(clickedCell){
    if (clickedCell.dataset.clickCount === undefined || clickedCell.dataset.clickCount === "flag"){
        clickedCell.innerHTML = "<img src='Images/pin.png' alt='flag'>";
        clickedCell.dataset.clickCount = "?";
        bombQuantity--;
        document.querySelector(".bomb_quantity").innerHTML = "Количество мин: " + bombQuantity;
    }else if (clickedCell.dataset.clickCount === "?"){
        clickedCell.innerHTML = "?";
        clickedCell.dataset.clickCount = "empty";
        bombQuantity++;
        document.querySelector(".bomb_quantity").innerHTML = "Количество мин: " + bombQuantity;
    }else{
        clickedCell.innerHTML = "";
        clickedCell.dataset.clickCount = "flag";
    }
}

// начать сначала
document.querySelector(".restart").onclick = restart;
function restart(){
    document.querySelector(".hidden").style.display="flex";
    document.querySelector(".restart").style.visibility="hidden";
    document.querySelector(".bomb_quantity").innerHTML = "Количество мин: ";
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i<cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].classList.remove("empty");
        cells[i].classList.remove("cell_bomb");
        cells[i].oncontextmenu = undefined;
        cells[i].onmousedown = undefined;
        cells[i].dataset.bomb = undefined;
        cells[i].dataset.clickCount = "flag";
    }
}

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