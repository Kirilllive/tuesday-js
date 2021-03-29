window.tue = window.tue || {};
window.addEventListener('DOMContentLoaded', (event) => {
    // check on server if cloud API is currently available
    tue.cloud.root(function () {
        add_cloud_button();
    }, null);
});
tue.modal_window = tue.modal_window || function (action, title, content, noClose) {
    var hasCloseBtn = !(noClose || false);
    var dom = "<div class='window' style='padding:16px 8px; width:480px;'>" +
            "<div style'position:relative;'>" +
            (hasCloseBtn ? "<div class='window_close icon icon_close' onclick='tue.modal_window(\"close\")'></div>" : "") +
            "</div>" +
            "<h4 style='font-size:18px;margin:10px 0 10px 0;font-weight:500;line-height:1.1;color:#333333;'>" + title + "</h4><hr>" +
            content +
            "<div>" +
            "<hr>" +
            "<div style='padding-top:16px;'><ul>" +
            "<li style='display:inline-block;margin:0px 10px 0px 10px;zoom:1;*display:inline;'><a href='" + tue.cloud.getDomain() + "/site/terms' target='_blank'>Terms of Use</a></li>" +
            "<li style='display:inline-block;margin:0px 10px 0px 10px;zoom:1;*display:inline;'><a href='" + tue.cloud.getDomain() + "/site/privacy' target='_blank'>Privacy Plicy</a></li>" +
            "<li style='display:inline-block;margin:0px 10px 0px 10px;zoom:1;*display:inline;'><a href='" + tue.cloud.getDomain() + "/site/cookie' target='_blank'>Cookie Settings</a></li>" +
            "</ul></div>" +
            "</div><div id='loader' style='display:none;'></div></div>";
    var html = document.documentElement;
    var menu_add = document.getElementById('add_element');
    var window_zone = document.getElementById("window_zone");
    if (action === 'close') {
        if (menu_add)
            menu_add.style.visibility = "hidden";
        window_zone.style.visibility = "hidden";
        window_zone.style.backgroundColor = 'rgba(110,95,165,0)';
        html.style.overflow = 'scroll';
        scroll_block = false;
        window_zone.innerHTML = "";
    } else if (action === 'open' && window_zone.style.visibility !== "visible") {
        window_zone.style.visibility = "visible";
        window_zone.style.backgroundColor = 'var(--cm)';
        html.style.overflow = 'hidden';
        window_zone.innerHTML = dom;
        scroll_block = true;
    }
};
// Добавление кнопки и прочие модификации для работы с облоком
function add_cloud_button() {
    menu_panel.style.maxWidth = "660px";
    var cols = document.getElementById('menu_panel').getElementsByTagName('tbody')[0].rows[0].cells;
    var m_cloub = document.createElement("td");
    m_cloub.className = "icon button_menu";
    m_cloub.style = "background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSJub25lIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxMiIgZD0iTTE5Myw1NGMxLTAsMywwLDUsMCwyOSwwLDUzLDI0LDUzLDU0cy0yNCw1My01NCw1M0g1MGE0Niw0NiwwLDAsMS0xLTkyYzUtMzgsNDgtNTksNzUtNTksNTAsMCw2OSw0NCw2OSw0NGgwYy0yNywyLTQ5LDI1LTQ5LDUzTTUxLDIwNmwyOS0zMCwzMCwzMG05NCw5LTI5LDI4TDE0NiwyMTVNMTc1LDE3N3Y2N20tOTUsMFYxNzYiLz4KPC9zdmc+Cg==')"
    m_cloub.title = "Cloud storage";
    m_cloub.setAttribute("onclick", "tue_init();");
    cols[2].after(m_cloub); //<-- cols[2] позиция кнопки в меню
    // добавление новых стилей
    add_style(".icon_cloudLoad{background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSJub25lIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxMiIgZD0iTTEwNSwxNjFINTBhNDYuMDA1LDQ2LjAwNSwwLDAsMS0xLTkyYzUuNzYxLTM4LjA1Miw0OC4wNTQtNTksNzUtNTksNTAuMDI5LDAsNjksNDQsNjksNDQtMjcuMzQ1LDIuMzgyLTQ5LDI1LjAzNy00OSw1M200OS01M2MxLjU1LS4xMzUsMy40MTUsMCw1LDAsMjkuNTQ3LDAsNTMsMjQuNDUzLDUzLDU0cy0yNC40NTMsNTMtNTQsNTNIMTUwbTI3LDM0LTQ5LDQ4TDc5LDE5NU0xMjgsMTMxVjI0MiIvPjwvc3ZnPgo=')}");
    add_style(".icon_cloudSave{background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSJub25lIiBmaWxsLW9wYWNpdHk9IjAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxMiIgZD0iTTUwLDE2MWE0Ni4wMDUsNDYuMDA1LDAsMCwxLTEtOTJjNS43NjEtMzguMDUyLDQ4LjA1NC01OSw3NS01OSw1MC4wMjksMCw2OSw0NCw2OSw0NC0yNy4zNDUsMi4zODItNDksMjUuMDM3LTQ5LDUzbTQ5LTUzYzEuNTUtLjEzNSwzLjQxNSwwLDUsMCwyOS41NDcsMCw1MywyNC40NTMsNTMsNTRzLTI0LjQ1Myw1My01NCw1M20tMjAsMTktNDktNDhMNzksMTgwTTEyOCwxMzFWMjQyIi8+PC9zdmc+Cg==')}");
}
function add_style(data) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = data;
    document.getElementsByTagName('head')[0].appendChild(style);
}
add_style(".window{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.42857143;color:#333333;background-color:#fff;}");
add_style("a{color:#337ab7;text-decoration:none;}");

