var colors = ["rgb(149,0,211)", "rgb(75,0,130)", "rgb(0,0,255)", "rgb(0,255,0)", "rgb(255,255,0)", "rgb(255,127,0)", "rgb(255,0,0)"];


$(document).ready(function(){
    var cont = $("#container");
    window.setInterval(function(){
        cont.css("background-color", colors[Math.floor(Math.random() * colors.length)]);
    }, 1000);
});