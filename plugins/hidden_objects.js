var findobjects = 0
var startmove_x = null;
var startmove_y = null;
var scroll_x = null;
var scroll_y = null;
function size_scene(){
    arr_dialog = story_json[tue_story][scene].hidden_objects
    findobjects=arr_dialog.laibl.items;
    var view=document.createElement("div");
    view.id='tue_hiddenobjects';
    view.style='height:100%;width:100%;overflow:auto;';
    var room=document.createElement("div");
    var step=Math.round(arr_dialog.objects.length / arr_dialog.laibl.items);
    var s=0,z=0;
    if(arr_dialog.laibl.items<arr_dialog.objects.length&&step<2){step=2}
    var r=Math.round(Math.random()*(step-1));
    room.id="tue_objectsroom";
    room.style.width= arr_dialog.size[0]+"px";
    room.style.height=arr_dialog.size[1]+"px";
    room.style.backgroundRepeat="no-repeat";
    room.style.backgroundPosition="center";
    room.style.backgroundSize="cover";
    if(arr_dialog.color){room.style.backgroundColor=arr_dialog.color;}
    room.style.backgroundImage='url("'+arr_dialog.art+'")';
    room.style.position="relative"
    for(var i=0;i<arr_dialog.objects.length;i++){
        var item=document.createElement("div");
        item.style.width=arr_dialog.objects[i].size[0]+"px";
        item.style.height=arr_dialog.objects[i].size[1]+"px";
        item.style.backgroundRepeat="no-repeat";
        item.style.backgroundPosition="center";
        item.style.backgroundSize=arr_dialog.objects[i].fit;
        item.style.backgroundImage='url("'+arr_dialog.objects[i].art+'")';
        item.style.position="absolute";
        item.style.top=arr_dialog.objects[i].position[1]+"px";
        item.style.left=arr_dialog.objects[i].position[0]+"px";
        var name=document.createElement("div");
        if(i==r && z<arr_dialog.laibl.items){
            s+=step;
            item.setAttribute("onclick",'this.remove();find_item();');
            name.style.width=arr_dialog.laibl.size[0];
            name.style.height=arr_dialog.laibl.size[1];
            name.style.float="left";
            if(arr_dialog.laibl.tip=="text"){
                name.style.display="flex";
                name.style.justifyContent="center";
                name.style.alignItems="center";
                name.innerHTML=arr_dialog.objects[i].name['en']
            }else{
                name.style.backgroundRepeat="no-repeat";
                name.style.backgroundPosition="center";
                name.style.backgroundSize=arr_dialog.objects[i].fit;
                name.style.backgroundImage='url("'+arr_dialog.objects[i].art+'")';
            }
            r=s+Math.round(Math.random()*(step-1));
            if(!arr_dialog.objects[r]){step=1;r=arr_dialog.objects.length-1;}
            if(arr_dialog.laibl.style){name.style=arr_dialog.laibl.style;}
            if(arr_dialog.laibl.color){name.style.backgroundColor=arr_dialog.laibl.color}
            tue_text_view.appendChild(name);
            z++
        }
        tue_text_block.style.visibility='visible';
        room.appendChild(item);
    }
    view.appendChild(room);
    tuesday.appendChild(view);
    //size
    var rect=tuesday.getBoundingClientRect();
    if((arr_dialog.size[0]/arr_dialog.size[1])>(rect.width/rect.height)){tue_objectsroom.style.transform='scale('+rect.height/arr_dialog.size[1]+')'}
    else{tue_objectsroom.style.transform='scale('+rect.width/arr_dialog.size[0]+')'}
    tue_objectsroom.style.transformOrigin="left top";
    tue_objectsroom.style.marginBottom=arr_dialog.size[1]*-1+"px";
    tue_objectsroom.style.marginRight=arr_dialog.size[0]*-1+"px";
    //move
    view.ontouchstart = function(e) {
        startmove_x = e.touches[0].clientX;
        startmove_y = e.touches[0].clientY;
        scroll_x = view.scrollTop;
        scroll_y = view.scrollLeft;
        view.ontouchmove = function(e) {
            view.scrollTop = scroll_x - (e.touches[0].clientY - startmove_y);
            view.scrollLeft = scroll_y - (e.touches[0].clientX - startmove_x);
        };
        view.ontouchend = function (e){
            startmove_x = null;
            startmove_y = null;
            view.ontouchmove = null;
            view.ontouchend = null;
        };
    }
    view.onmousedown = function(e) {
        startmove_x = e.clientX;
        startmove_y = e.clientY;
        scroll_x = view.scrollTop;
        scroll_y = view.scrollLeft;
        view.onmousemove = function(e) {
            view.scrollTop = scroll_x - (e.clientY - startmove_y);
            view.scrollLeft = scroll_y - (e.clientX - startmove_x);
        };
        view.onmouseup = function (e){
            startmove_x = null;
            startmove_y = null;
            view.onmousemove = null;
            view.onmouseup = null;
        };
    }
}
function find_item(){
    findobjects--
    if(findobjects==0){alert(arr_dialog.end)}
}
tuesday.addEventListener('hidden_objects',function(event){size_scene();});
