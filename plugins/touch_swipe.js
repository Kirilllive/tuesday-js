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
	if(starttouch && timeDiff < 500  && controll){
		var end = event.changedTouches.item(0).clientX;
		if(end > starttouch + 40){
			back_story()
		}
		if(end < starttouch - 40 ){
			go_story()
		}
	}
});
