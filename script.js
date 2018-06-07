'use strict'

let bigBtn = document.querySelector(".click-8");
let topBtnArr = document.getElementsByClassName('top-button');
let codeBtnArr = document.getElementsByClassName('code-button');
let codeNumberArr = document.getElementsByClassName('code-number');
let second8 = document.getElementById('second-8');
let second3 = document.getElementById('second-3')
let numberCards = document.querySelector('.number-cards');
let lockCard = document.querySelector(".lock-card");
let numberCard1 = document.getElementById('card-1');
let cardKey = document.querySelector('.cardKey');
let numberCard2 = document.getElementById('card-2');
let forgetTxt = document.querySelector(".forget-txt");
let bulbBig = document.getElementById('bulb-8');
let bulbCode = document.getElementsByClassName('lightbulb');
let btnTop1 = document.getElementById('btnTop-1');
let btnTop2 = document.getElementById('btnTop-2');
let btnTop3 = document.getElementById('btnTop-3');
let btnTop4 = document.getElementById('btnTop-4');

let startDate = new Date();
let topMemoryArr = [];
let codeBtnMemoryArr = [];
let codeNumberMemoryArr = [];
let countBigBtnPress = 0;
let second8Pressed = false;
let second3Pressed = false;
let rotate1 = false;
let rotate2 = false;


bigBtn.addEventListener("click", click8);
for(let codeBtn of codeBtnArr){
  codeBtn.addEventListener("click", pushCodeBtn);
}
for(let topBtn of topBtnArr){
  topBtn.addEventListener("click", pushTopBtn);
}
for(let codeNumber of codeNumberArr){
  codeNumber.addEventListener("click", pushCodeNumber);
}

function click8(){
countBigBtnPress++;
if(countBigBtnPress === 9){
  bulbBig.src = "./assets/bulb-off.png";
  countBigBtnPress = 0;
}
else if(countBigBtnPress === 8){
bulbBig.src = "./assets/bulb-on.png";
}
}

function pushTopBtn(){
  if(countBigBtnPress == 8){
  if(this.style.backgroundColor == "rgb(132, 61, 61)"){
    this.style.backgroundColor = "#ff3535";
    let index = topMemoryArr.indexOf(+this.value);
    topMemoryArr.splice(index, 1);
    checkTopCode();
    return;
  }
  this.style.backgroundColor = "#843d3d";
  topMemoryArr.push(+this.value);
  checkTopCode();
}
else{
  return;
}
}

 function checkTopCode(){
   if(topMemoryArr.length == 2 && topMemoryArr.includes(2) && topMemoryArr.includes(3)){
    for(let bulb of bulbCode){
      bulb.src = "./assets/bulb-on.png";
    }
   cardRotate(1);
    }
    else{
      for(let bulb of bulbCode){
        bulb.src = "./assets/bulb-off.png";
      }
      cardClose(1);
      }
 }

 function pushCodeBtn(){
   if(countBigBtnPress == 8 && rotate1){
     if(this.style.backgroundColor == "rgb(132, 61, 61)"){
       this.style.backgroundColor = "#ff3535";
       let index = codeBtnMemoryArr.indexOf(+this.value);
       codeBtnMemoryArr.splice(index, 1);
       checkCode();
     }
     else{
       this.style.backgroundColor = "#843d3d";
       codeBtnMemoryArr.push(+this.value);
       checkCode();
     }
   }
   else{
     return;
   }
 }

 function checkCode(){
   if(codeBtnMemoryArr.includes(1) && codeBtnMemoryArr.includes(3) && codeBtnMemoryArr.includes(7)
   && codeBtnMemoryArr.includes(8) && codeBtnMemoryArr.includes(9) && codeBtnMemoryArr.length === 5){
     cardRotate(2);
   }
   else{
     cardClose(2);
   }
 }

function pushCodeNumber(){
  if(countBigBtnPress >= 8 && rotate2){
  if(this.style.backgroundColor == "rgb(165, 165, 165)"){
    this.style.backgroundColor = "white";
    let index = codeNumberMemoryArr.indexOf(+this.innerHTML);
    if(this.innerHTML == "▼"){
      index = codeNumberMemoryArr.indexOf(this.innerHTML);
    }
    codeNumberMemoryArr.splice(index, 1);
    if(this.id == "second-8"){
      second8Pressed = false;
    }
    if(this.id == "second-3"){
      second3Pressed = false;
    }
checkNumberCode();
  }
  else{
  codeNumberMemoryArr.push(+this.innerHTML);
  if(this.innerHTML == "▼"){
    codeNumberMemoryArr.pop();
    codeNumberMemoryArr.push(this.innerHTML);
  }
  this.style.backgroundColor = `#a5a5a5`;
  if(this.id == "second-8"){
    second8Pressed = true;
  }
  if(this.id == "second-3"){
    second3Pressed = true;
  }
checkNumberCode();
}
}
else{
  return;
}
}

