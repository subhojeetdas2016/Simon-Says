let gameseq = [];
let userseq = [];

let audio = new Audio('clicked.mp3');

let btns = ["red", "orange", "green", "blue"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

function startGame() {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);  // Added touchstart event listener

document.addEventListener("click", function (event) {
    if (!started && !event.target.classList.contains("btn")) {
        alert("Please press a keyboard key or touch the screen to start the game.");
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    userseq = [];
    level++;

    h3.innerText = `level ${level}`;
    //random button choose
    let randIdx = Math.floor(Math.random() * btns.length);  // Fixed to use the correct array length
    let ranColor = btns[randIdx];
    let randBtn = document.querySelector(`.${ranColor}`);
    gameseq.push(ranColor);
    console.log(gameseq);
    btnflash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerText = `Game Over! Press any key or touch the screen to START`;
        alert("Wrong Guess! Click OK To Restart The Game");
        location.reload();
    }
}

function ans(idx) {
    if (userseq[idx] != gameseq[idx]) {
        alert(`your level is ${level}`)
    }
}

function btnpress() {
    if (!started) {
        alert("Please press a keyboard key or touch the screen to start the game.");
        return;
    }
    audio.play();

    console.log(this);
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
