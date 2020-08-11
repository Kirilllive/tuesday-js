var starttouch = null;
var endTime;
window.addEventListener("touchstart",function(event){
	startTime = new Date();
	if(event.touches.length === 1){
		starttouch = event.touches.item(0).clientX;
	}else{
		starttouch = null;
	}
});
window.addEventListener("touchend",function(event){
	var endTime = new Date();
	var timeDiff = endTime - startTime;
	if(starttouch && timeDiff < 500){
		var end = event.changedTouches.item(0).clientX;
		if(end > starttouch + 100){
			back_story()
		}
		if(end < starttouch - 100 ){
			go_story()
		}
	}
});
