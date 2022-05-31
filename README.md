![Tuesday js visual novels engine](https://repository-images.githubusercontent.com/233020914/1b3240ff-9db8-4163-92ba-f86e81d10967)

# Tuesday JS web visual novel engine 
is a simple web-based, free and open-source visual novel editor that can be used in a web browser. It is written in JavaScript without using any third party libraries and thus does not require additional software installation. The engine uses standard HTML5 document elements such as div and img. This allows the use of any media format supported by browsers including vector graphics svg, gif animations and css styles.
There is a version of the editor available as a standalone application for Android devices and desktops. All versions are fully compatible with each other and have the same interface.

は無駄を排した作りの、無償かつオープンソースのビジュアルノベル作成ソフトウェアです。ゲームの制作もプレイもウェブブラウザ上で可能です。JavaScriptで開発したソフトウェアですが、サードパーティ製ライブラリーを一切使用していないので、他のソフトウェアをインストールする手間は不要です。divやimgといった標準HTML5文章でお馴染みのタグや要素でゲームのスクリプトを記述し、svg形式のベクターイメージ、gif形式のアニメーション、CSSスタイルシートなど、ブラウザが扱えるファイルなら何でも使用可能です。
アンドロイド機器並びにパソコン版WindowsとMac用の単体で動作するダウンロード版もあります。各々のバージョン間には完全な互換性があり、インターフェイスも共通しています。

est un éditeur de roman visuel facile à utiliser. Gratuit et open source il tourne sur n'importe quel navigateur Web. Il est écrit en JavaScript, n'utilise pas de bibliothèques tierces et ne nécessite donc pas d'installation logicièle supplémentaire. Le moteur utilise des éléments HTML5 standard tels que div et img et permet d'utiliser n'importe quel format multimédia pris en charge par les navigateurs, y compris les graphiques vectoriels svg, les animations gif et les styles css.
Il existe une version de l'éditeur disponible en tant qu'application autonome pour les appareils Android et les ordinateurs de bureau. Toutes les versions sont entièrement compatibles entre elles et partagent la même interface.

> Home Page: https://kirilllive.github.io/tuesday-js/

> Steam: https://store.steampowered.com/app/1575970/Tuesday_JS_visual_novel_engine/

> itch.io: https://kirill-live.itch.io/tuesday-js

> Twitter: https://twitter.com/TuesdayJS_vn

[![Patreon](http://odin-interactive.com/img/patron.svg)](https://www.patreon.com/tuesday_street)

# Visual editor

visual editor for web browser https://kirilllive.github.io/tuesday-js/tuesday_visual.html

Tutorial for creating visual novels: https://kirilllive.github.io/tuesday-js/doc_editor.html#quick_tutorial

The editor displays the structure of the script with all elements such as dialog options and selection consequences. This makes it easier to navigate and edit the script.


# Visualization /ビジュアライゼーション
The visual editor allows you to create graphics or kinetic novels without any programming knowledge. If is necessary, it is possible to expand the basic functionality using JavaScript and css.

個々の選択肢や、選択の結果起こる結果などと併せてスクリプトの全体像を目で見て分かるように表示します。スクリプトの構造を簡単に把握でき、編集もしやすくなっています。

L'éditeur affiche entièrement la structure du scénario avec tous les éléments tels que les options de dialogue et les conséquences des réponses choisies. La navigation et la modification du scénario en est ainsi facilité.

![Tuesday JS script structure](screenshots/script_structure.jpg)


# Scene editor / シーンエディター
The scene editor can arrange all the elements in their places. It also shows how the scene will change on different screens. 
In the scene layout you can use standard HTML units in percentage pixels or centimeters to better adapt the scene to different screens.

機能では、全種類の要素を分類して管理できます。加えて、制作環境と異なる画面環境でゲームを動作させたときの画面構成の変化を確認できます。
標準HTML用のパーセント単位でもセンチメートル単位でもレイアウトを指定できるので、環境に合わせた適切な画面構成が作れます。

Cet éditeur vous permet d'organiser les éléments sur une scène. Il montre également comment la scène va changer sur différents écrans. 
Dans la mise en page de la scène, vous pouvez utiliser des objets HTML standard dont les dimensions s'expriment en pourcentage de pixels ou en centimètres pour mieux adapter la scène aux différents écrans.
	

![Tuesday JS scene editor](screenshots/scene_editor.jpg)


# Localization / ローカリゼーション
Tuesday JS provides ample opportunities for adapting stories into other languages.
You can set the localized translation for almost any element of your project including text and graphics.
The preview function allows you to run the project in the selected language.
All language texts can also be exported to a table csv file for editing or adding localizations in another editor.

Tuesday JSには、翻訳版を制作するための機能も豊富です。
ゲームを構成するテキストやグラフィックといった要素一つ一つに翻訳版用ファイルを設定でき、プレビュー機能で用意した翻訳版の動作確認ができます。
CSV形式のテーブルデータとして出力できるので、他のテキストエディターで翻訳文章を編集したり追加したりすることもできます。

De nombreuses possibilités d'adaptation les histoires dans d'autres langues. 
Vous pouvez définir la traduction de presque tous les éléments de votre projet, tels que le texte et les graphiques. 
La fonction d'aperçu vous permet d'exécuter le projet dans la langue sélectionnée. 
Tous les textes peuvent être exportés vers un fichier csv pour édition et ajout de localisations dans un autre éditeur, tel qu'un tableur.


![Tuesday JS localization](screenshots/localization.jpg)


# JSON
A story script has all the elements stored in a JSON structure. Almost any programming language can work with this format. This allows you to port your script to another engine or platform.
The editor has a built-in tool to work with JSON. This will allow you to edit the entire contents of the script or just the selected element.

ゲームスクリプトは、全要素をJSON形式で保存します。JSONは、一部を除く全てのプログラム言語で扱えるので、他のゲームエンジンやコンピューターにTuesday JSで作成したスクリプトを移植できます。
JSONを編集するツールを内蔵していおり、スクリプト全体をJSONとして編集することも、任意の箇所のみを編集することも可能です。
    
Tous les éléments du scénario sont stockés dans une structure JSON, un format universel lisible par la quasi totalité des langages de programmation. Vous pouvez ainsi porter votre scénario sur un autre moteur ou une autre plateforme. 
L'éditeur dispose d'un outil intégré pour travailler la structure JSON qui vous permet de modifier l'intégralité du scénario ou uniquement un élément spécifique.


![Tuesday JS json edit](screenshots/json_edit.jpg)


# Preview / プレビュー
Preview allows you to start a project from a certain point in the script with the selected localization.

各々の言語設定で、任意の時点から動作をテストできるプレビュー機能があります。

L'aperçu vous permet de démarrer un projet à partir de n'importe quel point du scénario et avec la localisation sélectionnée.


![Tuesday JS preview](screenshots/preview.jpg)


# ASCII art / アスキーアート (AA)
The engine is adapted to use ASCII graphics. With its help, you can diversify the texts with images and patterns made up of text characters.

Tuesday JSエンジンはアスキーアート(AA)を適切に表示できます。テキストで様々な絵や模様を作ることができます。


![Tuesday JS preview](screenshots/ascii_art.jpg)


# Warning for Android version

Minimum version of Android 5.1

If you have problems with files on Android 10 and higher, then you need to specify 'Allow access to manage all files' in the application settings in 'Permissions' section.

![Tuesday JS error access files on Android](https://img.itch.zone/aW1nLzcwMjY4NzYucG5n/original/8TYu95.png)

# Tutorial for RunTime

step 1
The engine file "tuesday.js" downloaded from https://kirilllive.github.io/tuesday-js/tuesday.js

step 2
Index.html file with id = 'tuesday' elements to display the novel
```html
<html>
    <head>
    </head>
    <!--After loading, the load_story function is launched, indicating a file or array with history-->
    <body onload="load_story('file','story.json')">
        <!--display area-->
        <div id='tuesday' style='width:100%; height:90vh;'></div>
        <!--path to the engine file, always at the end of the page-->
        <script type="text/javascript" src="tuesday.js"></script>
    </body>
</html>
```

step 3
Create a story file story.json
```json
{
    "parameters": {
        "text_panel": {
            "size": ["95%","25%"],
            "color": "#9cf",
            "indent_bottom": "32px",
            "size_text": "20px",
            "dialog_speed": 20
        },
        "name_panel": {
            "size": ["0","48px"],
            "position": ["0","0","-48px","0"],
            "size_text": "18px"
        },
        "launch_story": "main_menu",
        "languares": ["en"],
        "buttons": [
            {
                "name": "tue_back",
                "position": ["0","55%","0","8px"],
                "size": ["52px","52px"],
                "color": "#888",
                "size_text": "48px",
                "text":"<"
            },{
                "name": "tue_next",
                "position": ["55%","0","0","8px"],
                "size": ["52px","52px"],
                "color": "#888",
                "size_text": "48px",
                "text":">"
            }
        ]
    },
    "main_menu":[
        {
            "dialogs":[
                {
                    "choice":[
						{
                            "go_to": "story",
                            "position": ["50%","0","0","50%"],
                            "size": ["128px","48px"],
                            "color": "#888",
                            "color_text": "#fff",
                            "text": "Start"
                        }
                    ]
                }
            ]
        }
    ],
    "story": [
        {
            "dialogs":[
                {
                    "back_to": "main_menu",
                    "text":"1234567890",
                    "name":"numbers"
                },{
                    "go_to": "main_menu",
                    "text":"ABCDEFZHIKLMNOPQRSTVX",
                    "name":"letters"
                }
            ]
        }
    ]
}
```

Possible startup problems RunTime и устройстве сценария в JSON 

Index.html file with id = 'tuesday' elements to display the novel
```html
<html>
    <head>
    </head>
    <!--Change load_story value from ('file', 'story.json') to ('data', story) -->
    <body onload="load_story('data',story)">
    <div id='tuesday' style='width:100%; height:90vh;'></div>
        <!-- Add script tag before tuesday.js --> ;
        <script>
            let story = <!--insert content from story.json --> ;
        </script>
        <script type="text/javascript" src="tuesday.js"></script>
    </body>
</html>
```

More information about RunTime and JSON script  you can be found in

documentation: https://kirilllive.github.io/tuesday-js/doc_runetime.html




![Tuesday JS visual novels engine Akihabara 秋葉原](screenshots/20201202_122259.jpg)

The goal of Tuesday JS is to make project development no more difficult than working in an office program to make presentations, and does not require special skills from the user.


[Japanes translation and adaptation by Onigi](https://twitter.com/onigi123)


[![Patreon](http://odin-interactive.com/img/patron.svg)](https://www.patreon.com/tuesday_street)
