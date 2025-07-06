
tuesday.addEventListener('script_loaded',function(){
    var tuesday_cursor_style = document.createElement('style');
    tuesday_cursor_style.type='text/css';
    tuesday_cursor_style.innerHTML=".cursor{"+story_json.parameters.cursors.click[3]+";transform:translate(-50%,-50%);position:absolute;display:block;animation-name:cursor_anim;animation-fill-mode:forwards;}@keyframes cursor_anim{from{opacity:1;}to{opacity:0;}}";
    document.getElementsByTagName('head')[0].appendChild(tuesday_cursor_style);
    tuesday.addEventListener('mousedown',(e)=>{
        const click=story_json.parameters.cursors.click;
        let tuesday_cursor=document.createElement("div");
        let rect = tuesday.getBoundingClientRect();
        tuesday_cursor.className="cursor";
        tuesday_cursor.style.width=click[0]+"px";
        tuesday_cursor.style.height=click[1]+"px";
        tuesday_cursor.style.animationDuration=click[2]+"s";
        if(story_json.parameters.resolutions){
            const r=story_json.parameters.resolutions
            tuesday_cursor.style.left=(((r[0]/rect.width)>(r[1]/rect.height)?(r[0]/rect.width):(r[1]/rect.height))*(e.clientX-rect.left))+"px";
            tuesday_cursor.style.top=(((r[0]/rect.width)>(r[1]/rect.height)?(r[0]/rect.width):(r[1]/rect.height))*(e.clientY-rect.top))+"px";
        } else {
            tuesday_cursor.style.left=(e.clientX-rect.left)+"px";
            tuesday_cursor.style.top=(e.clientY-rect.top)+"px";
        }
        
        setTimeout(function(e){tuesday_cursor.remove();},(click[2]*1000));
        tuesday.appendChild(tuesday_cursor);
    })
})


