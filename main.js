"use strict";
var size = 1000,
    radius = size / 2,
    ctx = document.getElementById("mycan").getContext("2d"),
    buffer = document.createElement("canvas").getContext("2d"),
    roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"],
    date = new Date(),
    theme = {},
    afr;

var dark = {
        clockFace: "black",
        clockBorder: "grey",
        numbers: "white",
        fontSize: size / 10,
        secondHand: "deepSkyBlue",
        minuteHand: "blue",
        hourHand: "darkBlue",
        roman: false,
        img: false
    },
    light = {
        clockFace: "white",
        clockBorder: "darkGrey",
        numbers: "black",
        fontSize: size / 10,
        secondHand: "crimson",
        minuteHand: "blue",
        hourHand: "black",
        roman: false,
        img: false
    },
    darkBrobama = {
        clockFace: "black",
        clockBorder: "grey",
        numbers: "white",
        fontSize: size / 10,
        secondHand: "deepSkyBlue",
        minuteHand: "blue",
        hourHand: "darkBlue",
        roman: false,
        img: "./brobama.png"
    },
    lightBrobama = {
        clockFace: "white",
        clockBorder: "darkGrey",
        numbers: "black",
        fontSize: size / 10,
        secondHand: "crimson",
        minuteHand: "blue",
        hourHand: "black",
        roman: false,
        img: "./brobama.png"
    },
    greenLand = {
        clockFace: "aquamarine",
        clockBorder: "green",
        numbers: "darkgreen",
        fontSize: size / 10,
        secondHand: "lime",
        minuteHand: "mediumseagreen",
        hourHand: "green",
        roman: false,
        img: false
    },
    shrekLand = {
        clockFace: "aquamarine",
        clockBorder: "green",
        numbers: "darkgreen",
        fontSize: size / 10,
        secondHand: "lime",
        minuteHand: "mediumseagreen",
        hourHand: "green",
        roman: false,
        img: "http://www.pngall.com/wp-content/uploads/2/Shrek-PNG-Free-Download.png"
    },
    blueBerry = {
        clockFace: "deepSkyBlue",
        clockBorder: "navy",
        numbers: "midnightBlue",
        fontSize: size / 10,
        secondHand: "mediumblue",
        minuteHand: "dodgerblue",
        hourHand: "navy",
        roman: false,
        img: false
    },
    quirky = {
        clockFace: "black",
        clockBorder: "silver",
        numbers: "red",
        fontSize: size * 0.08,
        secondHand: "whitesmoke",
        minuteHand: "gold",
        hourHand: "peru",
        roman: true,
        img: false
    },
    quirkyLight = {
        clockFace: "white",
        clockBorder: "darkGrey",
        numbers: "maroon",
        fontSize: size * 0.08,
        secondHand: "crimson",
        minuteHand: "blue",
        hourHand: "black",
        roman: true,
        img: false
    },
    pizza = {
        clockFace: "red",
        clockBorder: "orange",
        numbers: "yellow",
        fontSize: size * 0.08,
        secondHand: "darkred",
        minuteHand: "brown",
        hourHand: "maroon",
        roman: true,
        img: false
    };

console.log("themes: dark, light, darkBrobama, lightBrobama, greenLand, shrekLand, blueBerry, quirky, quirkyLight, pizza");

theme = quirky;

buffer.canvas.width = size;
buffer.canvas.height = size;

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function rotate(point, angle) {
    angle *= Math.PI/180;
    return new Point((point.x * Math.cos(angle)) - (point.y * Math.sin(angle)), (point.x * Math.sin(angle)) + (point.y * Math.cos(angle)));
}

var secondBase = new Point(0, -radius * 0.9),
    minutebase = new Point(0, -radius * 0.75),
    hourBase = new Point(0, -radius * 0.6),
    numberBase = new Point(0, -radius * 0.85),
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

    buffer.lineWidth = size * 0.02;

    buffer.beginPath();
    buffer.fillStyle = theme.clockFace;
    buffer.strokeStyle = theme.clockBorder;
    buffer.arc(radius, radius, radius - buffer.lineWidth, 0, 2*Math.PI);
    buffer.stroke();
    buffer.fill();


    buffer.beginPath();
    buffer.fillStyle = theme.numbers;
    buffer.strokeStyle = theme.numbers;
    buffer.font = theme.fontSize + "px sans-serif";

    for(var i = 12; i >= 1; i--) {
        numberRotate = rotate(numberBase, 30 * i);
        buffer.fillText(`${(theme.roman) ? roman[i - 1] : i}`, numberRotate.x + radius - (buffer.measureText(`${(theme.roman) ? roman[i - 1] : i}`).width / 2), numberRotate.y + radius + (theme.fontSize / 2) - (0.02 * radius));
    }

    var img = document.getElementById("img");

    if(theme.img) {
        img.src = theme.img;
        img.style.left = ((window.innerWidth / 2) - (img.width / 2)) + "px";
        img.style.top = ((window.innerHeight  / 2) - (img.height / 2)) + "px";
        img.style.transform = "rotate(" + (seconds * 360) + "deg)";
        img.style.maxHeight = (radius / 2) + "px";
    } else img.src = "./blank.png";


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

    buffer.beginPath();
    buffer.moveTo(radius, radius);
    buffer.fillStyle = theme.secondHand;
    buffer.arc(radius, radius, 10, 0, 2 * Math.PI);
    buffer.fill();

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
