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
let imageOne = document.getElementById('billyImg');
let popWindow = document.getElementById('popWindow');
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
let clickValue = 1;
function getClicks(){
    countOfClicks+=clickValue;
    countText.textContent = countOfClicks;
    return countOfClicks;
};

imageOne.addEventListener('click', getClicks);

//play video after click on img

 let videoOne = document.getElementById('bgVideo');

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
  let containerSize = this._getContainerDimensions();
	let availableHeight = (containerSize.height - this.$object.clientHeight) * 0.9;
  let availableWidth = (containerSize.width - this.$object.clientHeight) * 0.9;
 
  // Pick a random place in the space
  let y = Math.floor(Math.random() * availableHeight);
  let x = Math.floor(Math.random() * availableWidth);
    
  return { x: x, y: y };    
}

RandomObjectMover.prototype._calcDelta = function(a, b) {
	let dx   = a.x - b.x;         
  let dy   = a.y - b.y;         
  let dist = Math.sqrt( dx*dx + dy*dy ); 
  return dist;
}

RandomObjectMover.prototype._moveOnce = function() {
		// Pick a new spot on the page
    let next = this._generateNewPosition();
    
    // How far do we have to move?
    let delta = this._calcDelta(this.current_position, next);
    
		// Speed of this transition, rounded to 2DP
		let speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    
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
let x = new RandomObjectMover(document.getElementById('billyImg'), document.getElementById('mainContainer'));



// Start it off

x.start();



//progressbar
function progressUpdate() {
	// Устанавливаем позицию воспроизведения
    let positionBar = document.getElementById("positionBar");
    positionBar.style.width = (videoOne.currentTime / videoOne.duration * 100)  + "%";
	
}


//open points window
let scoreBtn = document.getElementById('scoreBtn');
let gradeWindow = document.getElementById('grade');
let gradeSound = document.getElementById('scoreSound');
function openGradeWindow(){
    gradeWindow.classList.remove('hide__element');
/*     gradeSound.play();
 */}
scoreBtn.addEventListener('click', openGradeWindow)

//close points window

let gradeCloseBtn = document.getElementById('grade__close');
function closeGradeWindow(){
    gradeWindow.classList.add('hide__element');
/*     gradeSound.play();
 */}
gradeCloseBtn.addEventListener('click', closeGradeWindow);


//points checking func
let gradeElements = document.querySelector('.grade__elements');

let gradeItems = {
  lvl1:{
    item: document.getElementById('grade_lvl1'),
    audio_url: './audio/AH.mp3',
    video_url: './video/feel_good.mp4',
    clickValue: 2
  },

  lvl2:{
    item: document.getElementById('grade_lvl2'),
    audio_url: './audio/Mmm.mp3',
    video_url: './video/zashumel.mp4',
    clickValue: 5
  },

  lvl3:{
    item: document.getElementById('grade_lvl3'),
    audio_url: './audio/nothing.mp3',
    video_url: './video/malii_povzdoslel.mp4',
    clickValue: 10
  },

  lvl4:{
    item: document.getElementById('grade_lvl4'),
    audio_url: './audio/Fisting is 300.mp3',
    video_url: './video/mladshii.mp4',
    clickValue: 20
  },

  lvl5:{
    item: document.getElementById('grade_lvl5'),
    audio_url: './audio/Fuck_you_leather_man.mp3',
    video_url: './video/NILETTO.mp4',
    clickValue: 50
  },

  lvl6:{
    item: document.getElementById('grade_lvl6'),
    audio_url: './audio/Boss_of_this_gym.mp3',
    video_url: './video/king.mp4',
    clickValue: 100
  }
}


function pointsChecker(){
  if(countOfClicks > 50){
    gradeItems.lvl1.item.classList.remove('unavailable');
  }
  if(countOfClicks > 150){
    gradeItems.lvl2.item.classList.remove('unavailable');
  }
  if(countOfClicks > 300){
    gradeItems.lvl3.item.classList.remove('unavailable');
  }
  if(countOfClicks > 800){
    gradeItems.lvl4.item.classList.remove('unavailable');
  }
  if(countOfClicks > 1800){
    gradeItems.lvl5.item.classList.remove('unavailable');
  }
  if(countOfClicks > 5000){
    gradeItems.lvl6.item.classList.remove('unavailable');
  }
}
setInterval(pointsChecker, 1000);



//hander isUnavailable
let gradeSelector = '.grade__item';

let isUnavailable = gradeElements.addEventListener('click', function(event) {
  let closest = event.target.closest(gradeSelector);
  if(closest.classList.contains('unavailable') !== true){
    document.getElementById('smile__spin').src = closest.getElementsByTagName('img')[0].src;
      console.log(closest.id)
      if(closest.id == 'grade_lvl1'){
        videoOne.src = gradeItems.lvl1.video_url;
        skipAudio.src = gradeItems.lvl1.audio_url;
        skipAudio.play()
        play()
        clickValue = gradeItems.lvl1.clickValue
        closeGradeWindow()
      }
      else if(closest.id === 'grade_lvl2'){
        videoOne.src = gradeItems.lvl2.video_url;
        skipAudio.src = gradeItems.lvl2.audio_url;
        skipAudio.play()
        play();
        clickValue = gradeItems.lvl2.clickValue
        closeGradeWindow()
      }
      else if(closest.id === 'grade_lvl3'){
        videoOne.src = gradeItems.lvl3.video_url;
        skipAudio.src = gradeItems.lvl3.audio_url;
        skipAudio.play()
        play();
        clickValue = gradeItems.lvl3.clickValue
        closeGradeWindow()
      }
      else if(closest.id === 'grade_lvl4'){
        videoOne.src = gradeItems.lvl4.video_url;
        skipAudio.src = gradeItems.lvl4.audio_url;
        skipAudio.play()
        play();
        clickValue = gradeItems.lvl4.clickValue
        closeGradeWindow()
      }
      else if(closest.id === 'grade_lvl5'){
        videoOne.src = gradeItems.lvl5.video_url;
        skipAudio.src = gradeItems.lvl5.audio_url;
        skipAudio.play()
        play();
        clickValue = gradeItems.lvl5.clickValue
        closeGradeWindow()
      }
      else if(closest.id === 'grade_lvl6'){
        videoOne.src = gradeItems.lvl6.video_url;
        skipAudio.src = gradeItems.lvl6.audio_url;
        skipAudio.play()
        play();
        clickValue = gradeItems.lvl6.clickValue
        closeGradeWindow()
      }
  }

});


// play sound and smile change
function smileImageChange(){
  /* if(gradeItems.lvl1.classList !){

  } */
}
