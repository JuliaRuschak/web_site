function rotate (){
    // clearTimeout(idSetTimeOut);
    if (figure.type === "Smashboy"){
        return;
    }
    if (figure.type === "Hero"){
        rotateHero();
    }
    if (figure.type === "Cleveland Z"){
        rotateClevelandZ();
    }
    if (figure.type === "Rhode Island Z"){
        rotateRhodeIslandZ();
    }
    if (figure.type === "Blue Ricky"){
        rotateBlueRicky();
    }
    if (figure.type === "Orange Ricky"){
        rotateOrangeRicky();
    }
    if (figure.type === "Teewee"){
        rotateTeewee();
    }
    // idSetTimeOut = setTimeout(moveDown, 300);
}

function rotateHero(){
    let positionAfterRotation = [];

    if (figure.rotation === "none"){
        figure.rotation = 90;
        if (figure.position[2][1]<=1){
            positionAfterRotation.push([figure.position[2][0], 0]);
            positionAfterRotation.push([figure.position[2][0], 1]);
            positionAfterRotation.push([figure.position[2][0], 2]);
            positionAfterRotation.push([figure.position[2][0], 3]);

        } else if (figure.position[2][1]===9){
            positionAfterRotation.push([figure.position[2][0], 6]);
            positionAfterRotation.push([figure.position[2][0], 7]);
            positionAfterRotation.push([figure.position[2][0], 8]);
            positionAfterRotation.push([figure.position[2][0], 9]);
        }
        else{
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-2]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]+1]);
        }

    } else if (figure.rotation === 90){
        if (figure.position[0][0]===19){
                return;
            } else {
            figure.rotation = "none";
            positionAfterRotation.push([figure.position[2][0]-2,figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]]);
            }
        }
    let status = "ok";
    for (let i=0;i<positionAfterRotation.length;i++){
        let line = positionAfterRotation[i][0];
        let cell = positionAfterRotation[i][1];
        if (!field_state[line][cell].free){
            status = "occupied";
            break;
        }
    }
    if (status==="ok"){
        figure.position = positionAfterRotation;
        drawAFigure();
    }
    return;
}



function rotateClevelandZ(){
    let positionAfterRotation = [];
    if (figure.rotation==="none"){
        if(figure.position[3][0]===19){
            return;
        }
        figure.rotation = "90";
        positionAfterRotation.push([figure.position[2][0]-1, figure.position[2][1]+1]);
        positionAfterRotation.push([figure.position[2][0], figure.position[2][1]+1]);
        positionAfterRotation.push([figure.position[2][0], figure.position[2][1]]);
        positionAfterRotation.push([figure.position[2][0]+1, figure.position[2][1]]);
    } else if (figure.rotation==="90"){
        figure.rotation = "none";
        if (figure.position[2][1]===0){
            positionAfterRotation.push([figure.position[0][0], 0]);
            positionAfterRotation.push([figure.position[0][0], 1]);
            positionAfterRotation.push([figure.position[0][0]+1, 1]);
            positionAfterRotation.push([figure.position[0][0]+1, 2]);
        } else{
            positionAfterRotation.push([figure.position[2][0]+1, figure.position[2][1]+1]);
            positionAfterRotation.push([figure.position[2][0]+1, figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0], figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0], figure.position[2][1]-1]);
        }
    }
    let status = "ok";
    for (let i=0; i<positionAfterRotation.length; i++){
        let line = positionAfterRotation[i][0];
        let cell = positionAfterRotation[i][1];
        if (!field_state[line][cell].free){
            status = "occupied";
            break;
        }
    }
    if (status==="ok"){
        figure.position = positionAfterRotation;
        drawAFigure();
    }
        return;
}

function rotateRhodeIslandZ(){
    let positionAfterRotation = [];
    if (figure.rotation === "none"){
        figure.rotation = 90;
        if (figure.position[0][0]===19){
            return
        }
        positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]-1]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]-1]);
        positionAfterRotation.push([figure.position[1][0]+1,figure.position[1][1]]);
    }
    else if (figure.rotation === 90){
        figure.rotation = "none";
        if (figure.position[1][1]===9){
            positionAfterRotation.push([figure.position[1][0]-1,9]);
            positionAfterRotation.push([figure.position[1][0],8]);
            positionAfterRotation.push([figure.position[0][0],8]);
            positionAfterRotation.push([figure.position[1][0],7]);
        } else {
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]-1]);
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
            positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]]);
            positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]+1]);
        }
    }
    let state = "ok";
    for (let i = 0; i<positionAfterRotation.length; i++){
        let line = positionAfterRotation[i][0];
        let cell = positionAfterRotation[i][1];
        if (field_state[line][cell].free === false){
            status = "occupied";
            break;
        }
    }
    if (state === "ok"){
        figure.position=positionAfterRotation;
    } return;
}

