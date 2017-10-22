
var grabBox = $("#grabBox");

var maxWidth, maxHeight, minWidth, minHeight;

var topOffset = $(window).height();


var glideTime = 700;
var glideSteps = 50;

var gravitySpeed = 2;
var stepTime = 25;

var box = {
    x : minWidth,
    y : minHeight,
    prevX : [0,0,0,0,0,0,0,0,0,0],
    prevY : [0,0,0,0,0,0,0,0,0,0],
    width : 50,
    height: 50,
    clicked: false,
    freefall: 0
};

$(document).ready(function(){
    var cont = $("#container");
    
    maxWidth = parseInt(cont.css("width"));
    maxHeight = parseInt(cont.css("height"));
    minWidth = cont.offset().left;
    minHeight = cont.offset().top ;
    
    grabBox = $("#grabBox");
    console.log(maxWidth + " " + maxHeight);
    
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
    box.x = event.pageX - box.width / 2;
    box.y = event.pageY - box.height / 2;
}

function updateBox(){
    console.log(`updating ${box.x} ${box.y} max:${maxWidth} ${maxHeight} min:${minWidth} ${minHeight}`);
    if(box.x > maxWidth - box.width)
        box.x = maxWidth - box.width;
    else if(box.x < minWidth)
        box.x = minWidth;
    
    if(box.y > maxHeight - box.height)
        box.y = maxHeight - box.height;
    else if(box.y < minHeight){
        box.y = minHeight;
        console.log(`setting box.y to ${box.y} == ${minHeight}`)
    }

    grabBox.css("left", box.x);
    grabBox.css("top", box.y);
    grabBox.css("height", box.height + "px");
    grabBox.css("width", box.width + "px");
}

function gravityBox(){

    var xSpeed = box.x - box.prevX.pop();
    var xStep = xSpeed / stepTime;
    var ySpeed = box.y - box.prevY.pop();
    var yStep = ySpeed / stepTime;

    var gravityInterval = setInterval(function(){
            if(!box.clicked && box.y < maxHeight - box.height){
                box.x = (box.x + xSpeed);
                box.y = (box.y + ySpeed);
                
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