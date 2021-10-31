//skip event
const signInBtn = document.getElementById('welcome__btn');
const skipBtn = document.getElementById('welcome__skp');
const skipAudio = document.getElementById('letsGo');
let welcome = document.getElementById('startWindow');
let getSignInInfo = function(){
    welcome.classList.add('hide__element');
    skipAudio.play();
}

signInBtn.addEventListener('click', getSignInInfo)
skipBtn.addEventListener('click', getSignInInfo)

//getClicks count
var imageOne = document.getElementById('billyImg');
const countText = document.getElementById('countOfClicks');
let countOfClicks = 0;
let clickValue = 1;
function getClicks(){
    imageOne.classList.add('animation-rotate')
    countOfClicks+=clickValue;
    countText.textContent = countOfClicks;
};

imageOne.addEventListener('click', getClicks);
//open points window
var scoreBtn = document.getElementById('scoreBtn');
var gradeWindow = document.getElementById('grade')
function openGradeWindow(){
    gradeWindow.classList.remove('hide__element')
}
scoreBtn.addEventListener('click', openGradeWindow)

//close points window

var gradeCloseBnt = document.getElementById('grade__close');
function closeGradeWindow(){
    gradeWindow.classList.add('hide__element');
}
gradeCloseBnt.addEventListener('click', closeGradeWindow);

//play video after click on img
var videoOne = document.getElementById('bgVideo');

play = function(){
    videoOne.volume = 0.5;
    videoOne.play();
}
imageOne.addEventListener("click", play);