add_style("@-webkit-keyframes loader {0%{background-position:50% 0%} 50%{background-position:50% 100%} 100%{background-position:50% 100%}}");
add_style("@-moz-keyframes loader {0%{background-position:50% 0%} 50%{background-position:50% 100%} 100%{background-position:50% 100%}}");
add_style("@-o-keyframes loader {0%{background-position:50% 0%} 50%{background-position:50% 100%} 100%{background-position:50% 100%}}");
add_style("@keyframes loader {0%{background-position:50% 0%} 50%{background-position:50% 100%} 100%{background-position:50% 100%}}");
add_style("#loader {position: absolute; top: 0; bottom:0; right: 0; left: 0; background: linear-gradient(180deg, #ffffff44, #90909099, #ffffff44, #90909066, #ffffff44, #90909033, #ffffff44);background-size: 600% 600%;-webkit-animation: loader 1s ease infinite;-moz-animation: loader 1s ease infinite;-o-animation: loader 1s ease-in infinite;animation: loader 1s ease infinite;}");

add_style(".switch{position: relative;display: inline-block;width: 29px;height: 16px;}");
add_style(".switch input {opacity: 0;width: 0;height: 0;}");
add_style(".slider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}");
add_style(".slider:before {position: absolute;content: '';height: 12px;width: 12px;left: 2px;bottom: 2px;background-color: white;-webkit-transition: .4s;transition: .4s;}");
add_style("input:checked + .slider {background-color: #2196F3;}");
add_style("input:focus + .slider {box-shadow: 0 0 1px #2196F3;}");
add_style("input:checked + .slider:before {-webkit-transform: translateX(13px);-ms-transform: translateX(13px);transform: translateX(13px);}");
add_style(".slider.round {border-radius: 16px;}");
add_style(".slider.round:before {border-radius: 50%;}");

