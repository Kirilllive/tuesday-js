let tue_screen_control=true;
tuesday.addEventListener('mouseup',function(e){
    if(tue_screen_control && e.pageX > tuesday.offsetWidth/3 ){if(story_json[tue_story][scene].dialogs==0 || check_choice(story_json[tue_story][scene].dialogs)){go_story()}}
    else if( story_json[tue_story][scene].dialogs==0 || check_choice(story_json[tue_story][scene].dialogs) && tue_screen_control){back_story()};
    tue_screen_control=true;
});
tuesday.addEventListener('script_loaded',function(event){
    if(document.getElementById('tue_back')){tue_back.style.pointerEvents='none'};
    if(document.getElementById('tue_next')){tue_next.style.pointerEvents='none'};
    var buttons=document.getElementById("tuesday").getElementsByClassName("tue_controll");
    for(var i=0;i < buttons.length;i++){buttons[i].setAttribute('onmouseup','tue_screen_control=false;');}
});
