const TelegramApi = require('node-telegram-bot-api');
const story_json=JSON.stringify(story_build);
const tue_bot = new TelegramApi(story_json.parameters.telegram, {polling: true});
var tue_languare,tue_scene=0,tue_dialog=0,tue_story,next_button
const start = async () => {
    tue_bot.setMyCommands([
        {command: '/start', description: 'Restart'}
    ])
    tue_bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            tue_languare=(story_json.parameters.languares.includes(msg.from.language_code))?msg.from.language_code:story_json.parameters.languares[0];
            for(var i=0;i < story_json.parameters.buttons.length;i++){
                if(story_json.parameters.buttons[i].name=="tue_next"){
                    next_button= (story_json.parameters.buttons[i].text)?data_la(story_json.parameters.buttons[i].text):"next";
                    break;
                }
            }
            tue_scene=0,tue_dialog=0,tue_story=story_json.parameters.launch_story;
            makeStory(chatId);
        }
    })
    tue_bot.on('callback_query',async msg => {
        const data=msg.data;
        const chatId=msg.message.chat.id;
        if(story_json[data]){
            tue_scene=0,tue_dialog=0,tue_story=data;
            makeStory(chatId);
        }else if(data.includes(',')){
            go=data.split(',')
            tue_story=go[0];
            tue_dialog=go[2];
            tue_scene=go[1];
            makeStory(chatId);
        }else if(data === 'tue_go'){
            makeStory(chatId)
        }
   })
   function makeStory(chatId){
        var texts="",buttons=[],block=story_json[tue_story][tue_scene];
        if(block.legacy_choice){
            for(var i=0;i < block.legacy_choice.length;i++){
                var choice_n=block.legacy_choice[i][0];
                var choice_s=block.legacy_choice[i][1];
                var choice_v=block.legacy_choice[i][2];
                var choice_g=block.legacy_choice[i][3];
                if(choice_s == ">" && story_json.parameters.variables[choice_n] > choice_v){
                    if(choice_g!="tue_go"){go_to(choice_g);}else{next_scene();}
                    break;
                } else if(choice_s == "<" && story_json.parameters.variables[choice_n] < choice_v){
                    if(choice_g!="tue_go"){go_to(choice_g);}else{next_scene();}
                    break;
                } else if(choice_s == "=" && story_json.parameters.variables[choice_n] == choice_v){
                    if(choice_g!="tue_go"){go_to(choice_g);}else{next_scene();}
                    break;
                } else if(block.legacy_choice[i].go_to){
                    if(block.legacy_choice[i].go_to&&block.legacy_choice[i].go_to!="tue_go"){go_to(block.legacy_choice[i].go_to);}else{next_scene();}
                    break;
                } else if(i == block.legacy_choice.length-1){next_scene();break;}
            }
            function go_to(data){
                if(story_json[data]){
                    tue_scene=0,tue_dialog=0,tue_story=data;
                    makeStory(chatId);
                }else if(data.includes(',')){
                    go=data.split(',')
                    tue_story=go[0];
                    tue_dialog=go[2];
                    tue_scene=go[1];
                    makeStory(chatId);
                }else if(data === 'tue_go'){
                    makeStory(chatId)
                }
            }
            function next_scene(){tue_scene++;tue_dialog=0;makeStory(chatId)}
        } else {
            for(i=0;i<block.dialogs.length-tue_dialog+1;i++){
                if(block.dialogs[tue_dialog].variables){
                    for(var v=0;v < block.dialogs[tue_dialog].variables.length;v++){
                        var choice_n=block.dialogs[tue_dialog].variables[v][0]
                        if(block.dialogs[tue_dialog].variables[v][1] == "add"){
                            story_json.parameters.variables[choice_n] += block.dialogs[tue_dialog].variables[v][2];
                        } else if(block.dialogs[tue_dialog].variables[v][1] == "set"){
                            story_json.parameters.variables[choice_n]=block.dialogs[tue_dialog].variables[v][2];
                        }
                    }
                }
                if (block.dialogs[tue_dialog].choice){
                    texts+=(block.dialogs[tue_dialog].text)?values_button(data_la(block.dialogs[tue_dialog].text))+"\n\n":"?";
                    for(var e=block.dialogs[tue_dialog].choice.length-1;e>=0;e--){
                        if(!block.dialogs[tue_dialog].choice[e].url && block.dialogs[tue_dialog].choice[e].go_to!="tue_no" && show_if(block.dialogs[tue_dialog].choice[e])){
                            buttons.push([{text:(block.dialogs[tue_dialog].choice[e].text && data_la(block.dialogs[tue_dialog].choice[e].text).length>0)?values_button(data_la(block.dialogs[tue_dialog].choice[e].text)):"choice "+e , callback_data:((block.dialogs[tue_dialog].choice[e].go_to!="tue_go")?block.dialogs[tue_dialog].choice[e].go_to:tue_story+","+tue_scene+","+(parseInt(tue_dialog)+1)).toString()}])
                        }
                    }
                    tue_dialog++;break;
                } else {
                    texts+=values_button((block.dialogs[tue_dialog].text)?((block.dialogs[tue_dialog].text[tue_languare])?block.dialogs[tue_dialog].text[tue_languare]:block.dialogs[tue_dialog].text)+"\n\n":"");
                    tue_dialog++;
                }
            }
            if(buttons.length==0 && block.dialogs.length==tue_dialog && story_json[tue_story].length>tue_scene+1){
                tue_scene++;tue_dialog=0;
                buttons.push([{text:next_button, callback_data: 'tue_go' }])
            }
            var background=data_la(block.background_image);
            if(background){tue_bot.sendPhoto(chatId,background,{caption:texts,reply_markup:JSON.stringify({inline_keyboard: buttons})})}
            else{tue_bot.sendMessage(chatId,texts,{reply_markup:JSON.stringify({inline_keyboard: buttons})});}
        }
    }
}
function data_la(arr){
    var s=(!arr)?false:(arr[tue_languare])?arr[tue_languare]:arr;
    s=(s.length>0)?s:false;
    return s
}
function show_if(data){
    show=true;
    if(data.show_if){
        data=data.show_if;
        for(var v=1;v < data.length;v++){
            var var_name=data[v][0],var_oper=data[v][1],var_data=(typeof story_json.parameters.variables[data[v][2]]!=="undefined")?story_json.parameters.variables[data[v][2]]:data[v][2];
            if(var_oper=="="){if(story_json.parameters.variables[var_name] != var_data){show=false; break;}}
            else if(var_oper==">"){if(story_json.parameters.variables[var_name] <= var_data){show=false; break;}}
            else if(var_oper=="<"){if(story_json.parameters.variables[var_name] >= var_data){show=false; break;}}
            if(!show){break;}
        }
        show=data[0]?show:!show;
    }
    return (show)
}
function values_button(e){
    let t=e.matchAll(/<(.*?)>/g);
    t=Array.from(t);
    for(var a=0;a<t.length;a++){
        let o=t[a];
        e=e.replace(o[0],story_json.parameters.variables[o[1]])
    }
    return e
}
start()
