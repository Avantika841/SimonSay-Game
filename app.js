let gameSeq = [];
let userSeq = [];

let highScore = 0;

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  //random btn choose
  let randomindex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomindex];
  let randombtn = document.querySelector(`.${randomColor}`);
  //   console.log(randomindex);
  //   console.log(randomColor);
  //   console.log(randombtn);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randombtn);
}

function checkAns(idx) {
  //console.log("current level:",level);
  //let inx=level-1;

  if (userSeq[idx] === gameSeq[idx]) {
    // console.log("same value");

    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
    }
    h2.innerHTML = `Game Over! your score is <b>${level}</b> 
       Highest Score : <b>${highScore}</b><br>
       <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

function btnPress() {
  //console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  //console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
