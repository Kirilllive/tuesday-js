tuesday.addEventListener('script_loaded',function(){
    var tuesday_cursor_style = document.createElement('style');
    tuesday_cursor_style.type='text/css';
    tuesday_cursor_style.innerHTML=".cursor{background: center / contain no-repeat url('"+story_json.parameters.touch_show[0]+"');"+story_json.parameters.touch_show[4]+";transform:translate(-50%,-50%);position:absolute;display:block;animation-name:cursor_anim;animation-fill-mode:forwards;pointer-events:none;z-index:3010;}@keyframes cursor_anim{from{opacity:1;}to{opacity:0;}}";
    document.getElementsByTagName('head')[0].appendChild(tuesday_cursor_style);
    tuesday.addEventListener((story_json.parameters.touch_show[6]?'touchstart':'mousedown'),(e)=>{
        const click=story_json.parameters.touch_show;
        let tuesday_cursor=document.createElement("div");
        let rect = tuesday.getBoundingClientRect();
        let p=(click[6])?[e.touches[0].pageX,e.touches[0].pageY]:[e.clientX,e.clientY];
        tuesday_cursor.className="cursor "+story_json.parameters.touch_show[5];
        tuesday_cursor.style.width=click[1];
        tuesday_cursor.style.height=click[2];
        tuesday_cursor.style.animationDuration=click[3]+"s";
        if(story_json.parameters.resolutions){
            const r=story_json.parameters.resolutions
            tuesday_cursor.style.left=(((r[0]/rect.width)>(r[1]/rect.height)?(r[0]/rect.width):(r[1]/rect.height))*(p[0]-rect.left))+"px";
            tuesday_cursor.style.top=(((r[0]/rect.width)>(r[1]/rect.height)?(r[0]/rect.width):(r[1]/rect.height))*(p[1]-rect.top))+"px";
        } else {
            tuesday_cursor.style.left=(p[0]-rect.left)+"px";
            tuesday_cursor.style.top=(p[1]-rect.top)+"px";
        }
        setTimeout(function(e){tuesday_cursor.remove();},(click[3]*1000));
        tuesday.appendChild(tuesday_cursor);
    })
})
