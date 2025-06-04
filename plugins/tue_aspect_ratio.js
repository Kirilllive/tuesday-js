function TueAspectRatio(){
    let tue_size=story_json.parameters.resolutions;
    let elem=tuesday.parentNode;
    let rect=elem.getBoundingClientRect();
    let scale;
    if( rect.height==0 || rect.width==0 ){
        scale=(story_json.parameters.resolutions[4])?((tue_size[0]/window.innerWidth)<(tue_size[1]/window.innerHeight))?window.innerWidth/tue_size[0]:window.innerHeight/tue_size[1]:((tue_size[0]/window.innerWidth)>(tue_size[1]/window.innerHeight))?window.innerWidth/tue_size[0]:window.innerHeight/tue_size[1];
        tuesday.style.left=(window.innerWidth-(tue_size[0]*scale))/2+'px';
        tuesday.style.top=(window.innerHeight-(tue_size[1]*scale))/2+'px';
    }else{
        scale=(story_json.parameters.resolutions[4])?((tue_size[0]/rect.width)<(tue_size[1]/rect.height))?rect.width/tue_size[0]:rect.height/tue_size[1]:((tue_size[0]/rect.width)>(tue_size[1]/rect.height))?rect.width/tue_size[0]:rect.height/tue_size[1];
        tuesday.style.left=(rect.width-(tue_size[0]*scale))/2+'px';
        tuesday.style.top=(rect.height-(tue_size[1]*scale))/2+'px';
    }
    elem.style.backgroundColor=(tue_size[2]&&tue_size[2].length>0)?tue_size[2]:'#000';
    elem.style.backgroundImage="url('"+tue_size[3]+"')";
    elem.style.backgroundPosition="center";
    elem.style.backgroundSize="cover";
    elem.style.overflow='hidden';
    elem.style.position='relative';
    tuesday.style.position='absolute';
    tuesday.style.transformOrigin='left top';
    tuesday.style.width =tue_size[0]+'px';
    tuesday.style.height=tue_size[1]+'px';
    tuesday.style.transform='scale('+scale+')';
}
window.addEventListener('script_executed',TueAspectRatio,true);
window.addEventListener('resize',TueAspectRatio,true);
