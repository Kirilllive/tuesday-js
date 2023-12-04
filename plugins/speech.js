const synth=window.speechSynthesis;
tuesday.addEventListener('creation_dialog',()=>{if(story_json.parameters.text_panel.speech_play&&tue_set_audio<2){play_synth()}else{synth.cancel()}})
function play_synth(t,g,s){
    t=(t)?(t=(typeof t=='object')?t[languare]:t):((arr_dialog.text_add)?arr_dialog.text_add:dialog_text);
    if(tue_text_block.style.visibility!='hidden'&&(story_json.parameters.text_panel.speech||arr_dialog.speech)){
        const speech=new SpeechSynthesisUtterance((t)?t:dialog_text);
        if (synth.speaking){synth.cancel()}
        let voice=(g&&g.length>0)?[g,(s)?s:1]:(arr_dialog.speech&&arr_dialog.speech[languare][0].length>0)?arr_dialog.speech[languare]:story_json.parameters.text_panel.speech[languare];
        let all_voice=speechSynthesis.getVoices(),arr_voice=voice[0].split(',').map((item)=>{return item.trim()}),voice_name=false;
        for(v=0;v<all_voice.length;v++){
            all_voice.filter((voice)=>{if(voice.name==arr_voice[v]){voice_name=voice}})
            if(voice_name){break}
        }
        speech.voice=voice_name;
        speech.rate=voice[1];
        synth.speak(speech);
    }
}
