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

//карусель
let carousel_icons = document.querySelectorAll(".pointer");
let carousel_imgs = document.querySelectorAll(".carousel_img");
let carousel_hrefs = document.querySelectorAll(".link_carousel_js");
let imgCount = 0;
let gamesArray = ["Chess", "Snake", "Tetris", "Minesweeper"];
console.log(carousel_icons);
for (let i=0; i<carousel_icons.length; i++){
    carousel_icons[i].onclick = carousel;
}
function carousel(event){
    console.log(event);
    if(event.target.dataset.type === "right"){
        if (imgCount>gamesArray.length){
            imgCount=0;
        }
        imgCount++;
        let imgNumber = imgCount;
        for (let i=0; i<carousel_imgs.length; i++){
            if(imgNumber>=gamesArray.length){
                imgNumber=0;
            }
            carousel_imgs[i].src = "Images/"+ imgNumber + ".jpg";
            carousel_imgs[i].alt = gamesArray[imgNumber];
            carousel_hrefs[i].href = "Games/" + gamesArray[imgNumber] + "/index.html";
            if (gamesArray[imgNumber]==="Chess"){
                carousel_hrefs[i].target = "_blanc";
            }
            else{
                carousel_hrefs[i].target = "";
            }
            imgNumber++;
        }
    }
    if(event.target.dataset.type === "left"){
        imgCount--; // номер игры в массиве
        if(imgCount<0){
            imgCount=carousel_imgs.length;
        }
        let imgNumber = imgCount; // номер картинки
        for (let i=0; i<carousel_imgs.length; i++){
            if (imgNumber>=gamesArray.length){
                imgNumber=0;
            }
            carousel_imgs[i].src = "Images/" + imgNumber + ".jpg";
            carousel_imgs[i].alt = gamesArray[imgNumber];
            carousel_hrefs[i].href = "Games/" + gamesArray[imgNumber] + "/index.html";
            if (gamesArray[imgNumber] === "Chess"){
                carousel_hrefs[i].target = "_blanc";
            }
            else{
                carousel_hrefs[i].target = "";
            }
            imgNumber++;
        }
    }
}