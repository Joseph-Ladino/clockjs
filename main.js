"use strict";
var size = 1000,
    radius = size/2,
    ctx = document.getElementById("mycan").getContext("2d"),
    buffer = document.createElement("canvas").getContext("2d"),
    date = new Date(),
    afr,
    theme = {
        clockFace: "",
        numbers: "",
        fontSize: "",
        secondHand: "",
        minuteHand: "",
        hourHand: "",
        img: false
    };
    
var darkTheme = {
        clockFace: "black",
        numbers: "white",
        fontSize: size / 10,
        secondHand: "deepSkyBlue",
        minuteHand: "blue",
        hourHand: "darkBlue",
        img: false
    },
    brobama = {
        clockFace: "black",
        numbers: "white",
        fontSize: size / 10,
        secondHand: "deepSkyBlue",
        minuteHand: "blue",
        hourHand: "darkBlue",
        img: "./brobama.png"
    };
    

theme = darkTheme;

buffer.canvas.width = size;
buffer.canvas.height = size;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function rotate(point, angle) {
    angle *= Math.PI/180;
    return new Point((point.x * Math.cos(angle)) - (point.y * Math.sin(angle)), (point.x * Math.sin(angle)) + (point.y * Math.cos(angle)));
}

var secondBase = new Point(0, -radius*0.95),
    minutebase = new Point(0, -radius*0.75),
    hourBase = new Point(0, -radius*3/5),
    numberBase = new Point(0, -radius*0.85),
    seconds,
    minutes,
    hours,
    secondRotate,
    minuteRotate,
    hourRotate,
    numberRotate;

function loop() {
    date = new Date();
    
    seconds = (date.getSeconds() + (date.getMilliseconds() / 1000)) / 60;
    minutes = (date.getMinutes() + seconds) / 60;
    hours = ((date.getHours() % 12) + minutes) / 12;
    
    
    secondRotate = rotate(secondBase, seconds * 360);
    minuteRotate = rotate(minutebase, minutes * 360);
    hourRotate = rotate(hourBase, hours * 360);
    
    
    buffer.clearRect(0, 0, size, size);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    
    buffer.beginPath();
    buffer.fillStyle = theme.clockFace;
    buffer.arc(radius, radius, radius, 0, 2*Math.PI);
    buffer.fill();


    buffer.beginPath();
    buffer.fillStyle = theme.numbers;
    buffer.strokeStyle = theme.numbers;
    buffer.font = theme.fontSize + "px sans-serif";

    for(var i = 12; i >= 1; i--) {
        numberRotate = rotate(numberBase, 30 * i);
        buffer.fillText(`${i}`, numberRotate.x + radius - (buffer.measureText(`${i}`).width / 2), numberRotate.y + radius + (theme.fontSize / 2) - (0.02 * radius));
    }
    
    var img = document.getElementById("img");
    
    if(theme.img) {
        img.src = theme.img;
        img.style.left = ((window.innerWidth / 2) - (img.width / 2)) + "px";
        img.style.top = ((window.innerHeight  / 2) - (img.height / 2)) + "px";
        img.style.transform = "rotate(" + (seconds * 360) + "deg)";
        img.style.maxHeight = (radius / 2) + "px";
    } else img.src = "./blank.png";
    
    buffer.lineWidth = size * 0.02;
    
    buffer.beginPath();
    buffer.moveTo(radius, radius);
    buffer.strokeStyle = theme.hourHand;
    buffer.lineTo(hourRotate.x + radius, hourRotate.y + radius);
    buffer.stroke();
    
    
    buffer.beginPath();
    buffer.moveTo(radius, radius);
    buffer.strokeStyle = theme.minuteHand;
    buffer.lineTo(minuteRotate.x + radius, minuteRotate.y + radius);
    buffer.stroke();
    
    
    buffer.beginPath();
    buffer.moveTo(radius, radius);
    buffer.strokeStyle = theme.secondHand;
    buffer.lineTo(secondRotate.x + radius, secondRotate.y + radius);
    buffer.stroke();
    
    
    ctx.drawImage(buffer.canvas, 0, 0, size, size, 0, 0, ctx.canvas.width, ctx.canvas.height);
    afr = requestAnimationFrame(loop);
}

function resize() {
    if(window.innerHeight / window.innerWidth > 1) {
       ctx.canvas.height = window.innerWidth;
       ctx.canvas.width = window.innerWidth;
   } else {
       ctx.canvas.height = window.innerHeight;
       ctx.canvas.width = window.innerHeight;
   }
}

resize();
loop();

addEventListener("resize", resize);