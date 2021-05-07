
(function(global){
    
    var body = document.body;

    var imgUrl = [
        // dropdown : "https://img.icons8.com/windows/24/000000/expand-arrow--v1.png",
        "https://img.icons8.com/metro/26/000000/bold.png",//bold: 
        "https://img.icons8.com/metro/26/000000/italic.png",//italic: 
        // underline: "https://img.icons8.com/android/24/000000/underline.png",
        // StrikeThrough: "https://img.icons8.com/ios-filled/50/000000/strikethrough.png",
        "https://img.icons8.com/ios-filled/32/000000/link--v1.png",//link : 
        "https://img.icons8.com/material-two-tone/24/000000/list.png",//circleList: 
        "https://img.icons8.com/ios-glyphs/48/000000/numbered-list.png",//numberList: 
        "https://img.icons8.com/ios-filled/50/000000/todo-list.png",//todoList:
    ]
    var indent = [
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggZD0iTTY5Ljk4NywyNzAuMjk5TDUuNzAzLDMzNi4wMTVjLTcuNzI0LDcuODk2LTcuNTg0LDIwLjU1OSwwLjMxMiwyOC4yODJDOS45MDYsMzY4LjEwNCwxNC45NTQsMzcwLDE5Ljk5OSwzNzANCgkJCQljNS4xOTIsMCwxMC4zOC0yLjAxLDE0LjI5OC02LjAxNWw2NC4yMTUtNjUuNjQ1QzEwOS43OTEsMjg3LjAxOCwxMTYsMjcxLjk4NiwxMTYsMjU2YzAtMTYuMDI2LTYuMjQxLTMxLjA5NC0xNy41MjYtNDIuMzc5DQoJCQkJTDM0LjE5LDE0OC45MDVjLTcuNzg0LTcuODM3LTIwLjQ0OC03Ljg4LTI4LjI4NC0wLjA5NWMtNy44MzYsNy43ODQtNy44NzksMjAuNDQ4LTAuMDk1LDI4LjI4NGw2NC4zMzIsNjQuNzYzDQoJCQkJQzczLjkxOSwyNDUuNjM2LDc2LDI1MC42NTgsNzYsMjU2cy0yLjA4MSwxMC4zNjQtNS44NTgsMTQuMTQyQzcwLjA5LDI3MC4xOTQsNzAuMDM4LDI3MC4yNDYsNjkuOTg3LDI3MC4yOTl6Ii8+DQoJCQk8cGF0aCBkPSJNMjAsNDBoNDcyYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwcy04Ljk1NC0yMC0yMC0yMEgyMEM4Ljk1NCwwLDAsOC45NTQsMCwyMFM4Ljk1NCw0MCwyMCw0MHoiLz4NCgkJCTxwYXRoIGQ9Ik00OTIsNDcySDIwYy0xMS4wNDYsMC0yMCw4Ljk1NC0yMCwyMGMwLDExLjA0Niw4Ljk1NCwyMCwyMCwyMGg0NzJjMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjANCgkJCQlDNTEyLDQ4MC45NTQsNTAzLjA0Niw0NzIsNDkyLDQ3MnoiLz4NCgkJCTxwYXRoIGQ9Ik00OTIsMTE4SDIxMmMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjBzOC45NTQsMjAsMjAsMjBoMjgwYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwQzUxMiwxMjYuOTU0LDUwMy4wNDYsMTE4LDQ5MiwxMTh6Ii8+DQoJCQk8cGF0aCBkPSJNNDkyLDIzNkgyMTJjLTExLjA0NiwwLTIwLDguOTU0LTIwLDIwczguOTU0LDIwLDIwLDIwaDI4MGMxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMEM1MTIsMjQ0Ljk1NCw1MDMuMDQ2LDIzNiw0OTIsMjM2eiIvPg0KCQkJPHBhdGggZD0iTTQ5MiwzNTRIMjEyYy0xMS4wNDYsMC0yMCw4Ljk1NC0yMCwyMGMwLDExLjA0Niw4Ljk1NCwyMCwyMCwyMGgyODBjMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjANCgkJCQlDNTEyLDM2Mi45NTQsNTAzLjA0NiwzNTQsNDkyLDM1NHoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggZD0iTTgxLjgxLDM2Mi4wOTVDODUuNzIsMzY2LjAzLDkwLjg1OSwzNjgsOTYsMzY4YzUuMDk2LDAsMTAuMTk0LTEuOTM2LDE0LjA5NS01LjgxMQ0KCQkJCWM3LjgzNi03Ljc4NCw3Ljg3OS0yMC40NDgsMC4wOTUtMjguMjg0bC02NC4zMzItNjQuNzYzQzQyLjA4MSwyNjUuMzY0LDQwLDI2MC4zNDIsNDAsMjU1YzAtNS4zNDIsMi4wODEtMTAuMzY0LDUuOTA1LTE0LjE4OQ0KCQkJCWw2NC4yODQtNjQuNzE2YzcuNzg0LTcuODM2LDcuNzQyLTIwLjUtMC4wOTUtMjguMjg0Yy03LjgzNi03Ljc4NC0yMC41LTcuNzQyLTI4LjI4NCwwLjA5NWwtNjQuMjM3LDY0LjY2OA0KCQkJCUM2LjI0MSwyMjMuOTA2LDAsMjM4Ljk3NCwwLDI1NXM2LjI0MSwzMS4wOTQsMTcuNTI2LDQyLjM3OUw4MS44MSwzNjIuMDk1eiIvPg0KCQkJPHBhdGggZD0iTTIwLDQwaDQ3MmMxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMHMtOC45NTQtMjAtMjAtMjBIMjBDOC45NTQsMCwwLDguOTU0LDAsMjBTOC45NTQsNDAsMjAsNDB6Ii8+DQoJCQk8cGF0aCBkPSJNNDkyLDQ3MkgyMGMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjBoNDcyYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwDQoJCQkJQzUxMiw0ODAuOTU0LDUwMy4wNDYsNDcyLDQ5Miw0NzJ6Ii8+DQoJCQk8cGF0aCBkPSJNNDkyLDM1NEgyMTJjLTExLjA0NiwwLTIwLDguOTU0LTIwLDIwYzAsMTEuMDQ2LDguOTU0LDIwLDIwLDIwaDI4MGMxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMA0KCQkJCUM1MTIsMzYyLjk1NCw1MDMuMDQ2LDM1NCw0OTIsMzU0eiIvPg0KCQkJPHBhdGggZD0iTTQ5MiwxMThIMjEyYy0xMS4wNDYsMC0yMCw4Ljk1NC0yMCwyMHM4Ljk1NCwyMCwyMCwyMGgyODBjMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjBDNTEyLDEyNi45NTQsNTAzLjA0NiwxMTgsNDkyLDExOHoiLz4NCgkJCTxwYXRoIGQ9Ik00OTIsMjM2SDIxMmMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjBzOC45NTQsMjAsMjAsMjBoMjgwYzExLjA0NiwwLDIwLTguOTU0LDIwLTIwQzUxMiwyNDQuOTU0LDUwMy4wNDYsMjM2LDQ5MiwyMzZ6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
    ]
    var doIcon = [
        "https://img.icons8.com/android/24/000000/undo.png", // undo
        "https://img.icons8.com/android/24/000000/redo.png" // redo
    ]
    function CKEditor() {
        
    }
    
    

    var headerDivText = ['Classic', 'Document', 'Pagination'];
    var mainDivText = ['toolbar', 'content', 'word-count'];
    
    CKEditor.prototype.createTemplate = function(){

        var wrap = document.createElement('div');
        var header = document.createElement('header');
        var main = document.createElement('main');

        wrap.setAttribute('class', 'wrap');
        header.setAttribute('class', 'header');
        main.setAttribute('class','main');
        
        for(var i=0; i<headerDivText.length; i++){
            var headerDiv = document.createElement('div');
            headerDiv.setAttribute('class','headerDiv');
            headerDiv.textContent = headerDivText[i];
            header.appendChild(headerDiv);
        }

        for(var i=0; i<mainDivText.length; i++){
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute('class', mainDivText[i]);
            // mainDiv.className += ' mainDiv';
            main.appendChild(mainDiv);
        }

        wrap.appendChild(header);
        wrap.appendChild(main);

        body.appendChild(wrap)

        this.wrap = wrap;

    }

    CKEditor.prototype.createMainToolbar = function(){
        
        var mainHeader = this.wrap.querySelector('.toolbar');
        var fr = document.createDocumentFragment();
        var headingDiv = document.createElement('div');
        var headingSelectDiv = document.createElement('div');

        headingSelectDiv.setAttribute('class', headingSelectDiv);
        // headingSelectDiv.style.display = "none";

        headingDiv.setAttribute('class','heading');
        fr.appendChild(headingDiv);
        fr.appendChild(headingSelectDiv);
        
        var span = document.createElement('span');
        span.setAttribute('class', 'seperate');
        fr.appendChild(span);
        
        for(var i=0; i< imgUrl.length; i++){
            var button = document.createElement('button');
            button.setAttribute('class','toolbarButton');
            button.style.backgroundImage = "url("+imgUrl[i]+")";
            fr.appendChild(button);
        }
        span = document.createElement('span');
        span.setAttribute('class', 'seperate');
        fr.appendChild(span);

        for(var i=0; i<2; i++){
            var button = document.createElement('button');
            button.setAttribute('class','toolbarButton');
            button.style.backgroundImage = "url("+indent[i]+")";
            fr.appendChild(button);
        }
        span = document.createElement('span');
        span.setAttribute('class', 'seperate');
        fr.appendChild(span);

        for(var i=0; i<2; i++){
            var button = document.createElement('button');
            button.setAttribute('class','toolbarButton');
            fr.appendChild(button);
        }
        for(var i=0; i<2; i++){
            var div = document.createElement('div');
            div.setAttribute('class','toolbarButton');
            div.className += ' toolbarDiv';
            fr.appendChild(div);
        }
        for(var i=0; i<2; i++){
            var button = document.createElement('button');
            button.setAttribute('class','toolbarButton');
            button.style.backgroundImage = "url("+doIcon[i]+")";
            fr.appendChild(button);
        }
        console.log(this.wrap)
        console.log(mainHeader);

        
        mainHeader.appendChild(fr);
        for(var i=0; i<mainHeader.childNodes.length; i++){
            mainHeader.childNodes[i].className += ' toolbarItem';
            console.log(mainHeader.childNodes[i].className);
        }

        // <div> <span> <button> <button> <button> <button> <button> <button> <span> <button> <button> <span> <button> <button> <di> <div> <button> <button>
    }

    CKEditor.prototype.addToolbarHeadingEvent = function(){
        var heading = this.wrap.querySelector('.heading');
        
        heading.addEventListener('click', function(){

        })

        
    }
    CKEditor.prototype.createMainContent = function(){

    }
    CKEditor.prototype.createMainWordCount = function(){

    }
    

    CKEditor.prototype.createAll = function(){
        this.createTemplate();
        this.createMainToolbar();
    }
    global.CKEditor = CKEditor;
})(window);