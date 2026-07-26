function TueAspectRatio(){
    let tue_size=story_json.parameters.resolutions;
    let elem=tuesday.parentNode;
    let rect=elem.getBoundingClientRect();
    let scale;
    if(tue_size&&tue_size[4]){
        if(rect.height==0||rect.width==0){
            scale=(window.innerWidth<window.innerHeight)?window.innerWidth/tue_size[0]:window.innerHeight/tue_size[1];
        }else{
            scale=(rect.width<rect.height)?rect.width/tue_size[0]:rect.height/tue_size[1];
        }
        elem.style.margin="0";
        elem.style.overscrollBehavior="none";
    } else if(tue_size){
        if(rect.height==0||rect.width==0){
            scale=((tue_size[0]/window.innerWidth)>(tue_size[1]/window.innerHeight))?window.innerWidth/tue_size[0]:window.innerHeight/tue_size[1];
            tuesday.style.left=(window.innerWidth-(tue_size[0]*scale))/2+'px';
            tuesday.style.top=(window.innerHeight-(tue_size[1]*scale))/2+'px';
        }else{
            scale=((tue_size[0]/rect.width)>(tue_size[1]/rect.height))?rect.width/tue_size[0]:rect.height/tue_size[1];
            tuesday.style.left=(rect.width-(tue_size[0]*scale))/2+'px';
            tuesday.style.top=(rect.height-(tue_size[1]*scale))/2+'px';
        }
    }
    elem.style.backgroundColor=(tue_size&&tue_size[2]&&tue_size[2].length>0)?tue_size[2]:'#000';
    if(tue_size){elem.style.backgroundImage="url('"+tue_size[3]+"')";}
    elem.style.backgroundPosition="center";
    elem.style.backgroundSize="cover";
    elem.style.overflow='hidden';
    elem.style.position='relative';
    tuesday.style.position='absolute';
    tuesday.style.transformOrigin='left top';
    if(tue_size){
        tuesday.style.width =(tue_size[4]?(rect.width==0?window.innerWidth:rect.width)/scale:tue_size[0])+'px';
        tuesday.style.height=(tue_size[4]?(rect.height==0?window.innerHeight:rect.height)/scale:tue_size[1])+'px';
    }
    tuesday.style.transform='scale('+scale+')';
}
window.addEventListener('script_executed',TueAspectRatio,true);
window.addEventListener('resize',TueAspectRatio,true);
