const TelegramApi = require('node-telegram-bot-api');
const story_json=JSON.stringify(story_build);
const tue_bot = new TelegramApi(story_json.parameters.telegram, {polling: true});
var tue_languare,tue_scene=0,tue_dialog=0,tue_story;
const start = async () => {
    tue_bot.setMyCommands([
        {command: '/start', description: 'Restart'}
    ])
    tue_bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            tue_languare=(story_json.parameters.languares.includes(msg.from.language_code))?msg.from.language_code:story_json.parameters.languares[0];
            tue_scene=0,tue_dialog=0,tue_story=story_json.parameters.launch_story;
            makeStory(chatId);
        }
    })
    tue_bot.on('callback_query',async msg => {
        const data=msg.data;
        const chatId=msg.message.chat.id;
        //console.log(data)
        if(story_json[data]){
            tue_scene=0,tue_dialog=0,tue_story=data;
            makeStory(chatId);
        }else if(data.includes(',')){
            go=data.split(',')
            tue_story=go[0];
            tue_dialog=go[2];
            tue_scene=go[1];
            makeStory(chatId);
        }
   })
   // TODO 1 show var in text, 2 show button if, 3 legasy choices
   function makeStory(chatId){
        var texts="",buttons=[],block=story_json[tue_story][tue_scene];
        for(i=0;i<block.dialogs.length-tue_dialog;i++){
            if (block.dialogs[tue_dialog].choice){
                texts+=(block.dialogs[tue_dialog].text)?data_la(block.dialogs[tue_dialog].text)+"\n\n":"?";
                for(var e=block.dialogs[tue_dialog].choice.length-1;e>=0;e--){
                    if(!block.dialogs[tue_dialog].choice[e].url){
                        buttons.push([{text:(block.dialogs[tue_dialog].choice[e].text && data_la(block.dialogs[tue_dialog].choice[e].text).length>0)?data_la(block.dialogs[tue_dialog].choice[e].text):"choice "+e , callback_data:((block.dialogs[tue_dialog].choice[e].go_to!="tue_go")?block.dialogs[tue_dialog].choice[e].go_to:tue_story+","+tue_scene+","+(parseInt(tue_dialog)+1)).toString()}])
                    }
                }
                tue_dialog++;break;
            } else {
                texts+=(block.dialogs[tue_dialog].text)?((block.dialogs[tue_dialog].text[tue_languare])?block.dialogs[tue_dialog].text[tue_languare]:block.dialogs[tue_dialog].text)+"\n\n":"";
                tue_dialog++;
            }
        }
        if(buttons.length==0 && block.dialogs.length==tue_dialog+1 && story_json[tue_story].length>tue_scene+1){
            tue_scene++,tue_dialog=0,
            buttons.push([{text:'next', callback_data: 'tue_go' }])
        }
        var background=data_la(block.background_image);
        if(background){tue_bot.sendPhoto(chatId,background,{caption:texts,reply_markup:JSON.stringify({inline_keyboard: buttons})})}
        else{tue_bot.sendMessage(chatId,texts,{reply_markup:JSON.stringify({inline_keyboard: buttons})});}
        
   }
    function data_la(arr){
        var s=(!arr)?false:(arr[tue_languare])?arr[tue_languare]:arr;
        s=(s.length>0)?s:false;
        return s
    }
}
start()