function rotateBlueRicky(){
    let positionAfterRotation = [];
    if (figure.rotation === "none"){
        figure.rotation = 90;
        if (figure.position[1][1]===9){
            positionAfterRotation.push([figure.position[2][0],7]);
            positionAfterRotation.push([figure.position[0][0],7]);
            positionAfterRotation.push([figure.position[1][0],8]);
            positionAfterRotation.push([figure.position[1][0],9]);
        } else{
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]-1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]+1]);
        }
    }
    else if (figure.rotation === 90){
        if (figure.position[1][0]===19){
            return;
        } else{
            figure.rotation = 180;
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]+1]);
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]]);
        }
    }
    else if (figure.rotation === 180){
        figure.rotation = 270;
        if (figure.position[1][1]===0){
            positionAfterRotation.push([figure.position[2][0]+1,2]);
            positionAfterRotation.push([figure.position[2][0],2]);
            positionAfterRotation.push([figure.position[2][0],1]);
            positionAfterRotation.push([figure.position[2][0],0]);
        } else{
            positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]+1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]+1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-1]);
        }
    }
    else if (figure.rotation === 270){
        figure.rotation = "none";
        positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]-1]);
        positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]]);
        positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
        positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]]);
    }
    let status = "ok";
    for (let i=0; i<positionAfterRotation.length; i++){
        let line = positionAfterRotation[i][0];
        let cell = positionAfterRotation[i][1];
        if (field_state[line][cell].free === false){
            status = "occupied";
            break;
        }
    }
    if (status === "occupied"){
        return;
    }
    figure.position = positionAfterRotation;
}

function rotateOrangeRicky(){
    let positionAfterRotation = [];
        if (figure.rotation === "none"){
            if (figure.position[2][1]===0){
                figure.rotation = 90;
                positionAfterRotation.push([figure.position[2][0],0]);
                positionAfterRotation.push([figure.position[2][0]+1,0]);
                positionAfterRotation.push([figure.position[0][0],1]);
                positionAfterRotation.push([figure.position[0][0],2]);
            } else{
                figure.rotation = 90;
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-1]);
                positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]-1]);
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]+1]);
            }
        }
        else if (figure.rotation === 90){
            figure.rotation = 180;
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]-1]);
            positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
            positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]]);
        }
        else if (figure.rotation === 180){
            if(figure.position[2][1]===9){
                figure.rotation = 270;
                positionAfterRotation.push([figure.position[2][0],9]);
                positionAfterRotation.push([figure.position[2][0]-1,9]);
                positionAfterRotation.push([figure.position[0][0],8]);
                positionAfterRotation.push([figure.position[0][0],7]);
            }else{
                figure.rotation = 270;
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]+1]);
                positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]+1]);
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]-1]);
            }
        }
        else if (figure.rotation === 270){
            if (figure.position[2][0]===19){
                return;
            }else{
                figure.rotation = "none";
                positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]]);
                positionAfterRotation.push([figure.position[2][0]+1,figure.position[2][1]+1]);
                positionAfterRotation.push([figure.position[2][0],figure.position[2][1]]);
                positionAfterRotation.push([figure.position[2][0]-1,figure.position[2][1]]);
            }
        }
        let status = "ok";
        for (let i=0; i<positionAfterRotation.length;i++){
            let line = positionAfterRotation[i][0];
            let cell = positionAfterRotation[i][1];
            if (!field_state[line][cell].free){
                status = "occupied";
                break;
            }
        }
    if (status === "occupied"){
        return;
    }
    figure.position = positionAfterRotation;
}

function rotateTeewee(){
    let positionAfterRotation = [];
    if (figure.position[1][0]===19){
        return;
    }
    if (figure.rotation === "none"){
        figure.rotation = 90;
        positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0]+1,figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]+1]);
        }
    else if(figure.rotation === 90){
        if (figure.position[0][1]===0){
            figure.rotation = 180;
            positionAfterRotation.push([figure.position[1][0],0]);
            positionAfterRotation.push([figure.position[0][0],1]);
            positionAfterRotation.push([figure.position[0][0],2]);
            positionAfterRotation.push([figure.position[0][0]+1,figure.position[0][1]+1]);
        }else{
            figure.rotation = 180;
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]-1]);
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]+1]);
            positionAfterRotation.push([figure.position[1][0]+1,figure.position[1][1]]);
        }
    }
    else if(figure.rotation === 180){
        figure.rotation = 270;
        positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0]+1,figure.position[1][1]]);
        positionAfterRotation.push([figure.position[1][0],figure.position[1][1]-1]);
    }
    else if(figure.rotation === 270){
        if (figure.position[1][1]===9){
            figure.rotation = "none";
            positionAfterRotation.push([figure.position[1][0],9]);
            positionAfterRotation.push([figure.position[1][0],8]);
            positionAfterRotation.push([figure.position[1][0],7]);
            positionAfterRotation.push([figure.position[1][0]-1,figure.position[0][1]-1]);
        }else{
            figure.rotation = "none";
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]+1]);
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]]);
            positionAfterRotation.push([figure.position[1][0],figure.position[1][1]-1]);
            positionAfterRotation.push([figure.position[1][0]-1,figure.position[1][1]]);
        }
    }
    let status = "ok";
    for (let i=0; i<positionAfterRotation.length;i++){
        let line = positionAfterRotation[i][0];
        let cell = positionAfterRotation[i][1];
        if (!field_state[line][cell].free){
            status = "occupied";
            break;
        }
    }
    if (status === "occupied"){
        return;
    }
    figure.position = positionAfterRotation;
}