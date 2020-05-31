let bLength = document.getElementById("break-length");
let sLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let label = document.getElementById("timer-label");
let sound = document.getElementById("beep");

let uiMin;
let uiSec;

setSecond(0)
setMinutes(1)

let counterId = null;

const VELOCIDAD = 100;

function reset() {
    bLength.innerText = "5"
    sLength.innerText = "25"
    setMinutes(25);
    setSecond(0)
    label.innerText = "Session"
    sound.pause();
    sound.currentTime = 0;
    clearInterval(counterId);
    counterId = null;
}

function bdecrement() {
    let number = parseInt(bLength.innerText);
    if (number > 1) {
        bLength.innerText = number - 1;
        bLength.innerText = parseInt(bLength.innerText)
    }

}

function bincrement() {
    let num = parseInt(bLength.innerText);
    if (num < 60) {
        bLength.innerText = num + 1;
        setMinutes(parseInt(sLength.innerText))
    }

}

function sdecrement() {
    let count = parseInt(sLength.innerText);
    if (count > 1) {
        sLength.innerText = count - 1;
        setMinutes(parseInt(sLength.innerText))
    }

}

function sincrement() {
    let counter = parseInt(sLength.innerText);
    if (counter < 60) {
        sLength.innerText = counter + 1;
        setMinutes(parseInt(sLength.innerText))
    }


}

function playpause() {
    if (counterId) {
        clearInterval(counterId)
        counterId = null;
    } else {
        counterId = setInterval(countdownSessionTimer, VELOCIDAD)
    }

}

function setSecond(number) {
    uiSec = padWithZero(number)
    timeLeft.innerText = uiMin + ":" + uiSec;
}

function setMinutes(number) {
    uiMin = padWithZero(number)
    timeLeft.innerText = uiMin + ":" + uiSec;
}

function getSeconds() {
    return parseInt(timeLeft.innerText.slice(3, 5)); //mm:ss
}

function getMinutes() {
    return parseInt(timeLeft.innerText.slice(0, 2));
}

function countdownSessionTimer() {
    // let segundos = parseInt(seconLeft.innerText);
    let segundos = getSeconds();
    //let minutos = parseInt(minLeft.innerText);
    let minutos = getMinutes();

    setSecond(segundos - 1)

    if (minutos == 0 && segundos == 0) {
        sound.play()
        clearInterval(counterId)
        counterId = setInterval(countdownBreak, VELOCIDAD)
        label.innerText = "Break";
        setSecond(0)
        setMinutes(parseInt(bLength.innerText))
    } else if (segundos == 0) {
        setSecond(59)
        setMinutes(minutos - 1)
    }
}

function countdownBreak() {
    let seg = getSeconds();
    let min = getMinutes();

    setSecond(seg - 1)

    if (min == 0 && seg == 0) {
        clearInterval(counterId)
        setSecond(0)
        setMinutes(parseInt(sLength.innerText))
        counterId = setInterval(countdownSessionTimer, VELOCIDAD)
        label.innerText = "Session";
    } else if (seg == 0) {
        setSecond(59)
        setMinutes(min - 1)
    }
}


function padWithZero(num) {
    let str = "" + num;
    if (str.length === 1) {
        return "0" + str;
    } else {
        return str;
    }
}
