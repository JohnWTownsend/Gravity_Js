var colors = ["rgb(149,0,211)", "rgb(75,0,130)", "rgb(0,0,255)", "rgb(0,255,0)", "rgb(255,255,0)", "rgb(255,127,0)", "rgb(255,0,0)"];


$(document).ready(function(){
    var cont = $("#container");
    window.setInterval(function(){
        cont.css("background-color", getRandomColor());//colors[Math.floor(Math.random() * colors.length)]);
        console.log("color change");
    }, 2500);
});


function getRandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}