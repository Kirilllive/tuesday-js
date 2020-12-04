![Tuesday js visual novels engine](https://img.itch.zone/aW1nLzQ2NjQ2MjIuanBn/original/CuLgIr.jpg)

# Tuesday JS
is a free open source engine to creating visual novels, interactive stories and text-based adventure games. Written in JavaScript without using any third party libraries. The projects can be exported to Apache Cordova to create mobile applications or PC programs. The engine uses standard HTML document elements DOM such as div and img, this allows the use any media format supported by browsers, including vector graphics svg, gif animations and css styles.

は、ビジュアルノベルやインタラクティブフィクション、テキストベースの冒険ゲームを作るためのオープンエンジンです。JavaScriptで書かれており、サードベンダーのライブラリは使われていません。pc用のモバイルアプリやプログラムを作る際の、Apache Cordovaフレームワークによるサポートがあります。エンジンには、divやimgのようなHTMLドキュメントの標準要素DOMを使用しており、ブラウザによってサポートされている、svgグラフィックやgifやcssスタイルのアニメを含む、任意のメディアフォーマットを使うことができます。

Home Page: https://kirilllive.github.io/tuesday-js/

Documentation: https://kirilllive.github.io/tuesday-js/tuesday_doc.html

Patreon: https://www.patreon.com/kirill_live

itch.io: https://kirill-live.itch.io/tuesday

Twitter: https://twitter.com/TuesdayJs

# Visual editor

visual editor for web browser https://kirilllive.github.io/tuesday-js/tuesday_visual.html

The visual editor allows you to create graphics or kinetic novels without any programming knowledge.
If is necessary, it is possible to expand the basic functionality using JavaScript and css.

ビジュアルエディターはグラフィックもしくはキネティックノベルを、プログラミングの知識なしで作ることができます。
必要であれば、JavaScriptやcssを使って、基本機能を拡大することができます。


# Visualization
The editor fully displays the structure of the script with all elements such as dialog options and selection consequences. This makes it easier to navigate and edit the script.

エディターは、会話オプションや選択肢のような全ての要素を伴うスクリプトの構造を完全に映し出します。これにより、ナビやスクリプトを編集しやすくします。

![Tuesday JS script structure](screenshots/script_structure.png)


# Scene editor
The scene editor can not only arrange all the elements in their places, it also shows how the scene will change on different screens. 
In your scene layout, you can use standard HTML units in percentage pixels or centimeters to better adapt the scene to different screens.

は、すべての要素をその場所に配置できるだけでなく、さまざまな画面でシーンがどのように変化するかを示します。 
シーンレイアウトでは、パーセンテージピクセルまたはセンチメートル単位の標準HTML単位を使用して、シーンをさまざまな画面により適切に適合させることができます。

![Tuesday JS scene editor](screenshots/scene_editor.png)


# Localization
Ample opportunities to localize stories into other languages.
You can set the translation for almost any element of your project, such as text and graphics.
The preview function allows you to run the project in the selected language.
All texts can be exported to a table csv file for editing and adding localizations in another editor.

他言語にストーリーをローカリゼーションできる広い可能性。
テキストやグラフィックのような、プロジェクトの任意の要素を翻訳できます。
プレビュー機能により、選択した言語でプロジェクトを運営することができます。
すべてのテキストは、編集や他の版にローカリゼーションしたものを加えることができるよう、table csv fileに書き出されます。

![Tuesday JS localization](screenshots/localization.png)


# JSON
A story script with all the elements stored in a JSON structure. Almost any programming language can work with this format. This allows you to port your script to another engine or platform.
The editor has a built-in tool to work with JSON, with its help you can edit the entire contents of the script or just the selected element.

すべての要素を含むスクリプトはJSON形式で保存されます。この形式で、ほとんどのプログラミングげんごが使えます。これにより、あなたのスクリプトを、他のエンジンやプラットフォームに移すことができます。
エディターにはJSONで作業するための埋め込みツールがあり、スクリプトのすべてのコンテンツや選択した要素を編集することができます。

![Tuesday JS json edit](screenshots/json_edit.png)


# Preview
Preview allows you to start a project from a certain point in the script and with the selected localization.

プレビューにより、スクリプトの特定の部分や選択したローカライゼーションでプロジェクトを始めることができます。

![Tuesday JS preview](screenshots/preview.png)


# Getting started

step 1
The engine file "tuesday.js" downloaded from https://kirilllive.github.io/Tuesday/tuesday.js

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

Possible startup problems

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

![Tuesday JS visual novels engine Akihabara 秋葉原](screenshots/20201202_122259.jpg)
