let tue_toast;
creation_tost();
function creation_tost() {
	var tue_toast_style = document.createElement('style');
	tue_toast_style.type = 'text/css';
	tue_toast_style.innerHTML = '#toast{position: fixed;opacity: 0;top: -96px;z-index: 1000;}.toast_anim{left: 50%;transform: translateX(-50%);animation: viwe 0.25s, stop 2s 0.25s, close 0.5s 2s linear;}@keyframes viwe {from {opacity: 0; top: 3em}to {opacity: 1; top: 3em}}@keyframes stop {from {opacity: 1; top: 3em}to {opacity: 1; top: 3em}}@keyframes close {from {opacity: 1; top: 3em}to {opacity: 0; top: -96px}}';
	document.getElementsByTagName('head')[0].appendChild(tue_toast_style);
	tue_toast = document.createElement('div');
	tue_toast.id = "toast";
	tue_toast.innerHTML = "<table border='0' height='100%' width='100%'><tbody><tr><td id='toast_message' align='center' valign='center' ></td></tr></tbody></table>";
	document.body.appendChild(tue_toast);
}
function toast(message) {
    tue_toast.classList.remove("toast_anim");
    document.getElementById('toast_message').innerHTML = message
    void tue_toast.offsetParent;
    tue_toast.classList.add("toast_anim");
}
tuesday.addEventListener('creation_dialog', function(event) {
    if (story_json[tue_story][scene].dialogs[dialog].toast){
        if (story_json[tue_story][scene].dialogs[dialog].toast[languare]){toast(story_json[tue_story][scene].dialogs[dialog].toast[languare])}
        else {toast(story_json[tue_story][scene].dialogs[dialog].toast)}
    }
});
