var ho={"startmove_x":null,"startmove_y":null,"scroll_x":null,"scroll_y":null,"scale":1};
function hidden_objects(){
    clearTimeout(dialog_timeout);
    arr_dialog=story_json[tue_story][scene].hidden_objects
    tue_text_view.innerHTML='';
    tuesday.style.backgroundImage='none'
    findobjects=(story_json.parameters.hidden_objects.label.items>arr_dialog.objects.length)?arr_dialog.objects.length:story_json.parameters.hidden_objects.label.items;
    var view=document.createElement("div");
    view.id='tue_hiddenobjects';
    view.style='height:100%;width:100%;overflow:auto;';
    var room=document.createElement("div"),step=Math.round(arr_dialog.objects.length/findobjects),s=0,z=0;
    if(findobjects<arr_dialog.objects.length&&step<2){step=2}
    var r=Math.round(Math.random()*(step-1));
    if(arr_dialog.scale){ho.scale=arr_dialog.scale}
    room.id="tue_objectsroom";
    room.className=arr_dialog.className;
    room.style=arr_dialog.style;
    room.style.width=arr_dialog.size[0]+"px";
    room.style.height=arr_dialog.size[1]+"px";
    room.style.backgroundRepeat="no-repeat";
    room.style.backgroundPosition="center";
    room.style.backgroundSize="cover";
    if(arr_dialog.color){view.style.backgroundColor=art_data(arr_dialog.color);}
    room.style.backgroundImage='url("'+art_data(arr_dialog.art)+'")';
    room.style.position="relative";
    room.style.overflow="hidden";
    var sound=(story_json.parameters.hidden_objects.label_find.sound)?story_json.parameters.hidden_objects.label_find.sound:""
    for(var i=0;i<arr_dialog.objects.length;i++){
        var item=document.createElement("div");
        item.className=arr_dialog.objects[i].className;
        item.style=arr_dialog.objects[i].style;
        item.style.width=arr_dialog.objects[i].size[0]+"px";
        item.style.height=arr_dialog.objects[i].size[1]+"px";
        item.style.backgroundRepeat="no-repeat";
        item.style.backgroundPosition="center";
        item.style.backgroundSize=arr_dialog.objects[i].fit;
        item.style.backgroundImage='url("'+art_data(arr_dialog.objects[i].art)+'")';
        item.style.position="absolute";
        item.style.transformOrigin="top left";
        item.style.transform='rotate('+arr_dialog.objects[i].angle+'deg)';
        item.style.top=arr_dialog.objects[i].position[1]+"px";
        item.style.left=arr_dialog.objects[i].position[0]+"px";
        var name=document.createElement("div");
        if(story_json.parameters.hidden_objects.label.style){name.style=story_json.parameters.hidden_objects.label.style}
        if(story_json.parameters.hidden_objects.label.className){name.className=story_json.parameters.hidden_objects.label.className}
        if(i==r && z<findobjects){
            s+=step;
            item.setAttribute("onclick",'sound_play("'+((arr_dialog.objects[i].sound)?arr_dialog.objects[i].sound:sound)+'");'+((!story_json.parameters.hidden_objects.label_find.no_del_item)?'this.remove();':'this.setAttribute(\'onclick\',\'\')')+((arr_dialog.objects[i].js)?arr_dialog.objects[i].js:'')+';find_item("item'+i+'");');
            name.style.width=story_json.parameters.hidden_objects.label.size[0];
            name.style.height=story_json.parameters.hidden_objects.label.size[1];
            name.style.float="left";
            name.id="item"+i;
            if(story_json.parameters.hidden_objects.label.tip=="text"||!story_json.parameters.hidden_objects.label.tip){
                name.style.display="flex";
                name.style.justifyContent=(story_json.parameters.hidden_objects.label.align)?story_json.parameters.hidden_objects.label.align[0]:"center";
                name.style.alignItems=(story_json.parameters.hidden_objects.label.align)?story_json.parameters.hidden_objects.label.align[1]:"center";
                name.innerHTML=art_data(arr_dialog.objects[i].name)
            }
            if(story_json.parameters.hidden_objects.label.tip=="art"||!story_json.parameters.hidden_objects.label.tip){
                name.style.backgroundRepeat="no-repeat";
                name.style.backgroundPosition=(story_json.parameters.hidden_objects.label.art_align)?story_json.parameters.hidden_objects.label.art_align:"center";
                if(story_json.parameters.hidden_objects.label.color_text){name.style.color=story_json.parameters.hidden_objects.label.color_text;}
                if(story_json.parameters.hidden_objects.label.fit){name.style.backgroundSize=story_json.parameters.hidden_objects.label.fit;}
                else if(story_json.parameters.hidden_objects.label.art_size){
                    if (typeof story_json.parameters.hidden_objects.label.art_size==='object'){name.style.backgroundSize=story_json.parameters.hidden_objects.label.art_size[0]+" "+story_json.parameters.hidden_objects.label.art_size[1];}
                    else {name.style.backgroundSize=story_json.parameters.hidden_objects.label.art_size;}
                }
                name.style.backgroundImage='url("'+art_data(arr_dialog.objects[i].art)+'")';
            }
            if(step>1){r=s+Math.round(Math.random()*(step-1))}
            if((arr_dialog.objects.length-s)<(findobjects-z)){r=s;step=1}
            if(story_json.parameters.hidden_objects.label.color){name.style.backgroundColor=story_json.parameters.hidden_objects.label.color}
            tue_text_view.appendChild(name);
            z++
        }
        room.appendChild(item);
    }
    tue_text_block.style.visibility='visible';
    if(story_json.parameters.text_panel.color){tue_text_block.style.backgroundColor=story_json.parameters.text_panel.color;}
    tue_next.style.visibility='hidden';
    tue_back.style.visibility='hidden';
    view.appendChild(room);
    tuesday.appendChild(view);
    objectsroom_resize();
    tue_objectsroom.style.transformOrigin="left top";
    if(tue_set_audio==0&&arr_dialog.background_music&&!tue_bg_music.src.includes(encodeURI(arr_dialog.background_music))){
        if(tue_bg_music.canPlayType("audio/mpeg")){
            if(arr_dialog.background_music.includes("blob:")){
                tue_bg_music.src=arr_dialog.background_music;
            }else if(arr_dialog.background_music.includes(".mp3")){
                tue_bg_music.src=arr_dialog.background_music;
            }else{tue_bg_music.src=arr_dialog.background_music+".mp3";}
        }else{tue_bg_music.src=arr_dialog.background_music+".ogg";}
        tue_bg_music.loop=true;
        tue_bg_music.play();
    } else if(!arr_dialog.background_music||arr_dialog.background_music==""){tue_bg_music.pause();
    } else if(tue_set_audio==0){tue_bg_music.play();}
    view.onmousedown=function(e) {
        ho.startmove_x=e.clientX;
        ho.startmove_y=e.clientY;
        ho.scroll_x=view.scrollTop;
        ho.scroll_y=view.scrollLeft;
        document.onmousemove=function(e) {
            view.scrollTop=ho.scroll_x-(e.clientY-ho.startmove_y);
            view.scrollLeft=ho.scroll_y-(e.clientX-ho.startmove_x);
        };
        document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        document.onmouseleave=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
    }
}
function objectsroom_resize(){
    var rect=tuesday.getBoundingClientRect();
    if((arr_dialog.size[0]/arr_dialog.size[1])>(rect.width/rect.height)){tue_objectsroom.style.transform='scale('+(rect.height/arr_dialog.size[1])*ho.scale+')'}
    else{tue_objectsroom.style.transform='scale('+(rect.width/arr_dialog.size[0])*ho.scale+')'}
    tue_objectsroom.style.marginBottom="-"+(rect.height+arr_dialog.size[1])+"px";
    tue_objectsroom.style.marginRight="-"+(rect.width+arr_dialog.size[0])+"px"
    tue_objectsroom.style.marginTop="0px";
    tue_objectsroom.style.marginLeft="0px"
}
function find_item(id){
    findobjects--
    if(!story_json.parameters.hidden_objects.label_find.no_del_label){document.getElementById(id).remove();}
    else {
        id=document.getElementById(id);
        if(story_json.parameters.hidden_objects.label_find.className){id.className=story_json.parameters.hidden_objects.label_find.className}
        if(story_json.parameters.hidden_objects.label_find.style){id.className=story_json.parameters.hidden_objects.label_find.style}
        if(story_json.parameters.hidden_objects.label_find.color){id.style.backgroundColor=story_json.parameters.hidden_objects.label_find.color}
        if(story_json.parameters.hidden_objects.label_find.color_text){id.style.color=story_json.parameters.hidden_objects.label_find.color_text;}
    }
    if(findobjects<=0){
        if(arr_dialog.js){eval(arr_dialog.js)}
        tue_hiddenobjects.remove();
        if (arr_dialog.go_to=="tue_go"){scene++;dialog=0;creation_scene();}
        else {go_to(arr_dialog.go_to)}
    }
}
tuesday.addEventListener('hidden_objects',function(event){hidden_objects();});
window.addEventListener('resize',objectsroom_resize,true);
