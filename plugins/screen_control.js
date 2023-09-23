let tue_screen_control=true;
tuesday.addEventListener('mouseup',function(e){
    if(tue_screen_control && e.pageX > tuesday.offsetWidth/3 ){if(!story_json[tue_story][scene].dialogs[dialog].choice){go_story()}}
    else if(tue_screen_control && ( !document.getElementById('tue_back') || (document.getElementById('tue_back') && tue_back.style.visibility=='visible')) ){back_story()};
    tue_screen_control=true;
});
tuesday.addEventListener('script_loaded',function(event){
    if(document.getElementById('tue_back')){tue_back.style.pointerEvents='none'};
    if(document.getElementById('tue_next')){tue_next.style.pointerEvents='none'};
    var buttons=document.getElementById("tuesday").getElementsByClassName("tue_controll");
    for(var i=0;i < buttons.length;i++){buttons[i].setAttribute('onmouseup', 'tue_screen_control=false;');}
});
