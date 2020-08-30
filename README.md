![Tuesday](https://img.itch.zone/aW1nLzQxNTI0OTQuanBn/original/F9HH9o.jpg)
# Tuesday
is a free open source engine for creating visual novels, interactive stories and text-based adventure games. Written in JavaScript without using any third party libraries. There is support for the Apache Cordova framework for building native mobile and desktop applications. The engine uses standard Html document elements like div and img, which makes it possible to use almost any media format supported by browsers, including vector graphics in svg format, gif animations and the use of extensive css styles.

Home Page: https://kirilllive.github.io/Tuesday/

Documentation: https://kirilllive.github.io/Tuesday/tuesday_doc.html

itch.io: https://kirill-live.itch.io/tuesday

# Getting started

step 1
The engine file "tuesday.js" downloaded from https://kirilllive.github.io/Tuesday/tuesday.js

step 2
Index.html file with id = 'tuesday' elements to display the novel
```<html>
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
``` {
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
            "position": ["0","0","0px","0"],
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
    },"main_menu":[
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
    ],"story": [
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
```<html>
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
