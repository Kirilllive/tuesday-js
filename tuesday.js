let story_json = new Array();
var tuesday;
var text_view;
var text_block;
var name_block = document.createElement("div");
var languare;
var scene = 0;
var dialog = 0;
var dialog_text;
var dialog_speed = 50;
var dialog_letter = 0;
var dialog_timeout;
var story;
var tue_bg_music;
document.addEventListener('keydown', function(event) {
    var k = event.key;
    if (k == story_json.parameters.key.next) {go_story ();}
    else if (k == story_json.parameters.key.back) {back_story ();}
    else if (k == story_json.parameters.key.launch_story) {var g = story_json.parameters.launch_story; go_to(g);}
    else if (k == story_json.parameters.key.save_stag) {save_stag('bookmark');}
    else if (k == story_json.parameters.key.load_stag) {load_stag('bookmark');}
    else if (k == story_json.parameters.key.load_autosave) {load_stag('auto');}
});
function get_lang() {
    if (navigator.languages != undefined) {languare = navigator.languages[0].substring(0,2);}
    else {languare = navigator.languagesubstring(0,2)}
    var support;
    for (i = 0; i < story_json.parameters.languares.length; i++){
        if (languare == story_json.parameters.languares[i]) {support = true }
    }
    if (!support){languare = story_json.parameters.languares[0]}
} function load_story(tip, url) {
    if (tip == 'data'){
        story_json = url;
        base_creation();
    } else if (tip == 'file') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
                story_json = JSON.parse(this.responseText);
                base_creation();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
} function base_creation() {
    get_lang();
    dialog_speed = story_json.parameters.text_panel.dialog_speed;
    if (story_json.parameters.title){
        if (story_json.parameters.title[languare]){document.title = story_json.parameters.title[languare];
        } else {document.title = story_json.parameters.title;}}
    tuesday = document.getElementById("tuesday");
    tuesday.style.backgroundRepeat = "no-repeat";
    tuesday.style.backgroundSize = "cover";
    tuesday.style.backgroundPosition = "center";
    tuesday.style.position = "relative"
    tuesday.style.overflow = "hidden";
    tuesday.innerHTML = "<table id='text_block' align='center'><tbody><tr><td id='text_view'></td></tr></tbody></table>";
    text_block = document.getElementById("text_block");
    if(story_json.parameters.text_panel.className){text_block.className = story_json.parameters.text_panel.className;}
    if(story_json.parameters.text_panel.style){text_block.style = story_json.parameters.text_panel.style;}
    text_block.style.position = "absolute";
    text_block.style.bottom = story_json.parameters.text_panel.indent_bottom;
    text_block.style.width = story_json.parameters.text_panel.size_panel[0];
    text_block.style.height = story_json.parameters.text_panel.size_panel[1];
    text_block.style.left= "0";
    text_block.style.right= "0";
    text_block.style.zIndex = "1000";
    text_view = document.getElementById("text_view");
    text_view.style.padding = story_json.parameters.text_panel.indent_text;
    text_view.style.fontSize = story_json.parameters.text_panel.size_text;
    if (story_json.parameters.name_panel) {
        if(story_json.parameters.name_panel.className){name_block.className = story_json.parameters.name_panel.className;}
        if(story_json.parameters.name_panel.style){name_block.style = story_json.parameters.name_panel.style;}
        name_block.style.position = "absolute";
        name_block.id = "name_block";
        name_block.style.padding = story_json.parameters.name_panel.indent_text;
        name_block.style.fontSize = story_json.parameters.name_panel.size_text;
        name_block.style.textAlign = "center";
        if (name_block.style.width = story_json.parameters.name_panel.size_panel[0] != 0) {name_block.style.width = story_json.parameters.name_panel.size_panel[0];}
        name_block.style.height = story_json.parameters.name_panel.size_panel[1];
        name_block.style.lineHeight = story_json.parameters.name_panel.size_panel[1];
        if (story_json.parameters.name_panel.position[0] != 0){name_block.style.left = story_json.parameters.name_panel.position[0];}
        if (story_json.parameters.name_panel.position[1] != 0){name_block.style.right = story_json.parameters.name_panel.position[1];}
        if (story_json.parameters.name_panel.position[2] != 0){name_block.style.top = story_json.parameters.name_panel.position[2];}
        if (story_json.parameters.name_panel.position[3] != 0){name_block.style.bottom = story_json.parameters.name_panel.position[3];}
        name_block.style.zIndex = 1001;
        text_block.appendChild(name_block);
    }
    tue_bg_music = document.createElement("AUDIO");
    tue_bg_music.id = "tue_bg_music";
    tuesday.appendChild(tue_bg_music);
    story = story_json.parameters.launch_story
    creation_buttons();
    creation_scene();
} function creation_buttons() {
    for (i = 0; i < story_json.parameters.buttons.length; i++){
        var button = document.createElement("div");
        if(story_json.parameters.buttons[i].className){button.className = story_json.parameters.buttons[i].className;}
        if(story_json.parameters.buttons[i].style){button.style = story_json.parameters.buttons[i].style;}
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
        button.style.backgroundSize = story_json.parameters.buttons[i].art_size[0] + " " + story_json.parameters.buttons[i].art_size[1];
        if (story_json.parameters.buttons[i].position[0] != 0){button.style.left = story_json.parameters.buttons[i].position[0];}
        if (story_json.parameters.buttons[i].position[1] != 0){button.style.right = story_json.parameters.buttons[i].position[1];}
        if (story_json.parameters.buttons[i].position[2] != 0){button.style.top = story_json.parameters.buttons[i].position[2];}
        if (story_json.parameters.buttons[i].position[3] != 0){button.style.bottom = story_json.parameters.buttons[i].position[3];}
        tuesday.appendChild(button);
    }
    if(document.getElementById('next')){document.getElementById('next').addEventListener('click', function(){go_story ()});}
    if(document.getElementById('back')){document.getElementById('back').addEventListener('click', function(){back_story ()});}
    if(document.getElementById('home')){
        var g = story_json.parameters.launch_story;
        document.getElementById('home').addEventListener('click', function() {go_to(g)});
    }
    if(document.getElementById('save')){document.getElementById('save').addEventListener('click',function(){save_stag('bookmark')});}
    if(document.getElementById('load')){document.getElementById('load').addEventListener('click',function(){load_stag('bookmark')});}
} function creation_scene() {
    if (story_json[story][scene].legacy_choice){
        for (var i = 0; i < story_json[story][scene].legacy_choice.length; i++) {
            var choice_n = story_json[story][scene].legacy_choice[i][0];
            var choice_s = story_json[story][scene].legacy_choice[i][1];
            var choice_v = story_json[story][scene].legacy_choice[i][2];
            var choice_g = story_json[story][scene].legacy_choice[i][3];
            if (choice_s == ">" && story_json.parameters.subject_choice[choice_n] > choice_v) {
                go_to(choice_g);
                break;
            } else if (choice_s == "<" && story_json.parameters.subject_choice[choice_n] < choice_v) {
                go_to(choice_g);
                break;
            } else if (choice_s == "=" && story_json.parameters.subject_choice[choice_n] == choice_v) {
                go_to(choice_g);
                break;
            } else if (story_json[story][scene].legacy_choice[i].go_to) {
                go_to(story_json[story][scene].legacy_choice[i].go_to);
                break;
            }
        }
    } else
    if(story_json[story][scene].background_image[languare]){tuesday.style.backgroundImage = "url('" + story_json[story][scene].background_image[languare] + "')";}
    else if(story_json[story][scene].background_image){tuesday.style.backgroundImage = "url('" + story_json[story][scene].background_image + "')";}
    var buttons = document.getElementById("tuesday").getElementsByClassName("tue_controll");
    for (var i = 0; i < buttons.length; i++) {
        if (story == story_json.parameters.launch_story){buttons[i].style.visibility = "hidden";}
        else {buttons[i].style.visibility = "visible";}
    }
    creation_dialog ();
    if(story_json[story][scene].background_music){
        if (tue_bg_music.canPlayType("audio/mpeg")) {
            tue_bg_music.setAttribute("src", story_json[story][scene].background_music+".m4a");
            } else {
            tue_bg_music.setAttribute("src", story_json[story][scene].background_music+".ogg");
        }
        tue_bg_music.loop = true;
        tue_bg_music.play();
    }
    if (story_json[story][scene].subject_choice) {
        for (var i = 0; i < story_json[story][scene].subject_choice.length; i++) {
            var choice_n = story_json[story][scene].subject_choice[i][0]
            if (story_json[story][scene].subject_choice[i][1] == "add") {
                story_json.parameters.subject_choice[choice_n] = story_json.parameters.subject_choice[choice_n] + story_json[story][scene].subject_choice[i][2];
            } else if (story_json[story][scene].subject_choice[i][1] == "set") {story_json.parameters.subject_choice[choice_n] = story_json[story][scene].subject_choice[i][2];}
        }
    }
} function creation_dialog () {
		next.style.visibility = 'visible';
        if (story_json[story][scene].dialogs[dialog].color_panel) {text_block.style.backgroundColor = story_json[story][scene].dialogs[dialog].color_panel;}
        else if (story_json.parameters.text_panel.color_panel) {text_block.style.backgroundColor = story_json.parameters.text_panel.color_panel;}
        text_view.style.color = story_json[story][scene].dialogs[dialog].color_text;
        if (story_json[story][scene].dialogs[dialog].text){
            text_block.style.visibility = 'visible';
            text_view.innerHTML = "";
            dialog_text = story_json[story][scene].dialogs[dialog].text[languare];
            dialog_letter = 0;
            clearTimeout(dialog_timeout);
            anim_text();
            if(story_json[story][scene].dialogs[dialog].text.className){ text_block.className = story_json[story][scene].dialogs[dialog].text.className}
        } else {text_block.style.visibility = 'hidden';}
        if (story_json[story][scene].dialogs[dialog].name) {
            name_block.style.backgroundColor = story_json[story][scene].dialogs[dialog].name.color_panel;
            name_block.style.color = story_json[story][scene].dialogs[dialog].name.color_text;
            name_block.innerHTML = story_json[story][scene].dialogs[dialog].name[languare]
            name_block.style.visibility = 'visible';
            if(story_json[story][scene].dialogs[dialog].name.className){ name_block.className = story_json[story][scene].dialogs[dialog].name.className}
        } else {name_block.style.visibility = 'hidden';}
        del_element("tue_art");
        if (story_json[story][scene].dialogs[dialog].art){
            for (i = 0; i < story_json[story][scene].dialogs[dialog].art.length; i++){
                var art = document.createElement("img");
                if (story_json[story][scene].dialogs[dialog].art[i].url[languare]){
                art.src = story_json[story][scene].dialogs[dialog].art[i].url[languare];}
                else if (story_json[story][scene].dialogs[dialog].art[i].url){
                art.src = story_json[story][scene].dialogs[dialog].art[i].url;}
                art.className = "tue_art"
                if(story_json[story][scene].dialogs[dialog].art[i].style){art.style = story_json[story][scene].dialogs[dialog].art[i].style;}
                art.style.position = "absolute";
                if (story_json[story][scene].dialogs[dialog].art[i].size) {
                    art.style.width = story_json[story][scene].dialogs[dialog].art[i].size[0];
                    art.style.height = story_json[story][scene].dialogs[dialog].art[i].size[1];
                }
                if (story_json[story][scene].dialogs[dialog].art[i].position[0] != 0){art.style.left= story_json[story][scene].dialogs[dialog].art[i].position[0];}
                if (story_json[story][scene].dialogs[dialog].art[i].position[1] != 0){art.style.right= story_json[story][scene].dialogs[dialog].art[i].position[1];}
                if (story_json[story][scene].dialogs[dialog].art[i].position[2] != 0){art.style.top= story_json[story][scene].dialogs[dialog].art[i].position[2];}
                if (story_json[story][scene].dialogs[dialog].art[i].position[3] != 0){art.style.bottom= story_json[story][scene].dialogs[dialog].art[i].position[3];}
                tuesday.appendChild(art);
            }
        }
        if (story_json[story][scene].dialogs[dialog].select) {
			next.style.visibility = 'hidden';
            for (i = 0; i < story_json[story][scene].dialogs[dialog].select.length; i++) {
                var select = document.createElement("div");
                if(story_json[story][scene].dialogs[dialog].select[i].className){select.className = story_json[story][scene].dialogs[dialog].select[i].className;}
                if(story_json[story][scene].dialogs[dialog].select[i].style){select.style = story_json[story][scene].dialogs[dialog].select[i].style;}
                select.classList.add("tue_select");
                select.style.position = "absolute";
                select.style.backgroundColor = story_json[story][scene].dialogs[dialog].select[i].color;
                select.style.backgroundRepeat = "no-repeat";
                select.style.backgroundPosition = "center";
                select.style.backgroundImage = "url('" + story_json[story][scene].dialogs[dialog].select[i].art + "')";
                if (select.style.width = story_json[story][scene].dialogs[dialog].select[i].size[0] != 0) {
                    select.style.width = story_json[story][scene].dialogs[dialog].select[i].size[0];}
                if (select.style.height = story_json[story][scene].dialogs[dialog].select[i].size[1] != 0) {
                    select.style.height = story_json[story][scene].dialogs[dialog].select[i].size[1];
                    select.style.lineHeight = story_json[story][scene].dialogs[dialog].select[i].size[1];
                }
                if (story_json[story][scene].dialogs[dialog].select[i].art_size){
                    select.style.backgroundSize = story_json[story][scene].dialogs[dialog].select[i].art_size[0] + " " + story_json[story][scene].dialogs[dialog].select[i].art_size[1];
                }
                if (story_json[story][scene].dialogs[dialog].select[i].position[0] != 0){select.style.left = story_json[story][scene].dialogs[dialog].select[i].position[0];}
                if (story_json[story][scene].dialogs[dialog].select[i].position[1] != 0){select.style.right = story_json[story][scene].dialogs[dialog].select[i].position[1];}
                if (story_json[story][scene].dialogs[dialog].select[i].position[2] != 0){select.style.top = story_json[story][scene].dialogs[dialog].select[i].position[2];}
                if (story_json[story][scene].dialogs[dialog].select[i].position[3] != 0){select.style.bottom = story_json[story][scene].dialogs[dialog].select[i].position[3];}
                select.style.color = story_json[story][scene].dialogs[dialog].select[i].color_text;
                select.style.padding = story_json[story][scene].dialogs[dialog].select[i].indent_text;
                select.style.fontSize = story_json[story][scene].dialogs[dialog].select[i].size_text;
                select.style.textAlign = "center";
                if(story_json[story][scene].dialogs[dialog].select[i].text){select.innerHTML = story_json[story][scene].dialogs[dialog].select[i].text[languare];}
                if (story_json[story][scene].dialogs[dialog].select[i].go_to) {
					var g = story_json[story][scene].dialogs[dialog].select[i].go_to;
					if (g == "load_autosave") {select.setAttribute("onclick","load_stag('auto')");}
					else if (g == "load") {select.setAttribute("onclick","load_stag('bookmark')");}
					else {select.setAttribute("onclick","go_to('" + g + "')");}
					tuesday.appendChild(select);
				} else {select.setAttribute("onclick","go_story(true); del_element('tue_select')"); tuesday.appendChild(select);}
            }
        }
} function go_story(choice) {
	if (!story_json[story][scene].dialogs[dialog].select || choice) {
		if (story_json[story][scene].dialogs[dialog].go_to) {
			var go = story_json[story][scene].dialogs[dialog].go_to;
			go_to(go)
		} else if (dialog < story_json[story][scene].dialogs.length - 1){
			dialog++;
			if (story_json[story][scene].dialogs[dialog].text){
				if (story_json[story][scene].dialogs[dialog].text[languare] == 'skip'){go_story()} 
				else {creation_dialog();};
			} else { creation_dialog();}
		} else {
			scene++;
			if (scene >= story_json[story].length){scene = story_json[story].length - 1;}
			else {
				dialog = 0;
				creation_scene();
			}
		}
		if (story_json.parameters.autosave){save_stag('auto')}
	} 
} function back_story() {
    if (story_json[story][scene].dialogs[dialog].back_to) {
        var go = story_json[story][scene].dialogs[dialog].back_to;
        go_to(go)
    } else if (dialog > 0){
        dialog = dialog - 1;
        if (story_json[story][scene].dialogs[dialog].text[languare] != 'skip'){
            creation_dialog();
			del_element("tue_select")
        } else {back_story()};
    } else {
        scene = scene - 1;
        if (scene < 0){ scene = 0; }
        else {dialog = story_json[story][scene].dialogs.length - 1;creation_scene();}
    } if (story_json.parameters.autosave){save_stag('auto')}
} function save_stag(tip){
    {
       localStorage.setItem("tuesday_" + tip + "_scene", scene);
       localStorage.setItem("tuesday_" + tip + "_dialog", dialog);
       localStorage.setItem("tuesday_" + tip + "_story", story);
        if (story_json.parameters.subject_choice){localStorage.setItem("tuesday_" + tip + "_data", JSON.stringify( story_json.parameters.subject_choice ));};
    }
} function load_stag(tip) {
    del_element("tue_select")
    scene = localStorage.getItem("tuesday_" + tip + "_scene");
    dialog = localStorage.getItem("tuesday_" + tip + "_dialog");
    story = localStorage.getItem("tuesday_" + tip + "_story");
    story_json.parameters.subject_choice = JSON.parse(localStorage.getItem("tuesday_" + tip + "_data"));
    creation_scene();
	search_music ();
} function go_to(go) {
    del_element("tue_select")
    dialog = 0;
    scene = 0;
    story = go;
    creation_scene();
} function del_element (element) {
    var del = document.getElementById("tuesday").getElementsByClassName(element);
    var len = del.length;
    for (var i = 0; i < len; i++) {del[0].parentNode.removeChild(del[0]);}
} function anim_text() {
    if (dialog_speed == 0){text_view.innerHTML = dialog_text;}
    else if (dialog_speed != 0 && dialog_letter <= dialog_text.length){dialog_timeout = setTimeout(add_letter, dialog_speed);}
} function add_letter() {
    text_view.innerHTML = dialog_text.slice(0,dialog_letter);
    dialog_letter++;
    anim_text();
} function search_music() {
	 for (var i = scene; i >= 0; i--) {
		if(story_json[story][i].background_music){
			if (tue_bg_music.canPlayType("audio/mpeg")) {
				tue_bg_music.setAttribute("src", story_json[story][i].background_music+".m4a");
            } else {tue_bg_music.setAttribute("src", story_json[story][i].background_music+".ogg");}
			tue_bg_music.loop = true;
			tue_bg_music.play();
			break;
		}
	}
}
