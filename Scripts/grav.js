
var grabBox = $("#grabBox");


var maxWidth = $(window).width() * .9;
var maxHeight = $(window).height() * .8;
var minWidth = $(window).width() - maxWidth;
var minHeight = $(window).height() - maxHeight;

var glideTime = 700;
var glideSteps = 50;

var gravitySpeed = 2;
var stepTime = 25;

var box = {
    x : minWidth,
    y : minHeight,
    prevX : [0,0,0,0,0,0,0,0,0,0],
    prevY : [0,0,0,0,0,0,0,0,0,0],
    width : 25,
    height: 25,
    clicked: false,
    freefall: 0
}

$(document).ready(function(){

    grabBox = $("#grabBox");
    
    grabBox.on("mousedown", boxClick);
    
    $(document).on("mousemove", function(event){
        if(box.clicked){
            boxDrag(event);
            updateBox();
        }
    });
    
    $(document).on("mouseup", function(){
        if(box.clicked){
            box.clicked = false;
            gravityBox();
        }
    });
});


function boxClick(){
    box.clicked = true;
    box.freefall = 0;
    box.prevX = [box.x];
    box.prevY = [box.y];

}

function boxDrag(event){
    box.prevX.push(box.x);
    box.prevY.push(box.y);
    box.x = event.pageX;
    box.y = event.pageY;
}

function updateBox(){
    console.log(`updating ${box.x} ${box.y}`);
    if(box.x > maxWidth)
        box.x = maxWidth;
    else if(box.x < minWidth)
        box.x = minWidth;
    
    if(box.y > maxHeight)
        box.y = maxHeight;
    else if(box.y < minHeight)
        box.y = minHeight;

    grabBox.css("left", box.x - 12.5);
    grabBox.css("top", box.y - 12.5);
}

function gravityBox(){

    let xSpeed = box.x - box.prevX.pop();
    let xStep = xSpeed / stepTime;
    let ySpeed = box.y - box.prevY.pop();
    let yStep = ySpeed / stepTime;

    var gravityInterval = setInterval(function(){
            if(!box.clicked && box.y < maxHeight){
                box.x = Math.abs((box.x + xSpeed));
                box.y = Math.abs((box.y + ySpeed));
                
                box.prevX.push(box.x);
                box.prevY.push(box.y);

                box.y += gravitySpeed * box.freefall;
                box.freefall += 1;
                updateBox();
            }
            else{
                clearInterval(gravityInterval);
            }
        },stepTime);
}