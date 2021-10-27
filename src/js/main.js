//here is code
var videoOne = document.getElementById('bgVideo');
var imageOne = document.getElementById('billyImg');
play = function(){
    videoOne.play();
}
imageOne.addEventListener("click", play);

const signInBtn = document.getElementById('welcome__btn');
let welcome = document.getElementById('startWindow');
let getSignInInfo = function(){
    welcome.classList.add('hide__element');
}

signInBtn.addEventListener('click', getSignInInfo)