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
   
    popWindow.style.top = `${event.offsetY - 50}px`;
    popWindow.style.left = `${event.offsetX - 20}px`;
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


function RandomObjectMover(obj, container) {
	this.$object = obj;
  this.$container = container;
  this.container_is_window = container === window;
  this.pixels_per_second = 300;
 /*  if(this.$container.clientHeight < this.$container.clientWidth){
    this.pixels_per_second = this.$container.clientHeight / 2;
  }
  else{
    this.pixels_per_second = this.$container.clientWidth / 2;
  }
   */
  this.current_position = { x: 0, y: 0 }; 
  this.is_running = false;

}

// Set the speed of movement in Pixels per Second.
//RandomObjectMover.prototype.setSpeed = function(pxPerSec) {
//	this.pixels_per_second = pxPerSec;
//}

RandomObjectMover.prototype._getContainerDimensions = function() {
   if (this.$container === window) {
        return { 'height' : this.$container.innerHeight, 'width' : this.$container.innerWidth };
   } else {
   	   return { 'height' : this.$container.clientHeight, 'width' : this.$container.clientWidth };
   }
}

RandomObjectMover.prototype._generateNewPosition = function() {

	// Get container dimensions minus div size
  var containerSize = this._getContainerDimensions();
	var availableHeight = (containerSize.height - this.$object.clientHeight) * 0.9;
  var availableWidth = (containerSize.width - this.$object.clientHeight) * 0.9;
 
  // Pick a random place in the space
  var y = Math.floor(Math.random() * availableHeight);
  var x = Math.floor(Math.random() * availableWidth);
    
  return { x: x, y: y };    
}

RandomObjectMover.prototype._calcDelta = function(a, b) {
	var dx   = a.x - b.x;         
  var dy   = a.y - b.y;         
  var dist = Math.sqrt( dx*dx + dy*dy ); 
  return dist;
}

RandomObjectMover.prototype._moveOnce = function() {
		// Pick a new spot on the page
    var next = this._generateNewPosition();
    
    // How far do we have to move?
    var delta = this._calcDelta(this.current_position, next);
    
		// Speed of this transition, rounded to 2DP
		var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    
    //console.log(this.current_position, next, delta, speed);
          
    this.$object.style.transition='transform '+speed+'s linear';
    this.$object.style.transform='translate('+next.x+'px, '+next.y+'px)';
    
    // Save this new position ready for the next call.
    this.current_position = next;
  
};

RandomObjectMover.prototype.start = function() {

	if (this.is_running) {
  	return;
  }

	// Make sure our object has the right css set
  this.$object.willChange = 'transform';
  this.$object.pointerEvents = 'auto';
	
  this.boundEvent = this._moveOnce.bind(this)
  
  // Bind callback to keep things moving
  this.$object.addEventListener('transitionend', this.boundEvent);
  
  // Start it moving
  this._moveOnce();
  
  this.is_running = true;
}



// Init it
var x = new RandomObjectMover(document.getElementById('billyImg'), document.getElementById('mainContainer'));



// Start it off

x.start();



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