// инициализация окна облака
function tue_init() {
    if (tue.cloud.hasUser()) {
        tue.cloud.user();
        tue_cloud();
    } else {
        tue_cloud_login();
    }
    document.addEventListener('tue_story_new', function (event) {
        console.log("new story");
        tue.cloud.handleNewStory();
    });
    document.addEventListener('tue_story_open', function (event) {
        console.log("story opened");
    });
}
// окно логина
function tue_cloud_login() {
    var html = "<table width='90%'><tbody><tr>"
            + "<td align='right' style='height:40px;width:128px;padding-right:8px;'>login</td>"
            + "<td><input id='tue-input_login' class='input_text' value='' type='text'></td></tr><tr>"
            + "<td align='right' style='height:40px;padding-right:8px;'>password</td>"
            + "<td><input id='tue-input_pass' class='input_text' value='' type='password'></td></tr>"
            + "<tr><td onClick='tue.modal_window(\"close\");tue_cloud_recover();' colspan='2' align='center' valign='center' style='color:#337ab7;cursor:pointer;'>i forgot password</td></tr>"
            + "<tr><td colspan='2' height='40px' align='center' valign='center'><span style='color:red;' id='tue-login_error'></span></td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'>"
            + "<table onclick='tue.cloud.login();' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Login</td><td width='42px'></td></tr></tbody></table>"
            + "</td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'>or</td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'>"
            + "<table onclick='tue.modal_window(\"close\");tue_cloud_registration();' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon'></td><td align='center' style='color:#337ab7;cursor:pointer;'>Register</td><td width='42px'></td></tr></tbody></table>"
            + "</td></tr>"
            + "</tr></tbody></table>";
    tue.modal_window("open", "TuesdayJS Cloud: login", html);
}
// окно восстановления пароля
function tue_cloud_recover() {
    var html = "<table width='90%'><tbody><tr>"
            + "<td colspan='2' align='center' valign='center'>Enter the email specified in your account settings.</td></tr><tr>"
            + "<td align='right' style='height:40px;width:128px;padding-right:8px;'>email</td>"
            + "<td><input id='tue-mail_input' class='input_text' value='' type='text' placeholder='gmail@example.com'></td></tr><tr>"
            + "<tr><td colspan='2' height='40px' align='center' valign='center'><span style='color:red;' id='tue-mail_error'></span></td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'>"
            + "<table id='tue-mail_button' onclick='tue.cloud.recover();' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Recover</td><td width='42px'></td></tr></tbody></table>"
            + "</td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'><span id='tue-mail_result'></span></td>"
            + "</tr></tbody></table>";
    tue.modal_window("open", "TuesdayJS Cloud: password recovery", html);
}
// окно регистрации
function tue_cloud_registration() {
    var html = "<table width='90%'><tbody><tr>"
            + "<td colspan='2' align='center' valign='center'>Come up with a username and password</td></tr><tr>"
            + "<td align='right' style='height:40px;width:128px;padding-right:8px;'>login</td>"
            + "<td><input id='tue-input_login' class='input_text' value='' type='text' autocomplete='new-password'></td></tr><tr>"
            + "<td align='right' style='height:40px;padding-right:8px;'>password</td>"
            + "<td><input id='tue-input_pass' class='input_text' value='' type='password' autocomplete='new-password'></td></tr>"
            + "<tr><td align='right' style='height:40px;padding-right:8px;vertical-align:top;'><input id='tue-chbx_reg' value='' type='checkbox'></td>"
            + "<td><label for='tue-chbx_reg'>I accept terms of use</label><br>"
            + "By agreeing to the <a href='" + tue.cloud.getDomain() + "/site/terms' target='_blank'>Terms of Use</a>, you also consent to our use and processing "
            + "of your personal data to ensure the correct operation of your TuesdayJS Cloud account. "
            + "To find out how to manage your personal data, please see our <a href='" + tue.cloud.getDomain() + "/site/privacy' target='_blank'>Privacy Policy.</a>"
            + "</td></tr>"
            + "<tr><td colspan='2' height='40px' align='center' valign='center'><span style='color:red;' id='tue-login_error'></span></td></tr>"
            + "<tr><td colspan='2' align='center' valign='center'>"
            + "<table onclick='tue.cloud.register();' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_ok'></td><td align='center'>Register</td><td width='42px'></td></tr></tbody></table>"
            + "</td></tr>"
            + "</tr></tbody></table>";
    tue.modal_window("open", "TuesdayJS Cloud: registration", html);
}
// окно упровления облаком
function tue_cloud(project_id) {
    var proj = tue.cloud.getCurrProject();
    var html = "<table style='height:70vh; width:100%; border-radius:8px;'><tbody>"
            + "<tr><td id='set_0' onclick='set_menu(0);blank_0.innerHTML=tue_cloud_project(" + proj.id + ");' align='right' class='set_button set_select' width='76px'>Project</td>"
            + "<td valign='top' align='center' rowspan='4' style='position:relative;'>"
            //
            + "<div id='blank_0' style='visibility:visible;height:70vh;padding:4px;' class='set_blank'>" + tue_cloud_project(proj.id) + "</div>"// текущий запущеный прпоект
            //
            + "<div id='blank_1' style='visibility:hidden;height:70vh;padding:4px;' class='set_blank'></div>"// каталог проекта
            //
            + "<div id='blank_2' style='visibility:hidden;height:70vh;padding:4px;' class='set_blank'></div>"
            //
            + "</td></tr>"
            + "<tr><td id='set_1' onclick='set_menu(1);blank_1.innerHTML=tue_cloud_allproject();' align='right' class='set_button'>Loading</td></tr>"
            + "<tr><td id='set_2' onclick='set_menu(2);blank_2.innerHTML=tue_cloud_set();' align='right' class='set_button' style='border-radius:0 0 0 16px;'>Settings</td></tr>"
            + "<tr><td style='border-right:1px solid var(--cb);'></td></tr></tbody></table>";
    tue.modal_window("open", "TuesdayJS Cloud", html);
    if (project_id) {
        set_menu(1);
        blank_1.innerHTML = tue_cloud_project(project_id);
    }
}
// итемы проектов в каталоге
function tue_cloud_allproject() {
    var p = "";
    var projects = tue.cloud.getProjects();
    for (var idx in projects) {
        var proj = projects[idx];
        p += "<table class='big_button3' style='width:100%; border-spacing:8px; border-collapse:separate;margin-top:4px;padding:4px;border-radius:8px;' onclick='blank_1.innerHTML=tue_cloud_project(\"" + proj.id + "\");'><tbody>"
                + "<tr>"
                + "<td rowspan='2' width='32px' " + (proj.hasIcon() ? "class='icon' style='background-image:url(\"" + proj.icon + "\"')" : "class='icon icon_new'") + "'></td>"
                + "<td colspan='3' rowspan='1'>"
                + (proj.getPath() ? ("<a target='_blank' href='" + proj.getPath() + "'>" + proj.getName() + "</a>") : proj.getName())
                + "</td>"; // название проекта по дефолту
        if (proj.isUploaded()) {
            p += "<td rowspan='2' onclick='tue.cloud.project_download(" + proj.id + ")' width='32px' style='cursor:pointer;' class='icon icon_cloudLoad'></td>"; // выгрузить проект
            p += "<td rowspan='2' onclick='window.open(\"" + proj.getPath() + "\", \"blank\")' width='32px' style='cursor:pointer;' class='icon icon_play'></td>"; // выгрузить проект
        } else {
            p += "<td rowspan='2'></td>"; // заглушка
        }
        p += "</tr><tr>"
                + "<td align='right' width='80px' style='text-align:left;'>last update:</td>"
                + "<td align='left'>" + proj.lastUpdated() + "</td>"//дата последнего обновления в облоке
                + "<td></td><td></td>"
                + "</tr></tbody></table>";
    }
    return p;
}
// раздел редактирования проекта
function tue_cloud_project(id) {
    var proj = tue.cloud.getProject(id);
    // console.log(proj);
    var p = "<table style='width:100%;border-spacing:8px;border-collapse:separate;'>"
            + "<tbody><tr>"
            + "<td rowspan='5' width='64px' " + (proj.hasIcon() ? "class='icon' style='height:64px;background-size:contain;background-image:url(\"" + proj.icon + "\")'" : "class='icon icon_new'") + "></td>"
            + "<td align='left'>" + proj.getName() + "</td>"
            + "</tr><tr>"
            + "<td align='left'>last update: " + proj.lastUpdated() + "</td>"//дата последнего обновления в облоке
            + "</tr>"
            + "<tr><td align='left'>" + (proj.isChanged() ? "there are changes" : "no changes") + "</td></tr>";
    if (proj.isUploaded()) {
        p += "<tr><td align='left' title='" + (proj.isVisible() ? "public" : "private") + "'>visibility: <label class='switch'><input id='tue-proj_visibility' onclick='tue.cloud.project_vis(" + 
                proj.id + ")' type='checkbox' " + (proj.isVisible() ? "checked" : "") + "><span class='slider round'></span></label></td></tr>";
    }

    if (proj.isUploaded()) {
        p += "<tr><td align='left'>age rating: " + tue_age_rank_selector(proj.id, proj.ageRank) + "</td></tr>";
        p += "<tr><td></td><td align='left'><a href='https://tuesday.wantasoul.com/site/terms#pegi' target='_blank'>read about age ratings</a></td></tr>";
    }

    p += "</tbody></table>";

    if (proj.isUploaded()) {
        p += "<table width='95%'><tbody>";
        p += "<tr><td align='left' ><input class='input_text' id='tue-url_input' style='width:100%' type='text' value='" + proj.getPath() + "' readonly></td>";
        p += "<td title='url copy' onclick='tue_copy_project_url();' align='right' width='32px' height='32px' style='cursor:pointer;' class='icon_m icon_copu'></td></tr>";
        p += "</tbody></table>";
    }

    p += "<br>"
            // кнопки управления
            + "<table width='100%'><tbody><tr>"
            + "<td><table onclick='tue.cloud.project_upload(" + proj.id + ")' class='big_button' width='124px'><tbody><tr><td width='42px' class='icon icon_cloudSave'></td><td align='center'>Save</td><td width='42px'></td></tr></tbody></table></td>" // Загрузить проект
            + (proj.canBeDeleted() ? "<td><table onclick='tue.cloud.project_delete(" + proj.id + ")' class='big_button' width='124px'><tbody><tr><td width='42px' class='icon icon_del'></td><td align='center'>Delete</td><td width='42px'></td></tr></tbody></table></td>" : "<td></td>")// удалить из облока
            + (proj.canBeLoaded() ? "<td><table onclick='tue.cloud.project_download(" + proj.id + ")' class='big_button' width='124px'><tbody><tr><td width='42px' class='icon icon_cloudLoad'></td><td align='center'>Load</td><td width='42px'></td></tr></tbody></table></td>" : "<td></td>") // выгрузить проект
            + "</tr></tbody></table>";
    // Далее список каким пользователям есть доступ
    return p;
}
// раздел настроек
function tue_cloud_set() {
    var user = tue.cloud.getCurrUser();
    var p = "<table style='width:100%; border-spacing:8px; border-collapse:separate;'><tbody>"
            + "<tr><td align='right' width='128px'>Username </td><td align='left'>" + user.username + "</td></tr>"; // имя пользователя
    if (false) { // ввод почты временно отключен
        p += "<tr><td align='right'>Email </td><td align='left'><input id='tue-input_email' class='input_text' value='" + user.mail + "' type='text' placeholder='gmail@example.com'></td></tr>"
                + "<tr><td align='right' colspan='2' style='font-size:11px;'>we will use it in case of password recovery only</td></tr>"
                //Внести email
                + "<tr><td align='center' colspan='2'>"
                + "<table onclick='tue.cloud.user_email()' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_edit2'></td><td align='center'>Update Email</td><td width='42px'></td></tr></tbody></table>"
                + "</td></tr>"
                + "<tr><td colspan='2' style='height:20px;'></rd></tr>";
    }
    if (true) {
        //Обновить пароль
        p += "<tr><td align='right'>New password </td><td align='left'><input id='tue-pass1_input' class='input_text' value='' type='password' autocomplete='new-password'></td></tr>"
                + "<tr><td align='right'>Confirm New Password </td><td align='left'><input id='tue-pass2_input' class='input_text' value='' type='password' autocomplete='new-password'></td></tr>"
                + "<tr><td align='center' colspan='2'>"
                + "<table onclick='tue.cloud.passwd();' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_refrash'></td><td align='center'>Update password</td><td width='42px'></td></tr></tbody></table>"
                + "</td></tr>"
                + "<tr><td colspan='2' style='height:20px;'></rd></tr>";
    }
    //параметры хранилища
    var mbUsed = new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 2}).format(user.spaceUsed / 1000 / 1000);
    var mbMax = user.spaceMax / 1000 / 1000;
    var perc = Math.min(100, 100 * user.spaceUsed / user.spaceMax);
    p += "<tr><td colspan='2' style='height:40px;'>"
            + "<div id='storage_size' style='height:10px;border-radius:5px;width:100%;background-color: var(--cw);'>"
            + "<div style='height:10px;border-radius:5px;  width:" + perc + "%;  background-color: var(--cb);'>" // width:25% это процент заполнения
            + "</div></div><br>"
            + "Storage is full of " + mbUsed + "mb / " + mbMax + "mb"
            + "</rd></tr>"
            + "<tr><td colspan='2' style='height:20px;'></rd></tr>"
            // выйти из аккаунта
            + "<tr><td align='center' colspan='2'>"
            + "<table onclick='tue.cloud.logout()' class='big_button' width='256px'><tbody><tr><td width='42px' class='icon icon_back'></td><td align='center'>Logout</td><td width='42px'></td></tr></tbody></table>"
            + "</td></tr>"
            + "</table>";
    return p;
}
// селектор возрастного рейтинга
function tue_age_rank_selector(projId, age) {
    var ranks = tue.cloud.getAgeRanks();
    var p = "";
    p += "<select id='tue-age_rank' onchange='tue.cloud.project_age(" + projId + ")'>";

    var noneRank = tue.cloud.getNoneRank();
    if (!age || age === noneRank.id) {
        p += "<option value='" + noneRank.id + "'" + (noneRank.id === age ? " selected" : "") + ">" + noneRank.id + "</option>";
    }

    for (var idx in ranks) {
        var rank = ranks[idx];
        p += "<option value='" + rank.id + "'" + (rank.id === age ? " selected" : "") + ">" + rank.id + "</option>";
    }
    p += "</select>";
    return p;
}
// копирует url проекта в буфер
function tue_copy_project_url() {
    var el = document.getElementById("tue-url_input");
    if (el) {
        el.select();
        el.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
    }
}