function checkNumberCode(){
  if(codeNumberMemoryArr.includes(8) && codeNumberMemoryArr.includes(2) &&
   codeNumberMemoryArr.includes(3) && codeNumberMemoryArr.includes(1) &&
   codeNumberMemoryArr.includes(7) && codeNumberMemoryArr.includes(9) &&
   codeNumberMemoryArr.includes("▼") && codeNumberMemoryArr.length == 9
   && second8Pressed && second3Pressed){
  cardRotate(3);
  }
  else{
  cardClose(3);
  }
}

function cardRotate(card){
  if(card===1){
    numberCard1.style.transform = `rotateY(180deg)`
    cardKey.src = `./assets/key.png`;
    cardKey.style.width = `5rem`;
    cardKey.style.height = `5.6rem`;
    cardKey.style.position = `absolute`;
    cardKey.style.left = `0.5rem`;
    cardKey.style.top = `0`;
    numberCard1.style.backgroundImage = "none";
    rotate1 = true;
  }
  else if(card===2){
    numberCard2.style.transform = `rotateY(180deg)`;
    numberCard2.style.backgroundImage = "none";
    forgetTxt.innerHTML = `<code>Don't forget the numbers!</code>`;
    forgetTxt.style.transform = `rotateY(180deg)`;
    rotate2 = true;
  }
  else if(card===3){
    lockCard.style.transform = `rotateY(180deg)`
    lockCard.style.backgroundImage = `url("./assets/lock.png")`;
    let rectKeyStatic = cardKey.getBoundingClientRect();
    let topKeyStatic = rectKeyStatic.top;
    let leftKeyStatic = rectKeyStatic.left;
    let rectLock = lockCard.getBoundingClientRect();
    numberCard1.addEventListener("mousedown", function(){
      window.addEventListener("mousemove", dragAndDrop);
    });

    numberCard1.addEventListener("mouseup", function(){
      window.removeEventListener('mousemove', dragAndDrop);
      if(lockCard.style.borderColor === 'green'){
        cardKey.style.top = `${(rectLock.top + (rectLock.height/2) - topKeyStatic.top)}px`;
        cardKey.style.left = `${topKeyStatic.left - (lockCard.left + (lockCard.withd/2))}px`;
        youWon();
      }
      lockCard.style.borderColor = 'black';
      if(cardKey.top != topKeyStatic || cardKey.left != leftKeyStatic){
        cardKey.style.top = `0`;
        cardKey.style.left = `0.5rem`;
      }
    })
    function dragAndDrop(e){
      let rectKey = cardKey.getBoundingClientRect();
      let xKey = rectKey.x;
      let yKey = rectKey.y;
      let xLock = rectLock.x;
      let yLock = rectLock.y;
      let bottomLock = rectLock.bottom;
      let rightLock = rectLock.right;
      e.preventDefault();
      let x = e.clientX;
      let y = e.clientY;
      cardKey.style.top = `${(y - (cardKey.height/2)) - topKeyStatic}px`;
      cardKey.style.left = `${-(x - (cardKey.width/2) - leftKeyStatic)}px`;
      if(cardKey.top != 0 || cardKey.left != `0.5rem` ){
        lockCard.style.borderColor = `red`;
        if (xKey <= rightLock && xKey >= xLock && yKey >= yLock && yKey <= bottomLock) {
          lockCard.style.borderColor = "green";
        }
      }
    }
  }
}
function cardClose(card){
  if(card===1){
    numberCard1.removeAttribute("style");
    cardKey.removeAttribute("style");
    cardKey.src = ``;
    rotate1 = false;
  }
  else if(card===2){
    numberCard2.removeAttribute("style");
    forgetTxt.innerHTML = "";
    forgetTxt.removeAttribute("style");
    rotate2 = false;
  }
  else if(card===3){
    lockCard.removeAttribute("style");
  }
}

function youWon(){
let timePassed = Date.parse(new Date()) - Date.parse(startDate);
let secondsPassed = Math.floor((timePassed / 1000) % 60);
let minutesPassed = Math.floor((timePassed / 1000 / 60) % 60);
alert(`Congratulations you've won! Your time: ${minutesPassed} minutes and ${secondsPassed} seconds\n
Thank you for playing with us!`);
window.location.reload();
}