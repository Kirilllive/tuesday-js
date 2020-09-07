let story_json = new Array();
var tuesday = document.getElementById("tuesday");
var tue_text_view;
var tue_text_block;
var tue_name_block = document.createElement("div");
var languare;
var scene = 0;
var dialog = 0;
var dialog_text;
var dialog_speed = 50;
var dialog_letter = 0;
var dialog_timeout;
var tue_story;
var tue_bg_music;
document.addEventListener('keydown', function(event) {
    var k = event.code;
    if (k == story_json.parameters.key.next) {go_story ();}
    else if (k == story_json.parameters.key.back) {back_story ();}
    else if (k == story_json.parameters.key.main) {var g = story_json.parameters.launch_story; go_to(g);}
    else if (k == story_json.parameters.key.save) {save_stag('bookmark');}
    else if (k == story_json.parameters.key.load) {load_stag('bookmark');}
    else if (k == story_json.parameters.key.autosave) {load_stag('auto');}
});
function get_lang() {
    if (navigator.languages != undefined) {languare = navigator.languages[0].substring(0,2);}
    else {languare = navigator.languagesubstring(0,2)}
    var support;
    for (var i = 0; i < story_json.parameters.languares.length; i++){
        if (languare == story_json.parameters.languares[i]) {support = true }
    }
    if (!support){languare = story_json.parameters.languares[0]}
} function load_story(tip, url) {
    if (tip == 'data'){
        story_json = url;
        base_creation();
		creation_sound ();
		tuesday.dispatchEvent(new Event('script_loaded'));
    } else if (tip == 'file') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
				try {story_json = JSON.parse(this.responseText);} 
				catch (e) { if (this.status > 0){alert('Json structure error')}}
                base_creation();
				creation_sound ();
                tuesday.dispatchEvent(new Event('script_loaded'));
				tuesday.dispatchEvent(new Event('script_loaded'));
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
		xmlhttp.onerror = function() {
			if (this.status == 0) {alert( 'Error load json file Cross-Origin Resource Sharing (CORS)' );}
		}
    }
} function base_creation() {
    get_lang();
	if (story_json.parameters.style_file){add_style(story_json.parameters.style_file)}
    dialog_speed = story_json.parameters.text_panel.dialog_speed;
    if (story_json.parameters.title){
        if (story_json.parameters.title[languare]){document.title = story_json.parameters.title[languare];
        } else {document.title = story_json.parameters.title;}
    }
    tuesday.style.backgroundRepeat = "no-repeat";
    tuesday.style.backgroundSize = "cover";
    tuesday.style.backgroundPosition = "center";
    tuesday.style.position = "relative"
    tuesday.style.overflow = "hidden";
    tuesday.innerHTML = "<table id='tue_text_block' align='center'><tbody><tr><td id='tue_text_view'></td></tr></tbody></table>";
    tue_text_block = document.getElementById("tue_text_block");
    if(story_json.parameters.text_panel.className){tue_text_block.className = story_json.parameters.text_panel.className;}
    if(story_json.parameters.text_panel.style){tue_text_block.style = story_json.parameters.text_panel.style;}
    tue_text_block.style.position = "absolute";
    tue_text_block.style.bottom = story_json.parameters.text_panel.indent_bottom;
    tue_text_block.style.width = story_json.parameters.text_panel.size[0];
    tue_text_block.style.height = story_json.parameters.text_panel.size[1];
    tue_text_block.style.left= "0";
    tue_text_block.style.right= "0";
    tue_text_block.style.zIndex = "1000";
    tue_text_view = document.getElementById("tue_text_view");
    tue_text_view.style.padding = story_json.parameters.text_panel.indent_text;
    tue_text_view.style.fontSize = story_json.parameters.text_panel.size_text;
    if (story_json.parameters.name_panel) {
        if(story_json.parameters.name_panel.className){tue_name_block.className = story_json.parameters.name_panel.className;}
        if(story_json.parameters.name_panel.style){tue_name_block.style = story_json.parameters.name_panel.style;}
		if(story_json.parameters.name_panel.color){tue_name_block.style.backgroundColor = story_json.parameters.name_panel.color;}
		if(story_json.parameters.name_panel.color_text){tue_name_block.style.color = story_json.parameters.name_panel.color_text;}
		tue_name_block.style.position = "absolute";
        tue_name_block.id = "tue_name_block";
        tue_name_block.style.padding = story_json.parameters.name_panel.indent_text;
        tue_name_block.style.fontSize = story_json.parameters.name_panel.size_text;
        tue_name_block.style.textAlign = "center";
        if (tue_name_block.style.width = story_json.parameters.name_panel.size[0] != 0) {tue_name_block.style.width = story_json.parameters.name_panel.size[0];}
        tue_name_block.style.height = story_json.parameters.name_panel.size[1];
        tue_name_block.style.lineHeight = story_json.parameters.name_panel.size[1];
        if (story_json.parameters.name_panel.position[0] != 0){tue_name_block.style.left = story_json.parameters.name_panel.position[0];}
        if (story_json.parameters.name_panel.position[1] != 0){tue_name_block.style.right = story_json.parameters.name_panel.position[1];}
        if (story_json.parameters.name_panel.position[2] != 0){tue_name_block.style.top = story_json.parameters.name_panel.position[2];}
        if (story_json.parameters.name_panel.position[3] != 0){tue_name_block.style.bottom = story_json.parameters.name_panel.position[3];}
        tue_name_block.style.zIndex = 1001;
        tue_text_block.appendChild(tue_name_block);
    }
    tue_bg_music = document.createElement("AUDIO");
    tue_bg_music.id = "tue_bg_music";
    tuesday.appendChild(tue_bg_music);
    if (story_json.parameters.launch_story){
		tue_story = story_json.parameters.launch_story;
	} else {
		for (var i = 0; i < 2; i++) {
			if (Object.getOwnPropertyNames(story_json)[i] != "parameters") {
				story_json.parameters.launch_story = Object.getOwnPropertyNames(story_json)[1] ;
				tue_story = story_json.parameters.launch_story; 
				break;
			}
		}
	}
	creation_buttons();
    creation_scene();
} function creation_buttons() {
    for (i = 0; i < story_json.parameters.buttons.length; i++){
        var button = document.createElement("div");
		if(story_json.parameters.buttons[i].sound){button.setAttribute ( "onclick", (story_json.parameters.buttons[i].sound)?get_sound(story_json.parameters.buttons[i].sound):"" + (story_json.parameters.buttons[i].sound_stop)?get_stop_sound(story_json.parameters.buttons[i].sound_stop):"")}
        if(story_json.parameters.buttons[i].className){button.className = story_json.parameters.buttons[i].className;}
        if(story_json.parameters.buttons[i].style){button.style = story_json.parameters.buttons[i].style;}
		if(story_json.parameters.buttons[i].text){
            button.innerHTML = (story_json.parameters.buttons[i].text[languare])?story_json.parameters.buttons[i].text[languare]:story_json.parameters.buttons[i].text;
            button.style.textAlign = "center";
            button.style.color = story_json.parameters.buttons[i].color_text;
            button.style.padding = story_json.parameters.buttons[i].indent_text;
            button.style.fontSize = story_json.parameters.buttons[i].size_text;
        }
        button.style.zIndex = 2000 + i;
        button.id = story_json.parameters.buttons[i].name;
        button.classList.add("tue_controll");
        button.style.position = "absolute";
        button.style.width = story_json.parameters.buttons[i].size[0];
        button.style.height = story_json.parameters.buttons[i].size[1];
        button.style.backgroundColor = story_json.parameters.buttons[i].color;
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundPosition = "center";
        button.style.backgroundImage = "url('" + story_json.parameters.buttons[i].art + "')";
        if (story_json.parameters.buttons[i].art_size) {button.style.backgroundSize = story_json.parameters.buttons[i].art_size[0] + " " + story_json.parameters.buttons[i].art_size[1];}
        if (story_json.parameters.buttons[i].position[0] != 0){button.style.left = story_json.parameters.buttons[i].position[0];}
        if (story_json.parameters.buttons[i].position[1] != 0){button.style.right = story_json.parameters.buttons[i].position[1];}
        if (story_json.parameters.buttons[i].position[2] != 0){button.style.top = story_json.parameters.buttons[i].position[2];}
        if (story_json.parameters.buttons[i].position[3] != 0){button.style.bottom = story_json.parameters.buttons[i].position[3];}
        tuesday.appendChild(button);
    }
    if(document.getElementById('tue_next')){document.getElementById('tue_next').addEventListener('click', function(){go_story ()});}
    if(document.getElementById('tue_back')){document.getElementById('tue_back').addEventListener('click', function(){back_story ()});}
    if(document.getElementById('tue_home')){
        var g = story_json.parameters.launch_story;
        document.getElementById('tue_home').addEventListener('click', function() {go_to(g)});
    }
    if(document.getElementById('tue_save')){document.getElementById('tue_save').addEventListener('click',function(){save_stag('bookmark')});}
    if(document.getElementById('tue_load')){document.getElementById('tue_load').addEventListener('click',function(){load_stag('bookmark')});}
} function creation_scene() {
    if (story_json[tue_story][scene].legacy_choice){
        for (var i = 0; i < story_json[tue_story][scene].legacy_choice.length; i++) {
            var choice_n = story_json[tue_story][scene].legacy_choice[i][0];
            var choice_s = story_json[tue_story][scene].legacy_choice[i][1];
            var choice_v = story_json[tue_story][scene].legacy_choice[i][2];
            var choice_g = story_json[tue_story][scene].legacy_choice[i][3];
            if (choice_s == ">" && story_json.parameters.variables[choice_n] > choice_v) {
                go_to(choice_g);
                break;
            } else if (choice_s == "<" && story_json.parameters.variables[choice_n] < choice_v) {
                go_to(choice_g);
                break;
            } else if (choice_s == "=" && story_json.parameters.variables[choice_n] == choice_v) {
                go_to(choice_g);
                break;
            } else if (story_json[tue_story][scene].legacy_choice[i].go_to) {
                go_to(story_json[tue_story][scene].legacy_choice[i].go_to);
                break;
            } else if (i == story_json[tue_story][scene].legacy_choice.length-1) {
                scene++;
                dialog = 0;
                creation_scene();
            }
        }
    }
    if (story_json[tue_story][scene].background_image){
        if (story_json[tue_story][scene].background_image[languare]) {tuesday.style.backgroundImage = "url('" + story_json[tue_story][scene].background_image[languare] + "')";}
        else {tuesday.style.backgroundImage = "url('" + story_json[tue_story][scene].background_image + "')";}
    }
    var buttons = document.getElementById("tuesday").getElementsByClassName("tue_controll");
    for (var i = 0; i < buttons.length; i++) {
        if (tue_story == story_json.parameters.launch_story){buttons[i].style.visibility = "hidden";}
        else {buttons[i].style.visibility = "visible";}
    }
    creation_dialog ();
    if(story_json[tue_story][scene].background_music){search_music()}
} function creation_dialog () {
		tue_next.style.visibility = 'visible';
        if (story_json[tue_story][scene].dialogs[dialog].color) {tue_text_block.style.backgroundColor = story_json[tue_story][scene].dialogs[dialog].color;}
        else if (story_json.parameters.text_panel.color) {tue_text_block.style.backgroundColor = story_json.parameters.text_panel.color;}
        if (story_json[tue_story][scene].dialogs[dialog].color_text) {tue_text_view.style.color = story_json[tue_story][scene].dialogs[dialog].color_text;}
		else if (story_json.parameters.text_panel.color_text) {tue_text_view.style.color = story_json.parameters.text_panel.color_text;}
        if (story_json[tue_story][scene].dialogs[dialog].text){
            tue_text_block.style.visibility = 'visible';
            tue_text_view.innerHTML = "";
            values_in_text(false);
            clearTimeout(dialog_timeout);
            anim_text();
            if(story_json[tue_story][scene].dialogs[dialog].text.className){ tue_text_block.className = story_json[tue_story][scene].dialogs[dialog].text.className}
        } else if (story_json[tue_story][scene].dialogs[dialog].text_add) {
			tue_text_block.style.visibility = 'visible';
			tue_text_view.innerHTML = "";
			values_in_text(true);
            clearTimeout(dialog_timeout);
            anim_text();
		} else {tue_text_block.style.visibility = 'hidden';}
        if (story_json[tue_story][scene].dialogs[dialog].name) {
            if (story_json[tue_story][scene].dialogs[dialog].name[languare]) {
                tue_name_block.innerHTML = story_json[tue_story][scene].dialogs[dialog].name[languare]
                tue_name_block.style.backgroundColor = story_json[tue_story][scene].dialogs[dialog].name.color;
                tue_name_block.style.color = story_json[tue_story][scene].dialogs[dialog].name.color_text;
                if(story_json[tue_story][scene].dialogs[dialog].name.className){ tue_name_block.className = story_json[tue_story][scene].dialogs[dialog].name.className}
            } else if (story_json.parameters.characters) {
				if (story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name]){
                tue_name_block.innerHTML = story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name][languare]
                tue_name_block.style.backgroundColor = story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name].color;
                tue_name_block.style.color = story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name].color_text;
					if(story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name].className){
						tue_name_block.className = story_json.parameters.characters[story_json[tue_story][scene].dialogs[dialog].name].className
					}
				} else {
					tue_name_block.innerHTML = story_json[tue_story][scene].dialogs[dialog].name
					tue_name_block.style.backgroundColor = story_json[tue_story][scene].dialogs[dialog].name.color;
					tue_name_block.style.color = story_json[tue_story][scene].dialogs[dialog].name.color_text;
					if(story_json[tue_story][scene].dialogs[dialog].name.className){ tue_name_block.className = story_json[tue_story][scene].dialogs[dialog].name.className}
				}	
			} else {
				tue_name_block.innerHTML = story_json[tue_story][scene].dialogs[dialog].name
			}
            tue_name_block.style.visibility = 'visible';
        } else {tue_name_block.style.visibility = 'hidden';}
        del_element("tue_art");
        if (story_json[tue_story][scene].dialogs[dialog].art){
            for (i = 0; i < story_json[tue_story][scene].dialogs[dialog].art.length; i++){
                var art = document.createElement("img");
                if (story_json[tue_story][scene].dialogs[dialog].art[i].url[languare]){
                art.src = story_json[tue_story][scene].dialogs[dialog].art[i].url[languare];}
                else if (story_json[tue_story][scene].dialogs[dialog].art[i].url){
                art.src = story_json[tue_story][scene].dialogs[dialog].art[i].url;}
                art.className = "tue_art"
                if(story_json[tue_story][scene].dialogs[dialog].art[i].style){art.style = story_json[tue_story][scene].dialogs[dialog].art[i].style;}
                art.style.position = "absolute";
                if (story_json[tue_story][scene].dialogs[dialog].art[i].size) {
                    art.style.width = story_json[tue_story][scene].dialogs[dialog].art[i].size[0];
                    art.style.height = story_json[tue_story][scene].dialogs[dialog].art[i].size[1];
                }
                if (story_json[tue_story][scene].dialogs[dialog].art[i].position[0] != 0){art.style.left= story_json[tue_story][scene].dialogs[dialog].art[i].position[0];}
                if (story_json[tue_story][scene].dialogs[dialog].art[i].position[1] != 0){art.style.right= story_json[tue_story][scene].dialogs[dialog].art[i].position[1];}
                if (story_json[tue_story][scene].dialogs[dialog].art[i].position[2] != 0){art.style.top= story_json[tue_story][scene].dialogs[dialog].art[i].position[2];}
                if (story_json[tue_story][scene].dialogs[dialog].art[i].position[3] != 0){art.style.bottom= story_json[tue_story][scene].dialogs[dialog].art[i].position[3];}
                tuesday.appendChild(art);
            }
        }
        if (story_json[tue_story][scene].dialogs[dialog].choice) {
			tue_next.style.visibility = 'hidden';
            for (i = 0; i < story_json[tue_story][scene].dialogs[dialog].choice.length; i++) {
                var choice = document.createElement("div");
                if(story_json[tue_story][scene].dialogs[dialog].choice[i].className){choice.className = story_json[tue_story][scene].dialogs[dialog].choice[i].className;}
                if(story_json[tue_story][scene].dialogs[dialog].choice[i].style){choice.style = story_json[tue_story][scene].dialogs[dialog].choice[i].style;}
                choice.classList.add("tue_choice");
                choice.style.position = "absolute";
                choice.style.backgroundColor = story_json[tue_story][scene].dialogs[dialog].choice[i].color;
                choice.style.backgroundRepeat = "no-repeat";
                choice.style.backgroundPosition = "center";
                choice.style.backgroundImage = "url('" + story_json[tue_story][scene].dialogs[dialog].choice[i].art + "')";
                if (choice.style.width = story_json[tue_story][scene].dialogs[dialog].choice[i].size[0] != 0) {
                    choice.style.width = story_json[tue_story][scene].dialogs[dialog].choice[i].size[0];}
                if (choice.style.height = story_json[tue_story][scene].dialogs[dialog].choice[i].size[1] != 0) {
                    choice.style.height = story_json[tue_story][scene].dialogs[dialog].choice[i].size[1];
                    choice.style.lineHeight = story_json[tue_story][scene].dialogs[dialog].choice[i].size[1];
                }
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].art_size){
                    choice.style.backgroundSize = story_json[tue_story][scene].dialogs[dialog].choice[i].art_size[0] + " " + story_json[tue_story][scene].dialogs[dialog].choice[i].art_size[1];
                }
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].position[0] != 0){choice.style.left = story_json[tue_story][scene].dialogs[dialog].choice[i].position[0];}
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].position[1] != 0){choice.style.right = story_json[tue_story][scene].dialogs[dialog].choice[i].position[1];}
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].position[2] != 0){choice.style.top = story_json[tue_story][scene].dialogs[dialog].choice[i].position[2];}
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].position[3] != 0){choice.style.bottom = story_json[tue_story][scene].dialogs[dialog].choice[i].position[3];}
                choice.style.color = story_json[tue_story][scene].dialogs[dialog].choice[i].color_text;
                choice.style.padding = story_json[tue_story][scene].dialogs[dialog].choice[i].indent_text;
                choice.style.fontSize = story_json[tue_story][scene].dialogs[dialog].choice[i].size_text;
                choice.style.textAlign = "center";
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].text){
                    if (story_json[tue_story][scene].dialogs[dialog].choice[i].text[languare]){choice.innerHTML = story_json[tue_story][scene].dialogs[dialog].choice[i].text[languare];}
                    else {choice.innerHTML = story_json[tue_story][scene].dialogs[dialog].choice[i].text;}
                }
				var v = '';
				if (story_json[tue_story][scene].dialogs[dialog].choice[i].variables) {
					for (var g = 0; g < story_json[tue_story][scene].dialogs[dialog].choice[i].variables.length; g++) {
						if (story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][1] == "add"){
							v += "story_json.parameters.variables['" + story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][0] + "']" + " += " + story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][2] + "; "
						}
						else if (story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][1] == "set"){
							v += "story_json.parameters.variables['" + story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][0] + "']" + " = " + story_json[tue_story][scene].dialogs[dialog].choice[i].variables[g][2] + "; "
						}
					}
				}
                if (story_json[tue_story][scene].dialogs[dialog].choice[i].go_to) {
					var g = story_json[tue_story][scene].dialogs[dialog].choice[i].go_to;
					if (g == "tue_load_autosave") {choice.setAttribute("onclick","load_stag('auto')" + add_sound ());}
					else if (g == "load") {choice.setAttribute("onclick","load_stag('bookmark')" + add_sound ());}
					else {
						choice.setAttribute("onclick", v + "go_to('" + g + "');" + add_sound ())
					}
					tuesday.appendChild(choice);
				} else {choice.setAttribute("onclick", v + "go_story(true); del_element('tue_choice');" + add_sound ()); tuesday.appendChild(choice);}
				function add_sound () {
					var s = '';
					if (story_json[tue_story][scene].dialogs[dialog].choice[i].sound){s = get_sound(story_json[tue_story][scene].dialogs[dialog].choice[i].sound)};
					if (story_json[tue_story][scene].dialogs[dialog].choice[i].sound_stop){s += get_stop_sound(story_json[tue_story][scene].dialogs[dialog].choice[i].sound_stop)};
					return s;
				}
            }
        }
		if (story_json[tue_story][scene].dialogs[dialog].variables) {
			for (var i = 0; i < story_json[tue_story][scene].dialogs[dialog].variables.length; i++) {
				var choice_n = story_json[tue_story][scene].dialogs[dialog].variables[i][0]
				if (story_json[tue_story][scene].dialogs[dialog].variables[i][1] == "add") {
					story_json.parameters.variables[choice_n] += story_json[tue_story][scene].dialogs[dialog].variables[i][2];
                    tuesday.dispatchEvent(new Event( story_json[tue_story][scene].dialogs[dialog].variables[i][0] + '_add'));
				} else if (story_json[tue_story][scene].dialogs[dialog].variables[i][1] == "set") {story_json.parameters.variables[choice_n] = story_json[tue_story][scene].dialogs[dialog].variables[i][2];}
                    tuesday.dispatchEvent(new Event( story_json[tue_story][scene].dialogs[dialog].variables[i][0] + '_set'));
			}
		}
        if (story_json[tue_story][scene].dialogs[dialog].event) {
            tuesday.dispatchEvent(new Event( story_json[tue_story][scene].dialogs[dialog].event ));
        }
		if (story_json[tue_story][scene].dialogs[dialog].sound_stop) {
			var s = story_json[tue_story][scene].dialogs[dialog].sound_stop;
			sound_stop((s[languare])? s[languare]: s);
		}
		if (story_json[tue_story][scene].dialogs[dialog].sound) {
			var s = story_json[tue_story][scene].dialogs[dialog].sound;
			sound_play( (s[languare])? s[languare]: s )
		}
} function values_in_text(add) {
	var str = ""
	if (!add) {
		dialog_letter = 0
		str = (story_json[tue_story][scene].dialogs[dialog].text[languare])? story_json[tue_story][scene].dialogs[dialog].text[languare]: story_json[tue_story][scene].dialogs[dialog].text;
	} else {
		dialog_letter = dialog_text.length;
		str = dialog_text
		str += (story_json[tue_story][scene].dialogs[dialog].text_add[languare])? story_json[tue_story][scene].dialogs[dialog].text_add[languare]: story_json[tue_story][scene].dialogs[dialog].text_add;
	}
    let regexp = /<(.*?)>/g;
    let matchAll = str.matchAll(regexp);
    matchAll = Array.from(matchAll);
    for (var i = 0; i < matchAll.length; i++) {
        let firstMatch = matchAll[i];
        str = str.replace( firstMatch[0] , story_json.parameters.variables[firstMatch[1]])
    };
	dialog_text = str
} function go_story(choice) {
	if (!story_json[tue_story][scene].dialogs[dialog].choice || choice) {
		if (story_json[tue_story][scene].dialogs[dialog].go_to) {
			var go = story_json[tue_story][scene].dialogs[dialog].go_to;
			go_to(go)
		} else if (dialog < story_json[tue_story][scene].dialogs.length - 1){
			dialog++;
			if (story_json[tue_story][scene].dialogs[dialog].text){
				if (story_json[tue_story][scene].dialogs[dialog].text[languare] == 'skip'){go_story()} 
				else {creation_dialog();};
			} else if (story_json[tue_story][scene].dialogs[dialog].text_add){
				if (story_json[tue_story][scene].dialogs[dialog].text_add[languare] == 'skip'){go_story()} 
				else {creation_dialog();};
			} else { creation_dialog();}
		} else {
			scene++;
			if (scene >= story_json[tue_story].length){scene = story_json[tue_story].length - 1;}
			else {
				dialog = 0;
				creation_scene();
			}
		}
        if (story_json.parameters.autosave){save_stag('auto')};
	} 
} function back_story() {
    if (story_json[tue_story][scene].dialogs[dialog].back_to) {
        var go = story_json[tue_story][scene].dialogs[dialog].back_to;
        go_to(go)
    } else if (dialog > 0){
        dialog -= 1;
		if (story_json[tue_story][scene].dialogs[dialog].text) {
			if (story_json[tue_story][scene].dialogs[dialog].text[languare] == 'skip'){back_story()}
			else {creation_dialog();};
		}
		else if (story_json[tue_story][scene].dialogs[dialog].text_add) {
			if (story_json[tue_story][scene].dialogs[dialog].text_add[languare] == 'skip'){back_story()}
			else {
				if (story_json[tue_story][scene].dialogs[dialog].text_add[languare]){
					dialog_text = dialog_text.replace(story_json[tue_story][scene].dialogs[dialog].text_add[languare], "")
				} else {dialog_text = dialog_text.replace(story_json[tue_story][scene].dialogs[dialog].text_add, "")};
				if (story_json[tue_story][scene].dialogs[dialog+1].text_add[languare]){
					dialog_text = dialog_text.replace(story_json[tue_story][scene].dialogs[dialog+1].text_add[languare], "")
				} else {dialog_text = dialog_text.replace(story_json[tue_story][scene].dialogs[dialog+1].text_add, "")};
				creation_dialog();
			};
		}
		else {
			creation_dialog();
			del_element("tue_choice")
		};
    } else {
        scene -= 1;
        if (scene < 0){ scene = 0; }
        else {dialog = story_json[tue_story][scene].dialogs.length - 1;creation_scene();}
    } if (story_json.parameters.autosave){save_stag('auto')}
} function save_stag(tip){
    localStorage.setItem("tue_" + tip + "_scene", scene);
    localStorage.setItem("tue_" + tip + "_dialog", dialog);
    localStorage.setItem("tue_" + tip + "_story", tue_story);
    if (story_json.parameters.variables){localStorage.setItem("tue_" + tip + "_data", JSON.stringify( story_json.parameters.variables ));};
    if (tip == "bookmark"){tuesday.dispatchEvent(new Event('save'));}
} function load_stag(tip) {
    del_element("tue_choice")
    scene = localStorage.getItem("tue_" + tip + "_scene");
    dialog = localStorage.getItem("tue_" + tip + "_dialog");
    tue_story = localStorage.getItem("tue_" + tip + "_story");
    story_json.parameters.variables = JSON.parse(localStorage.getItem("tue_" + tip + "_data"));
    creation_scene();
	search_music ();
    tuesday.dispatchEvent(new Event('load'));
} function go_to(go) {
    del_element("tue_choice")
    dialog = 0;
    scene = 0;
    tue_story = go;
    creation_scene();
} function del_element (element) {
    var del = document.getElementById("tuesday").getElementsByClassName(element);
    var len = del.length;
    for (var i = 0; i < len; i++) {del[0].parentNode.removeChild(del[0]);}
} function anim_text() {
    if (dialog_speed == 0){tue_text_view.innerHTML = dialog_text;}
    else if (dialog_speed != 0 && dialog_letter <= dialog_text.length){dialog_timeout = setTimeout(add_letter, dialog_speed);}
} function add_letter() {
    tue_text_view.innerHTML = dialog_text.slice(0,dialog_letter);
    dialog_letter++;
    anim_text();
} function search_music() {
	 for (var i = scene; i >= 0; i--) {
		if(story_json[tue_story][i].background_music){
			if (tue_bg_music.canPlayType("audio/mpeg")) {
				if (story_json[tue_story][i].background_music.indexOf("blob:") > -1) {
					tue_bg_music.src = story_json[tue_story][i].background_music;
				} else {tue_bg_music.src = story_json[tue_story][i].background_music + ".mp3";}
            } else {tue_bg_music.src = story_json[tue_story][i].background_music + ".ogg";}
			tue_bg_music.loop = true;
			tue_bg_music.play();
			break;
		}
	}
} function creation_sound () {
	var i = 0;
	while (Object.keys( story_json.parameters.sounds)[i]) {
		var audio = document.createElement("audio");
		audio.preload = "auto"
		audio.id = Object.keys( story_json.parameters.sounds)[i];
		if (audio.canPlayType("audio/mpeg")) {
			if (story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]].indexOf("blob:") > -1) {
				audio.src = story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]];
			} else {audio.src = story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]] + ".mp3";}
		} else {audio.src = story_json.parameters.sounds[ Object.keys( story_json.parameters.sounds )[i]] + ".ogg";}
		tuesday.appendChild(audio);
		i++;
	}
} function get_sound (src) {
	return (src[languare])? "sound_play('" + src[languare] + "');": "sound_play('" + src + "');" ;	
} function get_stop_sound (src) {
	return (src[languare])? "sound_stop('" + src[languare] + "');": "sound_stop('" + src + "');" ;	
} function sound_play(id) {
	document.getElementById(id).currentTime = 0;
	document.getElementById(id).volume = 1;
	document.getElementById(id).play();
} function sound_stop(id) {
	document.getElementById(id).currentTime = 0;
	document.getElementById(id).pause();
} function add_style(file) {
    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", file);
    document.getElementsByTagName("head").item(0).appendChild(newlink);
}