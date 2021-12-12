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


//fix div to mouse
var imageOne = document.getElementById('billyImg');
var popWindow = document.getElementById('popWindow');
let getVisible = function(){
    popWindow.classList.add('hide__element');
    popWindow.classList.remove('animation-slide-top');

}
document.getElementById('billyImg').onmouseup = function(event){
   
    popWindow.style.top = `${event.offsetY - 30}px`;
    popWindow.style.left = `${event.offsetX - 5}px`;
    popWindow.textContent = clickValue;
    popWindow.classList.remove('hide__element');
    popWindow.classList.add('animation-slide-top');

    setTimeout(getVisible, 300);
}






//getClicks count

const countText = document.getElementById('countOfClicks');
let countOfClicks = 0;
var clickValue = 1;
function getClicks(){
    countOfClicks+=clickValue;
    countText.textContent = countOfClicks;
};

imageOne.addEventListener('click', getClicks);

//play video after click on img

var videoOne = document.getElementById('bgVideo');

play = function(){
    videoOne.volume = 0.5;
    videoOne.play();
}
imageOne.addEventListener("click", play); 

//progressbar
function progressUpdate() {
	// Устанавливаем позицию воспроизведения
    var positionBar = document.getElementById("positionBar");
    positionBar.style.width = (videoOne.currentTime / videoOne.duration * 100)  + "%";
	
  }


//open points window
var scoreBtn = document.getElementById('scoreBtn');
var gradeWindow = document.getElementById('grade');
var gradeSound = document.getElementById('scoreSound');
function openGradeWindow(){
    gradeWindow.classList.remove('hide__element');
    gradeSound.play();
}
scoreBtn.addEventListener('click', openGradeWindow)

//close points window

var gradeCloseBtn = document.getElementById('grade__close');
function closeGradeWindow(){
    gradeWindow.classList.add('hide__element');
    gradeSound.play();
}
gradeCloseBtn.addEventListener('click', closeGradeWindow);