window.tue = window.tue || {};
tue.cloud = new function () {

    var User = function (jsonObj) {

        this.id;
        this.username;
        this.mail = "";
        this.spaceUsed;
        this.spaceMax;

        this.parse = function (jsonObj) {
            var obj = jsonObj || {};
            this.id = obj["id"];
            this.username = obj["username"];
            this.mail = obj["mail"] || "";
            this.spaceUsed = obj["spaceUsed"];
            this.spaceMax = obj["spaceMax"];
        };

        this.parse(jsonObj);
    };

    /**
     * Descriptor of age rank.
     */
    var AgeRank = function (jsonObj) {

        this.parse = function (jsonObj) {
            var obj = jsonObj || {};
            this.id = obj["id"];
            this.age = obj["age"];
            this.description = obj["description"];
            this.color = obj["color"];
        };

        this.id = "none";
        this.age = 0;
        this.description = "No age rating selected.";
        this.color = "#606060";

        if (jsonObj) {
            this.parse(jsonObj);
        }
    };

    /**
     * Descriptor of project.
     */
    var Project = function (jsonObj) {

        this.getPath = function () {
            return path || "";
        };

        this.hasIcon = function () {
            return this.icon && this.icon !== null;
        };

        this.isChanged = function () {
            if (this.id === currProject.id) {
                return (dataHash !== simpleHash(JSON.stringify(story_script)));
            } else {
                return false;
            }
        };

        this.isUploaded = function () {
            return (this.id !== undefined);
        };

        this.isVisible = function () {
            return (this.visibility !== 0);
        };

        this.canBeDeleted = function () {
            return (this.id !== currProject.id);
        };

        this.canBeLoaded = function () {
            return (this.id !== currProject.id);
        };

        this.lastUpdated = function () {
            if (updated) {
                var date = new Date();
                date.setTime(updated * 1000);
                return date.toLocaleString();
            } else {
                return "never";
            }

        };

        this.revealHash = function () {
            return dataHash;
        };

        this.getName = function () {
            if (this.id === currProject.id) {
                if (story_script.parameters) {
                    return story_script.parameters.title ? (story_script.parameters.title.en || story_script.parameters.title) : "new novel";
                } else {
                    return "new novel";
                }
            } else {
                return originalName;
            }
        };

        this.reset = function () {
            this.parse();
        };

        this.parse = function (jsonObj) {
            var obj = jsonObj || {};
            this.id = obj["id"];
            this.name = obj["name"];
            path = obj["path"];
            originalName = obj["originalName"];
            this.icon = obj["icon"];
            this.visibility = parseInt(obj["visibility"]);
            this.ageRank = obj["ageRank"];
            updated = obj["updated"];
            dataHash = simpleHash(JSON.stringify(obj["json"] ? obj["json"] : story_script));
        };

        var path;
        var originalName;
        var dataHash = simpleHash(JSON.stringify(story_script));
        var updated;

        this.id;
        this.name;
        this.icon;
        this.visibility;
        this.ageRank;

        this.parse(jsonObj);
    };

    var getMeta = function (metaName) {
        const metas = document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
            }
        }

        return '';
    };

    var getToken = function () {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem("token");
        } else {
            return null;
        }
    };

    var setToken = function (val) {
        token = val;
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("token", val);
        }
    };

    this.getDomain = function () {
        return domain;
    };

    this.hasUser = function () {
        return Boolean(token);
    };

    this.getNoneRank = function () {
        return new AgeRank();
    };

    this.getAgeRanks = function () {
        return ageRanks;
    };

    /**
     * Returns project descriptor by id.
     * @param {int} id
     * @returns {Project}
     */
    this.getProject = function (id) {
        return (id && id !== "undefined") ? projects[id] : currProject;
    };

    /**
     * @returns {User}
     */
    this.getCurrUser = function () {
        return currUser;
    };

    /**
     * Returns descriptor of current project.
     * @returns {Project}
     */
    this.getCurrProject = function () {
        return currProject;
    };

    /**
     * Returns all projects.
     */
    this.getProjects = function () {
        if (projects.hasOwnProperty(currProject.id)) {
            projects[currProject.id] = currProject;
            return projects;
        } else {
            var res = [currProject];
            return res.concat(projects);
        }
    };

    this.handleNewStory = function () {
        currProject.reset();
    };

    this.root = function (success, error) {
        apiCall("root/", {},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        if (error)
                            error();
                    } else {
                        if (res.data["age_ranks"]) {
                            ageRanks = [];
                            for (var idx in res.data["age_ranks"]) {
                                var data = res.data["age_ranks"][idx];
                                var rank = new AgeRank(data);
                                ageRanks[rank.age] = rank;
                            }
                        }
                        if (success)
                            success();
                    }
                },
                function () {
                    if (error)
                        error();
                }
        );
    };

    this.user = function () {
        apiCall("user/", {},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        // here all errors are auth errors
                        tue.modal_window("close");
                        tue_cloud_login();
                    } else {
                        if (res.data["user"]) {
                            currUser.parse(res.data["user"]);
                        }
                        tue.cloud.project_list();
                    }
                },
                function () {}
        );
    };

    this.login = function () {
        var name = document.getElementById("tue-input_login").value;
        var pass = document.getElementById("tue-input_pass").value;
        var errorEl = document.getElementById("tue-login_error");
        apiCall("user/login/",
                {
                    "name": name,
                    "pass": pass
                },
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        errorEl.textContent = getErrorMessage(res.errorCode);
                    } else {
                        setToken(res.data["token"]);
                        if (res.data["user"]) {
                            currUser.parse(res.data["user"]);
                        }
                        tue.modal_window("close");
                        tue_cloud();
                        tue.cloud.project_list();
                    }
                },
                function () {}
        );
    };

    this.recover = function () {
        var mail = document.getElementById("tue-mail_input").value;
        var errorEl = document.getElementById("tue-mail_error");
        var buttonEl = document.getElementById("tue-mail_button");
        var resultEl = document.getElementById("tue-mail_result");
        errorEl.textContent = "";
        apiCall("user/recover/",
                {
                    "mail": mail
                },
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        var message = "Some error occured :(";
                        switch (res.errorCode) {
                            case 1:
                                message = "Email is required!";
                                break;

                            case 4:
                                message = "No user with this email is sregistered :(";
                                break;
                        }
                        errorEl.textContent = message;
                    } else {
                        buttonEl.style = "visibility: hidden";
                        resultEl.textContent = "We have sent a new password to your email.";
                    }
                },
                function () {}
        );
    };

    this.register = function () {
        var name = document.getElementById("tue-input_login").value;
        var pass = document.getElementById("tue-input_pass").value;
        var termsAccepted = document.getElementById("tue-chbx_reg").checked;
        var errorEl = document.getElementById("tue-login_error");

        if (!termsAccepted) {
            errorEl.textContent = "You shoud check the checkbox to register :)";
            return;
        }

        apiCall("user/register/", {
            "name": name,
            "pass": pass
        },
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        errorEl.textContent = getErrorMessage(res.errorCode);
                    } else {
                        setToken(res.data["token"]);
                        if (res.data["user"]) {
                            currUser.parse(res.data["user"]);
                        }
                        tue.modal_window("close");
                        tue_cloud();
                    }
                },
                function () {}
        );
    };

    this.passwd = function () {
        var pass1 = document.getElementById("tue-pass1_input").value;
        var pass2 = document.getElementById("tue-pass2_input").value;

        if (pass1 !== pass2) {
            toast("The passwords entered do not match.", errorColor);
            return;
        }

        apiCall("user/passwd/", {
            "pass": pass1
        },
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        // all errors here are auth errors
                        tue.modal_window("close");
                        tue_cloud_login();
                    } else {
                        setToken(res.data["token"]);
                        if (res.data["user"]) {
                            currUser.parse(res.data["user"]);
                        }
                        tue.modal_window("close");
                        tue_cloud_set();
                        toast("Password updated successfully.");
                    }
                },
                function () {}
        );
    };

    this.user_email = function () {
        var mail = document.getElementById("tue-input_email").value;
        apiCall("user/email/", {
            "mail": mail
        },
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        console.log("Error: " + res.errorCode + ", " + res.errorMessage);
                        // all errors here are auth errors
                        tue.modal_window("close");
                        tue_cloud_login();
                    } else {
                        tue_cloud_set();
                        toast("Please check your mail for new messages.");
                    }
                },
                function () {}
        );
    };

    this.logout = function () {
        apiCall("user/logout/", {},
                function (data) {
                    // this method can not to generate error
                    new_project();
                    tue.modal_window("close");
                    tue_cloud_login();
                },
                function () {}
        );
    };

    this.project_list = function () {
        // TODO: limit rate of update
        apiCall("project/list/", {},
                function (data) {
                    var res = new apiResult(data);
                    projects = [];
                    if (res.isError) {
                        // all errors here are auth errors
                        tue.modal_window("close");
                        tue_cloud_login();
                    } else {
                        if (res.data["projects"]) {
                            for (var idx in res.data["projects"]) {
                                var data = res.data["projects"][idx];
                                validateImgPath(data);
                                var proj = new Project(data);
                                projects[proj.id] = proj;
                            }
                        }
                    }
                },
                function () {}
        );
    };

    this.project_upload = function (id) {
        if (id !== currProject.id) {
            console.log("Trying to upload wrong project.");
            return;
        }
        setLoading(true);
        var projectToUpdate = currProject;
        setTimeout(function () {

            prepareUpload(function (fileName, content, jsonData) {

                var formData = new FormData();
                formData.append("zipfile", content, fileName);
                formData.append("json", JSON.stringify(jsonData));
                if (id) {
                    formData.append("id", id);
                }

                apiCall("project/upload/", formData,
                        function (data) {
                            var res = new apiResult(data);
                            if (res.isError) {
                                switch (res.errorCode) {
                                    case codes.wrong_params:
                                        toast("Upload failed.", errorColor);
                                        break;
                                    case codes.already_exists:
                                        toast("Project with this name is already exist.", errorColor);
                                        break;
                                    case codes.no_space:
                                        toast("Account space exceeded.", errorColor);
                                        break;
                                    default:
                                        // other errors here are auth errors
                                        tue.modal_window("close");
                                        tue_cloud_login();
                                }
                            } else {
                                if (res.data["project"]) {
                                    projectToUpdate.parse(res.data["project"]);
                                }
                                if (res.data["user"]) {
                                    currUser.parse(res.data["user"]);
                                }
                                toast("Upload completed successfully.");
                            }
                        },
                        function () {}
                );
            });
        }, 0);
    };

    this.project_download = function (project_id) {
        apiCall("project/download/", {"id": project_id},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        // all errors here are auth errors
                        tue.modal_window("close");
                        tue_cloud_login();
                    } else {
                        tue.modal_window("close");
                        var data = res.data["json"];
                        validateImgPath(data);
                        story_script = data;
                        update_novel();
                        currProject.parse(res.data);
                        toast("Project download is completed.");
                    }
                },
                function () {}
        );
    };

    this.project_delete = function (project_id) {
        if (!project_id) {
            return;
        }

        apiCall("project/delete/", {"id": project_id},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        if (res.errorCode === codes.wrong_params) {
                            toast("Project is already deleted.", errorColor);
                        } else {
                            // other errors here are auth errors
                            tue.modal_window("close");
                            tue_cloud_login();
                        }
                    } else {
                        delete projects[project_id];
                        if (currProject.id === project_id) {
                            currProject.parse(null);
                            // so deleted project is stored locally
                        }
                        tue.modal_window("close");
                        tue_cloud_allproject();
                    }
                },
                function () {}
        );
    };

    this.project_vis = function (project_id) {
        if (!project_id) {
            return;
        }

        var el = document.getElementById("tue-proj_visibility");

        var proj = this.getProject(project_id);
        if (el.checked && !proj.ageRank || proj.ageRank === this.getNoneRank().id) {
            el.checked = false;
            toast("Please select an age rating.", errorColor);
            // TODO: show some message to select age
            return;
        }
        
        var visibility = el.checked ? 1 : 0;
        
        apiCall("project/options/", {"id": project_id, "vis": visibility},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        switch (res.errorCode) {
                            case codes.wrong_params:
                                toast("Project not found.", errorColor);
                                break;
                            case codes.need_age:
                                // TODO: highlight age selector
                                toast("Please select an age rating.", errorColor);
                                break;
                            case codes.auth_required:
                            case codes.token_expired:
                            default:
                                // other errors here are auth errors
                                tue.modal_window("close");
                                tue_cloud_login();
                                break;
                        }
                    } else {
                        tue.cloud.getProject(project_id).parse(res.data);
                        tue.modal_window("close");
                        tue_cloud(project_id);
                    }
                },
                function () {}
        );
    };

    this.project_age = function (project_id) {
        if (!project_id) {
            return;
        }

        var ageSelector = document.getElementById("tue-age_rank");
        var ageId = ageSelector.value;

        apiCall("project/options/", {"id": project_id, "age": ageId},
                function (data) {
                    var res = new apiResult(data);
                    if (res.isError) {
                        switch (res.errorCode) {
                            case codes.wrong_params:
                                toast("Project not found.", errorColor);
                                break;
                            case codes.auth_required:
                            case codes.token_expired:
                            default:
                                // other errors here are auth errors
                                tue.modal_window("close");
                                tue_cloud_login();
                                break;
                        }
                    } else {
                        tue.cloud.getProject(project_id).parse(res.data);
                        tue.modal_window("close");
                        tue_cloud(project_id);
                    }
                },
                function () {}
        );
    };

    /**
     * Parser for server response.
     * @param object jsonObj
     */
    var apiResult = function (jsonObj) {

        var success = jsonObj["success"] || {};
        var error = jsonObj["error"] || {};

        this.errorCode = error["code"] || 0;
        this.errorMessage = error["message"] || "";
        this.isError = (this.errorCode !== 0);

        this.data = success;
    };

    var codes = {
        already_exists: -2,
        not_supported: -1,
        wrong_params: 1,
        auth_required: 2,
        token_expired: 3,
        wrong_user: 4,
        wrong_pass: 5,
        name_used: 6,
        no_space: 7,
        need_age: 8
    };

    /**
     * 
     * @param {string}          method  Name of API method
     * @param {object|FormData} data    Data to send
     * @param {function}        success Callback on successful call
     * @param {function}        error   Callback for error case
     */
    var apiCall = function (method, data, success, error) {
        setLoading(true);
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var data = JSON.parse(this.responseText);
                        if (success) {
                            try {
                                success(data);
                            } catch (e) {
                                console.log("Success handler error. " + e);
                            }
                        }

                    } catch (e) {
                        console.log("Some json error. " + e);
                        if (error)
                            error();
                    }

                } else if (this.status >= 400) {
                    console.log("Some server error. Code: " + this.status);
                    toast("Some server error.", errorColor);
                    if (error) {
                        try {
                            error();
                        } catch (e) {
                            console.log()("Error handler error. " + e);
                        }
                    }
                }
                setLoading(false);
            }
        };

        request.onerror = function () {
            console.log("Internet connection error.");
            toast("Network error.", errorColor);
            if (error)
                try {
                    error();
                } catch (e) {
                    console.log()("Network error handler error. " + e);
                }
            setLoading(false);
        };

        request.open("POST", server + method, true);

        var formData;
        if (data instanceof FormData) {
            formData = data;
        } else {
            formData = new FormData();
            for (var prop in data) {
                formData.append(prop, data[prop]);
            }
        }

        if (token)
            formData.append("token", token);
        request.send(formData);
    };

    /**
     * Prepares zip for uploading to server.
     * @param {function(name, zip, json)}   callback    Called when zip is created
     */
    var prepareUpload = function (callback) {
        let story_build = JSON.parse(JSON.stringify(story_script));
        var plugins_file = "";
        var plugins_code = " ";
        if (story_script.parameters.plugins) {
            for (var i = 0; i < story_script.parameters.plugins.length; i++) {
                if (plugins_list[story_script.parameters.plugins[i]]) {
                    if (plugins_list[story_script.parameters.plugins[i]].code) {
                        plugins_code += plugins_list[story_script.parameters.plugins[i]].code + " ";
                    } else if (plugins_list[story_script.parameters.plugins[i]].file) {
                        plugins_file += "<script type='text/javascript' src='" + plugins_list[story_script.parameters.plugins[i]].file + "'><\/script>";
                    }
                } else {
                    plugins_file += ((plugins_list[story_script.parameters.plugins[i]]) ?
                            "<script type='text/javascript' src='" + plugins_list[story_script.parameters.plugins[i]].file + "'><\/script>" :
                            "<script type='text/javascript' src='" + story_script.parameters.plugins[i] + "'><\/script>");
                }
            }
        }
        var fonts = "";
        if (story_build.parameters.font_files) {
            for (var i = 0; i < Object.keys(story_build.parameters.font_files).length; i++) {
                fonts += "@font-face{font-family:" + Object.keys(story_build.parameters.font_files)[i] + ";src:url(" + story_build.parameters.font_files[Object.keys(story_build.parameters.font_files)[i]] + ");} ";
            }
        }
        var par = [((story_script.parameters.font) ? story_script.parameters.font : 0), ((story_script.parameters.font_size) ? story_script.parameters.font_size : 0), ((story_script.parameters.icon) ? story_script.parameters.icon : 0)];
        var story_preview = JSON.stringify(story_build);

        var dataStr = "<html><head>" +
                ((par[2] != 0) ?
                        "<link rel='shortcut icon' href='" + par[2] + "' type='image/x-icon'>" :
                        "") + "<meta charset='UTF-8'><style>" + fonts + " " +
                ((par[0] != 0) ? "*{font-family:" + par[0] + ";} " : "") +
                "body {" + ((par[1] != 0) ? "font-size:" + par[1] : "") +
                "; background-color:#fff; border-collapse:collapse; border:none; margin:0; padding:0; border:0; border-spacing:0px; -webkit-touch-callout:none; -webkit-user-select:none; -khtml-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;}<\/style><\/head><body><div id='tuesday' style='width:100%; height:100vh;'> <\/div><script type='text/javascript'>" + runtime + plugins_code + "<\/script>" + plugins_file + "<script>let story_novel=" + story_preview + "; load_story('data',story_novel); <\/script><\/body><\/html>";

        const reader = new FileReader();
        var arhiv = new JSZip();
        arhiv.file("index.html", dataStr);
        for (var f = 0; f < project_files.length; f++) {
            if (project_files[f][2] != "application/json" && dataStr.indexOf(project_files[f][0]) > -1) {
                arhiv.file(project_files[f][0], load_files[f], {binary: true});
            }
        }
        arhiv
                .generateAsync({type: "blob"})
                .then(function (content) {
                    var fileNamePrefix = story_script.parameters.title ?
                            (story_script.parameters.title.en || story_script.parameters.title) : "new";
                    var fileName = fileNamePrefix;

                    if (callback) {
                        callback(fileName, content, story_build);
                    }
                });
    };

    var getErrorMessage = function (errorCode) {
        switch (errorCode) {
            case codes.auth_required:
                return "Authorization required.";

            case codes.name_used:
                return "Username is already in use.";

            case codes.token_expired:
                return "Authorization required.";

            case codes.wrong_params:
                return "Wrong parameters.";

            case codes.wrong_pass:
            case codes.wrong_user:
                return "Wrong username or password.";

            default:
                return "Unknown error.";
        }
    };

    /**
     * This is a simple, *insecure* hash that's short, fast, and has no dependencies.
     * For algorithmic use, where security isn't needed, it's way simpler than sha1 (and all its deps)
     * or similar, and with a short, clean (base 36 alphanumeric) result.
     * Loosely based on the Java version; see
     * https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
     */
    const simpleHash = function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash &= hash; // Convert to 32bit integer
        }
        return new Uint32Array([hash])[0].toString(36);
    };

    const validateImgPath = function (obj) {
        var fld;
        var tf;
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                fld = obj[property];
                tf = typeof fld;
                if (tf === "object") {
                    validateImgPath(fld);
                } else if (tf === "string" && fld.startsWith('/ugc/')) {
                    obj[property] = domain + fld;
                }
            }
        }
    };

    const setLoading = function (val) {
        var el = document.getElementById("loader");
        if (el) {
            el.style.display = (val ? "initial" : "none");
        }
    };

    ///////////////////////////////////////////////////////////////////////////

    var domain = "https://tuesday.wantasoul.com";
    var server = domain + "/api/";
    var token = getToken();
    var ageRanks = [];
    var projects = [];
    var currProject = new Project();
    var currUser = new User();
    var errorColor = "#ff4444";
};
