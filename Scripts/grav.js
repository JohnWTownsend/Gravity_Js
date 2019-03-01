var cont = $("#container");

var maxWidth, maxHeight, minWidth, minHeight;
var gravitySpeed = 2;
var stepTime = 25;

var globalClicked = false;
var lastClickedBox;

var boxes = Array();
var upArrows = Array();

$(document).ready(function(){
    cont = $("#container");
    
    maxWidth = parseInt(cont.css("width"));
    maxHeight = parseInt(cont.css("height"));
    minWidth = cont.offset().left;
    minHeight = cont.offset().top ;
    

    $(document).on("mousedown", function(){
        globalClicked = globalClicked ? false : true;
    });
    
    $(document).on("mousemove", function(event){
        if(lastClickedBox && lastClickedBox.clicked){
            boxDrag(lastClickedBox, event);
            updateBox(lastClickedBox);
        }
    });
    
    $(document).on("mouseup", function(event){
        var n = event.target.id;
        var box = boxes[n]
        if(box && box.clicked){
            box.clicked = false;
            gravityBox(box);
        }
    });

    $(document).on("dblclick", function(event){
        addRandomBox(event);
    });

});


function addRandomBox(event){
    var boxSize = Math.random() * 500 + 10;
    var boxX = Math.random() * maxWidth;
    var boxY = Math.random() * maxHeight;
    var arrSize = boxes.length;

    var randBox = {
        x : event.pageX,
        y : event.pageY,
        prevX : [event.pageX],
        prevY : [event.pageY + 10],
        width : boxSize,
        height : boxSize,
        clicked : false,
        freefall : 0,
        id: arrSize,
        aboveCont : false
    };

    var htmlBox = $("<div>", {id : randBox.id, class : "grabBox"});
    cont.append(htmlBox);
    
    boxes.push(randBox);
    updateBox(randBox);
    gravityBox(randBox);

    $(".grabBox").on("mousedown", function(){
        console.log("clicked a doge");
        var n = $(this).attr("id");
        var box = boxes[n]
        boxClick(box);
    });

}

function getRandWord(){
    var wordsArray = ["wow", "so amaze", "very impress", "such doge", "doing the toss", "where paw fren?", "doggo is thro", "many speed", "so DSU", "doing me the frighten"];
    var randInd = Math.floor(Math.random()*wordsArray.length);
    return wordsArray[randInd];
}

function applyRandStyles(elem){
    var randFontSize = Math.random() * 100 + 25;
    var randColor = getRandomColor();
    var randX = Math.random() * (maxWidth-400) + 100;
    var randY = Math.random() * (maxHeight-400) + 100;

    elem.css("font-size", randFontSize);
    elem.css("color", randColor);
    elem.css("left", randX);
    elem.css("top", randY);
}

function addRandomMessage(){
    var mesg = $("<p>", {class : "message", text: getRandWord()});
    cont.append(mesg);
    applyRandStyles(mesg);
    setTimeout(function(){mesg.remove()}, 5000);
}

function boxClick(box){
    lastClickedBox = box;
    box.clicked = true;
    box.freefall = 0;
    box.prevX = [box.x];
    box.prevY = [box.y];
}

function boxDrag(box, event){
    box.prevX.push(box.x);
    box.prevY.push(box.y);
    box.x = event.pageX - box.width / 2;
    box.y = event.pageY - box.height / 2;
}

function gravityBox(box){
    var xSpeed = box.x - box.prevX.pop();
    var xStep = xSpeed / stepTime;
    var ySpeed = box.y - box.prevY.pop();
    var yStep = ySpeed / stepTime;

    // if(Math.abs(xSpeed) > 100 || Math.abs(ySpeed) > 100)

    addRandomMessage();
    
    var gravityInterval = setInterval(function(){
            if(!box.clicked && box.y < maxHeight - box.height){
                box.x = (box.x + xSpeed);
                box.y = (box.y + ySpeed);
                
                box.prevX.push(box.x);
                box.prevY.push(box.y);

                box.y += gravitySpeed * box.freefall;
                box.freefall += 1;
                updateBox(box);
            }
            else{
                clearInterval(gravityInterval);
            }
        },stepTime);
}

function updateBox(box){
    if(box.x > maxWidth - box.width)
        box.x = maxWidth - box.width;
    else if(box.x < minWidth)
        box.x = minWidth;

    if(box.y > maxHeight - box.height)
        box.y = maxHeight - box.height;
    else if (box.y < minHeight && box.aboveCont) //box above screen and arrow exists
        upArrows[box.id].css("left", box.x + (box.width/2));
    else if(box.y < minHeight && !box.aboveCont){  //box above screen and arrow doesn't exist
        upArrows[box.id] = $(`<div>`, {id: `arrow${box.id}`, class: "upArrow"})
        upArrows[box.id].css("left", box.x);
        upArrows[box.id].css("top", minHeight);
        cont.append(upArrows[box.id]);
        box.aboveCont = true;
        console.log("created " + upArrows[box.id]);
    }
    else if(box.aboveCont && box.y >= minHeight && upArrows[box.id]){ //box returns to screen
        console.log("removing");        
        upArrows[box.id].remove();
        box.aboveCont = false;
    }

    var htmlBox = $(`#${box.id}`);
    htmlBox.css("left", box.x);
    htmlBox.css("top", box.y);
    htmlBox.css("height", box.height + "px");
    htmlBox.css("width", box.width + "px");
}
