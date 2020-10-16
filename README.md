![Tuesday](https://img.itch.zone/aW1nLzQzMDYwNjAuanBn/original/wfrS1w.jpg)
# Tuesday JS
a free open source engine for creating visual novels, interactive stories and text-based adventure games. Written in JavaScript without using any third party libraries. There is support for the Apache Cordova framework for building native mobile and desktop applications. The engine uses standard Html document elements such as div and img, which allows for almost any media format supported by browsers, including vector graphics in svg format, gif animations and css styles.

Home Page: https://kirilllive.github.io/tuesday-js/

Documentation: https://kirilllive.github.io/tuesday-js/tuesday_doc.html

Patreon: https://www.patreon.com/kirill_live

itch.io: https://kirill-live.itch.io/tuesday

Twitter: https://twitter.com/TuesdayJs

# Visual editor

visual editor for web browser https://kirilllive.github.io/tuesday-js/tuesday_visual.html

The visual editor allows you to create a graphic or kinetic novel without programming knowledge.
If necessary, it is possible to expand the basic functionality using JavaScript and css.

# Visualization
The editor fully displays the structure of the script with all elements such as dialogue options and consequences of choices. This makes it easier to navigate the script and edit the script.

![Tuesday script structure](screenshots/script_structure.png)

# Localization
Extensive possibilities for localizing history into other languages.
You can set translation for almost any element of the story, both text and graphics.
The preview function allows you to run the project in the selected language.
All texts can be exported to a tabular csv file for editing and adding localization in another editor.

![Tuesday localization](screenshots/localization.png)

# JSON
The story script with all elements is specified in the format structure JSON. This format can be read by almost any other programming language or engine.
This makes it easier and faster to port the script to another engine or platform.
The editor has a built-in tool for working with JSON directly, you can edit the entire script or only part of it from the selected element.

![Tuesday json edit](screenshots/json_edit.png)

# Preview
Preview allows you to launch a project from a certain point in history and at a selected localization.

![Tuesday preview](screenshots/preview.png)

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
