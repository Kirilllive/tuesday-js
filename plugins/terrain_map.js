var wmap={"startmove_x":null,"startmove_y":null,"scroll_x":null,"scroll_y":null,"scale":1,};
function terrain_map(){
    clearTimeout(dialog_timeout);
    arr_dialog=story_json[tue_story][scene].terrain_map
    tue_text_view.innerHTML='';
    tuesday.style.backgroundImage='none'
    var view=document.createElement("div");
    view.id='tue_world';
    view.style='height:100%;width:100%;overflow:auto;';
    view.className="tue_html_scene";
    var map=document.createElement("div");
    if(arr_dialog.scale){wmap.scale=arr_dialog.scale}
    map.id="tue_map";
    map.className=arr_dialog.className;
    map.style=arr_dialog.style;
    map.style.width=arr_dialog.size[0]+"px";
    map.style.height=arr_dialog.size[1]+"px";
    map.style.backgroundRepeat=(arr_dialog.repeat)?arr_dialog.repeat:"no-repeat";
    if(arr_dialog.art_align){map.style.backgroundPosition=arr_dialog.art_align;}
    if(arr_dialog.fit){map.style.backgroundSize=(typeof arr_dialog.fit==="object")?arr_dialog.fit[0]+" "+arr_dialog.fit[1]:arr_dialog.fit}
    if(arr_dialog.color){view.style.backgroundColor=art_data(arr_dialog.color);}
    if(arr_dialog.art&&art_data(arr_dialog.art).length>0){map.style.backgroundImage='url("'+art_data(arr_dialog.art)+'")';}
    map.style.position="relative";
    map.style.overflow="hidden";
    map.style.transformOrigin="left top";
    for(var i=0;i<arr_dialog.objects.length;i++){
        var item=document.createElement("div");
        item.className=arr_dialog.objects[i].className;
        item.style=arr_dialog.objects[i].style;
        item.style.width=arr_dialog.objects[i].size[0]+"px";
        item.style.height=arr_dialog.objects[i].size[1]+"px";
        if(arr_dialog.objects[i].fit!='patch'){
            item.style.backgroundRepeat="no-repeat";
            item.style.backgroundPosition="center";
            item.style.backgroundSize=(typeof arr_dialog.objects[i].fit==="object")?arr_dialog.objects[i].fit[0]+" "+arr_dialog.objects[i].fit[1]:arr_dialog.objects[i].fit;
            item.style.backgroundImage='url("'+art_data(arr_dialog.objects[i].art)+'")';
            item.style.backgroundPosition=((arr_dialog.objects[i].art_align)?arr_dialog.objects[i].art_align[0]+" "+arr_dialog.objects[i].art_align[1]:"center");
        }else if (arr_dialog.objects[i].fit=='patch'){
            item.style.backgroundImage="none";
            item.style.backgroundSize="none";
            item.style.backgroundClip="padding-box";
            item.style.borderStyle="solid";
            item.style.borderWidth=arr_dialog.objects[i].patch[0]+"px "+arr_dialog.objects[i].patch[1]+"px "+arr_dialog.objects[i].patch[2]+"px "+arr_dialog.objects[i].patch[3]+"px";
            item.style.borderImage="url('"+art_data(arr_dialog.objects[i].art)+"') "+arr_dialog.objects[i].patch[0]+" "+arr_dialog.objects[i].patch[1]+" "+arr_dialog.objects[i].patch[2]+" "+arr_dialog.objects[i].patch[3]+" stretch stretch";
        } else {tue_id.style.backgroundSize=arr_dialog.objects[i].art_size;}
        item.style.position="absolute";
        item.style.transformOrigin="top left";
        item.style.transform='rotate('+arr_dialog.objects[i].angle+'deg)';
        item.style.top=arr_dialog.objects[i].position[1]+"px";
        item.style.left=arr_dialog.objects[i].position[0]+"px";
        item.style.display="flex";
        if(arr_dialog.objects[i].color){item.style.backgroundColor=arr_dialog.objects[i].color}
        if(arr_dialog.objects[i].name){
            item.innerHTML=art_data(arr_dialog.objects[i].name);
            if(arr_dialog.objects[i].indent_text){item.style.padding=arr_dialog.objects[i].indent_text;}
            if(arr_dialog.objects[i].color_text){item.style.color=arr_dialog.objects[i].color_text}
            if(arr_dialog.objects[i].size_text){item.style.fontSize=arr_dialog.objects[i].size_text}
            if(arr_dialog.objects[i].font_family){item.style.fontFamily=arr_dialog.objects[i].font_family}
            item.style.whiteSpace="pre-wrap";
            if(arr_dialog.objects[i].align){
                item.style.justifyContent=((arr_dialog.objects[i].align)?arr_dialog.objects[i].align[0]:"center");
                item.style.alignItems=((arr_dialog.objects[i].align)?arr_dialog.objects[i].align[1]:"center");
            }else{item.style.justifyContent="center";item.style.alignItems="center"}
        }
        if(story_json.parameters.cursors&&story_json.parameters.cursors.choice){item.style.cursor="url("+art_data(story_json.parameters.cursors.choice[0])+") "+story_json.parameters.cursors.choice[1]+" "+story_json.parameters.cursors.choice[2]+",auto";}
        if(arr_dialog.objects[i].show_if){show_if(arr_dialog.objects[i].show_if,item)}
        var v='';
        if (arr_dialog.objects[i].sound){v+="sound_play('"+arr_dialog.objects[i].sound+"');"}
        else if (arr_dialog.sound){v+="sound_play('"+arr_dialog.sound+"');"}
        if (arr_dialog.objects[i].js){v+=arr_dialog.objects[i].js+";"}
        if (arr_dialog.objects[i].go_to){
            if (arr_dialog.objects[i].text_from){v+="tue_story='"+arr_dialog.objects[i].go_to+"';scene=0;dialog=0;creation_dialog();"}
            else if(arr_dialog.objects[i].url){v+="window.open('"+((arr_dialog.objects[i].go_to[languare])?arr_dialog.objects[i].go_to[languare]:arr_dialog.objects[i].go_to)+"','_"+arr_dialog.objects[i].url+"');"}
            else {v+="tue_world.remove();"+((arr_dialog.objects[i].go_to=="tue_go")?"scene++;dialog=0;creation_scene();":"go_to('"+arr_dialog.objects[i].go_to+"');")}
        }
        item.setAttribute("onclick",v);
        map.appendChild(item);
    }
    view.onmousedown=function(e) {
        wmap.startmove_x=e.clientX;
        wmap.startmove_y=e.clientY;
        wmap.scroll_x=view.scrollTop;
        wmap.scroll_y=view.scrollLeft;
        document.onmousemove=function(e) {
            view.scrollTop=wmap.scroll_x-(e.clientY-wmap.startmove_y);
            view.scrollLeft=wmap.scroll_y-(e.clientX-wmap.startmove_x);
        };
        document.onmouseup=function(e){
            document.onmousemove=null;
            document.onmouseup=null;
            if(arr_dialog.scroll){arr_dialog.scroll[1]=view.scrollTop;arr_dialog.scroll[0]=view.scrollLeft;}
        };
        document.onmouseleave=function(){
			document.onmousemove=null;
			document.onmouseup=null;
            arr_dialog.scroll[1]=view.scrollTop;
            arr_dialog.scroll[0]=view.scrollLeft;
		};
    }
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
    tue_next.style.visibility='hidden';
    tue_back.style.visibility='hidden';
    view.appendChild(map);
    tuesday.appendChild(view);
    worldmap_resize();
    if(arr_dialog.scroll){view.scrollTop=arr_dialog.scroll[1];view.scrollLeft=arr_dialog.scroll[0];}
}
function worldmap_resize(){
    var rect=tuesday.getBoundingClientRect();
    if((arr_dialog.size[0]/arr_dialog.size[1])>(rect.width/rect.height)){tue_map.style.transform='scale('+(rect.height/arr_dialog.size[1])*wmap.scale+')'}
    else{tue_map.style.transform='scale('+(rect.width/arr_dialog.size[0])*wmap.scale+')'}
    tue_map.style.marginBottom="-"+(rect.height+arr_dialog.size[1])+"px";
    tue_map.style.marginRight="-"+(rect.width+arr_dialog.size[0])+"px"
    tue_map.style.marginTop="0px";
    tue_map.style.marginLeft="0px"
}
tuesday.addEventListener('terrain_map',function(event){terrain_map();});
window.addEventListener('resize',worldmap_resize,true);
