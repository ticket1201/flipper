//here is code
var videoOne = document.getElementById('bgVideo');
var imageOne = document.getElementById('billyImg');
play = function(){
    videoOne.play();
}
imageOne.addEventListener("click", play);