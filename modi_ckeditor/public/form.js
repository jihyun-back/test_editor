(function (global) {


    var list = {
        mainDivList: ['toolbar', 'content', 'footer'],
        contentList: ['edit', 'html', 'preview'],
        toolbarList: ['heading', 'bold', 'italic', 'underline', 'strikeThrough', 'newPage', 'imageUpload', 'indent', 'outdent'],
        headerDivText: ['Classic', 'Balloon', 'Balloon Block', 'Inline', 'Document', 'Pagination'],
        headerSelect: ['Heading1', 'Heading2', 'Heading3', 'Paragraph']
    };


    var toolbarImgUrl = {
        headingImgUrl: "https://img.icons8.com/windows/24/000000/expand-arrow--v1.png",
        boldImgUrl: "https://img.icons8.com/metro/26/000000/bold.png",
        italicImgUrl: "https://img.icons8.com/metro/26/000000/italic.png",
        underlineImgUrl: "https://img.icons8.com/android/24/000000/underline.png",
        strikeThroughImgUrl: "https://img.icons8.com/ios-filled/50/000000/strikethrough.png",
        newPageImgUrl: "https://img.icons8.com/office/16/000000/new-by-copy--v1.png",
        imageUploadImgUrl: "https://img.icons8.com/ios/50/000000/image.png",
        outdentImgUrl: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUxMS42MjZweCIgaGVpZ2h0PSI1MTEuNjI2cHgiIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMS42MjYgNTExLjYyNjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik01MDIuNDksMzgzLjcyMkg5LjEzNWMtMi40NzQsMC00LjYxNSwwLjg5Ni02LjQyMywyLjcwN0MwLjkwMywzODguMjM4LDAsMzkwLjM3OCwwLDM5Mi44NTR2NTQuODINCgkJCWMwLDIuNDcxLDAuOTAzLDQuNjA5LDIuNzEyLDYuNDJjMS44MDksMS44MTMsMy45NDksMi43MTQsNi40MjMsMi43MTRINTAyLjQ5YzIuNDc4LDAsNC42MTYtMC45MDMsNi40MjctMi43MTQNCgkJCWMxLjgxLTEuODExLDIuNzEtMy45NDksMi43MS02LjQydi01NC44MmMwLTIuNDc3LTAuOTAzLTQuNjE2LTIuNzEtNi40MjZDNTA3LjEwNiwzODQuNjI1LDUwNC45NjcsMzgzLjcyMiw1MDIuNDksMzgzLjcyMnoiLz4NCgkJPHBhdGggZD0iTTEwMC41LDM0Ny4xNjljMi40NzMsMCw0LjYxNS0wLjg5Niw2LjQyMy0yLjcwN2MxLjgwNy0xLjgwNywyLjcxMi0zLjk0OSwyLjcxMi02LjQyN1YxNzMuNTg5DQoJCQljMC0yLjQ3NS0wLjkwNS00LjYxNy0yLjcxMi02LjQyN2MtMS44MDktMS44MDYtMy45NTEtMi43MDktNi40MjMtMi43MDljLTIuNjY3LDAtNC44NTQsMC44NTQtNi41NjcsMi41NjhsLTgyLjIyNiw4Mi4yMjQNCgkJCWMtMS43MDksMS43MTUtMi41NjgsMy45MDEtMi41NjgsNi41NjdjMCwyLjY2NSwwLjg1NSw0Ljg1NCwyLjU2OCw2LjU2NWw4Mi4yMjYsODIuMjI5DQoJCQlDOTUuNjQ2LDM0Ni4zMTcsOTcuODMzLDM0Ny4xNjksMTAwLjUsMzQ3LjE2OXoiLz4NCgkJPHBhdGggZD0iTTUwMi40OSwxNjQuNDUzSDE5MS44NmMtMi40NzQsMC00LjYxNSwwLjktNi40MjMsMi43MDljLTEuODA5LDEuODEtMi43MTIsMy45NTItMi43MTIsNi40Mjd2NTQuODE3DQoJCQljMCwyLjQ3MywwLjkwMyw0LjYxNSwyLjcxMiw2LjQyNGMxLjgwOSwxLjgwMywzLjk0OSwyLjcxMiw2LjQyMywyLjcxMmgzMTAuNjNjMi40NzgsMCw0LjYxNi0wLjkwNSw2LjQyNy0yLjcxMg0KCQkJYzEuODEtMS44MDksMi43MS0zLjk1MSwyLjcxLTYuNDI0di01NC44MTdjMC0yLjQ3NS0wLjkwMy00LjYxNy0yLjcxLTYuNDI3QzUwNy4xMDYsMTY1LjM1Niw1MDQuOTY3LDE2NC40NTMsNTAyLjQ5LDE2NC40NTN6Ii8+DQoJCTxwYXRoIGQ9Ik01MDIuNDksMjc0LjA4MkgxOTEuODZjLTIuNDc0LDAtNC42MTUsMC45MS02LjQyMywyLjcxNHMtMi43MTIsMy45NTMtMi43MTIsNi40MjR2NTQuODE1YzAsMi40NzgsMC45MDMsNC42MiwyLjcxMiw2LjQyNw0KCQkJYzEuODA5LDEuODA4LDMuOTQ5LDIuNzA3LDYuNDIzLDIuNzA3aDMxMC42M2MyLjQ3OCwwLDQuNjE2LTAuODk2LDYuNDI3LTIuNzA3YzEuODEtMS44MDcsMi43MS0zLjk0OSwyLjcxLTYuNDI3VjI4My4yMg0KCQkJYzAtMi40NzEtMC45MDMtNC42MTMtMi43MS02LjQyNEM1MDcuMTA2LDI3NC45OTIsNTA0Ljk2NywyNzQuMDgyLDUwMi40OSwyNzQuMDgyeiIvPg0KCQk8cGF0aCBkPSJNNTA4LjkxNyw1Ny41MjljLTEuODExLTEuODA1LTMuOTQ5LTIuNzEyLTYuNDI3LTIuNzEySDkuMTM1Yy0yLjQ3NCwwLTQuNjE1LDAuOTAzLTYuNDIzLDIuNzEyUzAsNjEuNDc5LDAsNjMuOTUzdjU0LjgxNw0KCQkJYzAsMi40NzUsMC45MDMsNC42MTUsMi43MTIsNi40MjRzMy45NDksMi43MTIsNi40MjMsMi43MTJINTAyLjQ5YzIuNDc4LDAsNC42MTYtMC45LDYuNDI3LTIuNzEyDQoJCQljMS44MS0xLjgwOSwyLjcxLTMuOTQ5LDIuNzEtNi40MjRWNjMuOTUzQzUxMS42MjYsNjEuNDc5LDUxMC43MjMsNTkuMzM4LDUwOC45MTcsNTcuNTI5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        indentImgUrl: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjUxMS42MjZweCIgaGVpZ2h0PSI1MTEuNjI2cHgiIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMS42MjYgNTExLjYyNjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik05LjEzOSwzNDcuMTczYzIuNjY3LDAsNC44NTQtMC44NTUsNi41NjctMi41NjZsODIuMjI0LTgyLjIyOWMxLjcxMS0xLjcxMSwyLjU3LTMuOSwyLjU3LTYuNTY1DQoJCQljMC0yLjY2Ni0wLjg1OS00Ljg1My0yLjU3LTYuNTY3bC04Mi4yMjQtODIuMjI0Yy0xLjcxMy0xLjcxNC0zLjktMi41NjgtNi41NjctMi41NjhjLTIuNDc0LDAtNC42MTUsMC45LTYuNDIzLDIuNzA5DQoJCQljLTEuODA5LDEuODEtMi43MTIsMy45NTItMi43MTIsNi40Mjd2MTY0LjQ0NmMwLDIuNDc4LDAuOTAzLDQuNjIsMi43MTIsNi40MjdDNC41MjQsMzQ2LjI2Niw2LjY2NSwzNDcuMTczLDkuMTM5LDM0Ny4xNzN6Ii8+DQoJCTxwYXRoIGQ9Ik01MDIuNDksMzgzLjcyMkg5LjEzNWMtMi40NzQsMC00LjYxNSwwLjg5Ni02LjQyMywyLjcwN0MwLjkwMywzODguMjM4LDAsMzkwLjM3OCwwLDM5Mi44NTR2NTQuODINCgkJCWMwLDIuNDcxLDAuOTAzLDQuNjA5LDIuNzEyLDYuNDJjMS44MDksMS44MTMsMy45NDksMi43MTQsNi40MjMsMi43MTRINTAyLjQ5YzIuNDc4LDAsNC42MTYtMC45MDMsNi40MjctMi43MTQNCgkJCWMxLjgxLTEuODExLDIuNzEtMy45NDksMi43MS02LjQydi01NC44MmMwLTIuNDc3LTAuOTAzLTQuNjE2LTIuNzEtNi40MjZDNTA3LjEwNiwzODQuNjI1LDUwNC45NjcsMzgzLjcyMiw1MDIuNDksMzgzLjcyMnoiLz4NCgkJPHBhdGggZD0iTTUwMi40OSwyNzQuMDgySDE5MS44NmMtMi40NzQsMC00LjYxNSwwLjkxLTYuNDIzLDIuNzE0cy0yLjcxMiwzLjk1My0yLjcxMiw2LjQyNHY1NC44MTVjMCwyLjQ3OCwwLjkwMyw0LjYyLDIuNzEyLDYuNDI3DQoJCQljMS44MDksMS44MDgsMy45NDksMi43MDcsNi40MjMsMi43MDdoMzEwLjYzYzIuNDc4LDAsNC42MTYtMC44OTYsNi40MjctMi43MDdjMS44MS0xLjgwNywyLjcxLTMuOTQ5LDIuNzEtNi40MjdWMjgzLjIyDQoJCQljMC0yLjQ3MS0wLjkwMy00LjYxMy0yLjcxLTYuNDI0QzUwNy4xMDYsMjc0Ljk5Miw1MDQuOTY3LDI3NC4wODIsNTAyLjQ5LDI3NC4wODJ6Ii8+DQoJCTxwYXRoIGQ9Ik01MDIuNDksMTY0LjQ1M0gxOTEuODZjLTIuNDc0LDAtNC42MTUsMC45LTYuNDIzLDIuNzA5Yy0xLjgwOSwxLjgxLTIuNzEyLDMuOTUyLTIuNzEyLDYuNDI3djU0LjgxNw0KCQkJYzAsMi40NzMsMC45MDMsNC42MTUsMi43MTIsNi40MjRjMS44MDksMS44MDMsMy45NDksMi43MTIsNi40MjMsMi43MTJoMzEwLjYzYzIuNDc4LDAsNC42MTYtMC45MDUsNi40MjctMi43MTINCgkJCWMxLjgxLTEuODA5LDIuNzEtMy45NTEsMi43MS02LjQyNHYtNTQuODE3YzAtMi40NzUtMC45MDMtNC42MTctMi43MS02LjQyN0M1MDcuMTA2LDE2NS4zNTYsNTA0Ljk2NywxNjQuNDUzLDUwMi40OSwxNjQuNDUzeiIvPg0KCQk8cGF0aCBkPSJNNTA4LjkxNyw1Ny41MjljLTEuODExLTEuODA1LTMuOTQ5LTIuNzEyLTYuNDI3LTIuNzEySDkuMTM1Yy0yLjQ3NCwwLTQuNjE1LDAuOTAzLTYuNDIzLDIuNzEyUzAsNjEuNDc5LDAsNjMuOTUzdjU0LjgxNw0KCQkJYzAsMi40NzUsMC45MDMsNC42MTUsMi43MTIsNi40MjRzMy45NDksMi43MTIsNi40MjMsMi43MTJINTAyLjQ5YzIuNDc4LDAsNC42MTYtMC45LDYuNDI3LTIuNzEyDQoJCQljMS44MS0xLjgwOSwyLjcxLTMuOTQ5LDIuNzEtNi40MjRWNjMuOTUzQzUxMS42MjYsNjEuNDc5LDUxMC43MjMsNTkuMzM4LDUwOC45MTcsNTcuNTI5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
    };

    function Editor(node) {
        this.element = {
            root: document.getElementById(node)
        }
    }

    Editor.prototype.createTemplate = function () {


        var header = document.createElement('header');
        var main = document.createElement('main');
        document.querySelector

        header.setAttribute('class', 'header');
        main.setAttribute('class', 'main');

        document.body.prepend(header);
        this.element.root.appendChild(main);
        this.element.main = main;
    }

    Editor.prototype.createHeader = function () {

        var header = document.querySelector('.header');
        list.headerDivText.forEach(function (el) {
            var div = document.createElement('div');
            div.setAttribute('class', el);
            div.classList.add('class', 'headerDiv');
            div.textContent = el;
            header.appendChild(div);
        })
    }
    Editor.prototype.createMain = function () {

        var tmp = document.createDocumentFragment();

        list.mainDivList.forEach(function (el) {
            var div = document.createElement('div');
            div.setAttribute('class', el);
            tmp.appendChild(div);
        })

        this.element.main.appendChild(tmp);
    }

    Editor.prototype.createMainToolbar = function () {

        var tmp = document.createDocumentFragment();
        var toolbar = this.element.main.querySelector('.toolbar');

        list.toolbarList.forEach(function (el) {
            var div = document.createElement('div');
            div.setAttribute('class', el);
            div.style.backgroundImage = "url(" + toolbarImgUrl[el + 'ImgUrl'] + ")";
            div.classList.add('toolbarDiv');

            tmp.appendChild(div);

            if (el == 'heading' || el == 'strikeThrough' || el == 'imageUpload') {
                var span = document.createElement('span');
                span.setAttribute('class', 'seperate');
                div.after(span);
            }

            if (el == 'heading') {

                var headingSpan = document.createElement('span');
                headingSpan.textContent = 'Heading1';
                headingSpan.setAttribute('class', 'headingSpan');

                var headingSelectDiv = document.createElement('div');
                headingSelectDiv.setAttribute('class', 'headingSelectDiv');
                headingSelectDiv.style.display = 'none';

                list.headerSelect.forEach(function (el) {
                    var headingLi = document.createElement('li');
                    headingLi.setAttribute('class', el);
                    headingLi.classList.add('headingLi');
                    headingLi.style.fontSize = el;
                    headingLi.textContent = el;
                    headingSelectDiv.appendChild(headingLi);
                })

                div.appendChild(headingSpan);
                div.appendChild(headingSelectDiv)

            }
            if (el == 'imageUpload') {
                var form = document.createElement('form');

                form.setAttribute('enctype', 'multipart/form-data');
                form.setAttribute('method', 'POST');
                form.setAttribute('class', 'uploadForm');
                form.setAttribute('name', 'uploadForm');
                form.setAttribute('action', './up');

                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('class', 'file');
                input.setAttribute('name', 'img');
                input.style.display = 'none';

                form.appendChild(input);
                div.appendChild(form);
            }
            if (el == 'bold' || el == 'italic' || el == 'underline' || el == 'strikeThrough') {
                div.classList.add('deco');
            }


        })

        toolbar.appendChild(tmp);
    }


    function setDecoButtonColor(button, commandState) {
        if (document.queryCommandState(commandState)) {
            button.style.backgroundColor = "#ccc";
        } else {
            button.style.backgroundColor = "transparent";
        }
    }


    Editor.prototype.addHeadingDeco = function (headingName) {
        var caret = this.element.caret;
        var sel = document.getSelection();
        var rng = document.createRange();

        var start = caret.startContainer;
        var end = caret.endContainer;

        var arr = [];
        // parentNode구하기
        function getStartEndContainer(caretParentNode) {
            while (caretParentNode !== null) {
                if (caretParentNode.tagName === 'P' || caretParentNode.tagName === 'H1' || caretParentNode.tagName === 'H2' || caretParentNode.tagName === 'H3') {
                    return caretParentNode;
                }
                caretParentNode = caretParentNode.parentNode || caretParentNode.parentElement;
            }
        }
        var startParent = getStartEndContainer(start);
        var endParent = getStartEndContainer(end);

        function test(start, end) {
            var testArr = [];

            while (start !== end) {
                if (start.tagName === 'P' || start.tagName === 'H1' || start.tagName === 'H2' || start.tagName === 'H3') {
                    testArr.push(start);
                } else if (start.tagName === 'DIV') {
                    if (start.childNodes.length > 0) {
                        testArr.push(test(start.firstElementChild, end).flat());
                        break;
                    }
                }

                if (start.nextElementSibling !== null) {
                    start = start.nextElementSibling;
                } else {
                    while (start.parentElement !== null) {
                        start = start.parentElement;

                        if (start.nextElementSibling !== null) {
                            start = start.nextElementSibling;
                            break;
                        }
                    }
                }
            }
            if (start == end) {
                testArr.push(start);
            }
            return testArr.flat();
        }

        arr.push(test(startParent, endParent).flat());

        var startIndex = 0;
        var endIndex = 0;
        if (start.parentElement.tagName == 'P' || start.parentElement.tagName == 'H1' || start.parentElement.tagName == 'H2' || start.parentElement.tagName == 'H3') {
            for (var i = 0; i < start.parentElement.childNodes.length; i++) {
                if (start.parentElement.childNodes[i] === start) {
                    startIndex = i;
                }
            }
        } else {
            for (var i = 0; i < start.parentElement.parentElement.childNodes.length; i++) {
                if (start.parentElement.parentElement.childNodes[i] === start.parentElement) {
                    startIndex = i;
                }
            }
        }
        if (end.parentElement.tagName == 'P' || end.parentElement.tagName == 'H1' || end.parentElement.tagName == 'H2' || end.parentElement.tagName == 'H3') {
            for (var i = 0; i < end.parentElement.childNodes.length; i++) {
                if (end.parentElement.childNodes[i] === end) {
                    endIndex = i;
                }
            }
        } else {
            for (var i = 0; i < end.parentElement.parentElement.childNodes.length; i++) {
                if (end.parentElement.parentElement.childNodes[i] === end.parentElement) {
                    endIndex = i;
                }
            }
        }

        var startOffset = this.element.caret.startOffset;
        var endOffset = this.element.caret.endOffset;

        if (arr.flat() !== null) {
            var stAnch = '';
            var enAnch = '';

            if (headingName === 'h1' || headingName === 'h2' || headingName === 'h3') {
                arr.flat().forEach(function (el, index) {
                    var node = document.createElement(headingName);
                    node.innerHTML = el.innerHTML;
                    el.outerHTML = node.outerHTML;
                })

            } else {
                arr.flat().forEach(function (el,index) {
                    var node = document.createElement('p');
                    el.style.font = '14px Verdana';
                    node.innerHTML = el.innerHTML;
                    el.outerHTML = node.outerHTML;
                })
            }

            stAnch = this.element.caret.startContainer.childNodes[this.element.caret.startOffset];
            enAnch = this.element.caret.endContainer.childNodes[this.element.caret.endOffset];

            if (stAnch.childNodes.length > 1 && startIndex !== 0) {
                rng.setStart(stAnch.childNodes[startIndex].childNodes[0], startOffset);
                if (enAnch.childNodes.length > 1 && endIndex !== 0) {
                    rng.setEnd(enAnch.childNodes[endIndex].childNodes[0], endOffset)
                } else {
                    rng.setEnd(enAnch.childNodes[0], endOffset)
                }

            } else {
                rng.setStart(stAnch.childNodes[0], startOffset);
                if (enAnch.childNodes.length > 1 && endIndex !== 0) {
                    rng.setEnd(enAnch.childNodes[endIndex].childNodes[0], endOffset)
                } else {
                    rng.setEnd(enAnch.childNodes[0], endOffset)
                }
            }
            sel.removeAllRanges();
            sel.addRange(rng);
            
            // range 저장하는 방법
            // 1. outerHTML 수정
            // 2. appendChild를 통해 기존 태그의 자식을 삽입 후 기존 태그를 지운다
            // 3. 기존 range에 span태그를 생성 후 내용을 지운 뒤에 새로 만든 태그를 넣어준다.

        }


    }
    Editor.prototype.addToolbarEvent = function () {
        var me = this;

        // heading
        var heading = me.element.main.querySelector('.heading');
        heading.addEventListener('click', function (e) {
            me.element.main.querySelector('.headingSelectDiv').zIndex = 11;
            $('.headingSelectDiv').toggle();
        })
        var headingli = me.element.main.querySelectorAll('.headingLi');
        headingli.forEach(function (el) {
            el.addEventListener('click', function () {

                switch (el.className.split(' ')[0]) {
                    case 'Heading1': {
                        me.addHeadingDeco('h1');
                        break;
                    }
                    case 'Heading2': {
                        me.addHeadingDeco('h2');
                        break;
                    }
                    case 'Heading3': {
                        me.addHeadingDeco('h3');
                        break;
                    }
                    case 'Paragraph': {
                        me.addHeadingDeco('paragraph');
                        break;
                    }
                }
            })
        })
        // deco
        var deco = me.element.main.querySelectorAll('.deco');

        deco.forEach(function (el) {

            el.addEventListener('click', function () {
                var decoName = el.className.split(' ')[0];
                document.execCommand(decoName)
                setDecoButtonColor(el, decoName);
            })
        })

        document.addEventListener('selectionchange', function (e) {

            if (e.target.activeElement.parentElement.className === 'content') {
                deco.forEach(function (el) {
                    setDecoButtonColor(el, el.className.split(' ')[0]);
                })
            }
            if (me.element.main.querySelector('.edit') == document.activeElement) {
                me.saveRange();
            }
        })
        // newpage
        var newPage = me.element.main.querySelector('.newPage');
        newPage.addEventListener('click', function () {
            me.toEdit();
            me.element.main.querySelector('.edit').innerHTML = "<p><br></p>"
        });
        // imageupload
        var imageUpload = me.element.main.querySelector('.imageUpload');
        var fileInput = me.element.main.querySelector('.file');
        imageUpload.addEventListener('click', function () {
            var agent = navigator.userAgent.toLowerCase();

            if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
                // TODO : 익스플로러에서 input(type=file).value의 값을 초기화 하는 기능
                // var newInput = document.createElement('input');
                // newInput.setAttribute('type', 'file');
                // newInput.setAttribute('class', 'file');
                // newInput.setAttribute('name', 'img');
                // newInput.style.display = 'none';
                // var form = me.element.main.querySelector('.uploadForm')
                // var file = $(me.element.main).find('.file')
            } else {
                fileInput.value = "";
            }
            fileInput.click();
        })
        fileInput.addEventListener('change', function (e) {
            var inputData = fileInput.files;
            if (fileInput.value == "" || $('.file').val() == "") {
                return;
            } else {

                if (inputData !== undefined) {
                    var fd = new FormData();
                    var file = inputData[0];

                    fd.append('img', file);
                    me.sendAjax('/up', fd);
                } else {
                    me.ajaxformUpload(me);
                }

            }
        })
        // indent, outdent
        var indent = me.element.main.querySelector('.indent');
        var outdent = me.element.main.querySelector('.outdent');

        indent.addEventListener('click', function () {
            sel.removeAllRanges();
            sel.addRange(me.element.caret);
            document.execCommand('indent');
        })
        outdent.addEventListener('click', function () {
            sel.removeAllRanges();
            sel.addRange(me.element.caret);
            document.execCommand('outdent');
        })


    }
    Editor.prototype.ajaxformUpload = function (me) {

        $(me.element.main).find('form[name=uploadForm]').ajaxForm({
            dataType: "json",
            url: "/up",
            type: "POST",
            success: function (res) {
                me.addImage(res.imgUrl);
            },
            error: function (e) {
                console.log(e)
            }

        }).submit();
    }
    Editor.prototype.sendAjax = function (url, data) {

        var req = new XMLHttpRequest();
        req.open('POST', url)
        req.send(data);
        var me = this;

        req.onreadystatechange = function (e) {
            if (req.readyState === req.DONE) {
                if (req.responseText) {
                    var res = req.responseText;
                    var imgurl = JSON.parse(res).imgUrl;
                    me.addImage(imgurl);
                }
            }
        }
    }

    Editor.prototype.addImage = function (imgUrl) {
        var img = document.createElement('img');

        img.setAttribute('src', imgUrl);

        this.element.caret.deleteContents();
        this.element.caret.insertNode(img, this.element.caret);

        this.element.caret.collapse(false);

        var sel = document.getSelection();

        sel.removeAllRanges();
        sel.addRange(this.element.caret);
    }

    Editor.prototype.createMainContent = function () {
        var content = this.element.main.querySelector('.content');
        var tmp = document.createDocumentFragment();

        list.contentList.forEach(function (el) {
            var div = document.createElement('div');
            div.setAttribute('class', el);
            div.classList.add('contentDiv');
            if (el == 'edit') {
                div.setAttribute('contentEditable', 'true');
                div.innerHTML = '<p><br></p>';
            } else {
                div.style.display = "none";
            }
            tmp.appendChild(div);
        })
        content.appendChild(tmp);

    }
    Editor.prototype.addContentEvent = function () {
        var content = this.element.main.querySelector('.contentDiv');

        content.addEventListener('blur', function () {
            var sel = document.getSelection();

            sel.removeAllRanges();
            sel.addRange(this.element.caret);
        }.bind(this, Editor))
    }
    Editor.prototype.saveRange = function () {

        var sel = document.getSelection();
        var range = sel.getRangeAt(0);
        var clone = range.cloneRange();
        range = clone.cloneRange();
        this.element.caret = clone;
    }

    Editor.prototype.createMainFooter = function () {
        var footer = this.element.main.querySelector('.footer');
        var tmp = document.createDocumentFragment();



        list.contentList.forEach(function (el) {
            var button = document.createElement('button');
            button.setAttribute('class', el + "btn");
            button.textContent = el;
            button.classList.add('footerBtn');
            if (el === 'edit') {
                button.setAttribute('disabled', 'true');
            }
            tmp.appendChild(button);
        })
        footer.appendChild(tmp);

    }

    Editor.prototype.toEdit = function () {


        if (this.element.main.querySelector('.htmlbtn').disabled) {
            this.element.main.querySelector('.edit').innerHTML = this.element.main.querySelector('.html').innerText;
        } else {
            this.element.main.querySelector('.edit').innerHTML = this.element.main.querySelector('.preview').innerHTML;
        }
        this.setDecoButtonOpacity(1);
        this.setFooterButtonState('edit');
        this.element.main.querySelector('.edit').focus();
    }


    // html보기
    Editor.prototype.toHtml = function () {


        if (this.element.main.querySelector('.editbtn').disabled) {
            this.element.main.querySelector('.html').innerText = this.element.main.querySelector('.edit').innerHTML;
        } else {
            this.element.main.querySelector('.html').innerText = this.element.main.querySelector('.preview').innerHTML;
        }
        this.setDecoButtonOpacity(0.5);
        this.setFooterButtonState('html');
    }


    // preiew보기
    Editor.prototype.toPreview = function () {


        if (this.element.main.querySelector('.htmlbtn').disabled) {
            this.element.main.querySelector('.preview').innerHTML = this.element.main.querySelector('.html').innerText;
        } else {
            this.element.main.querySelector('.preview').innerHTML = this.element.main.querySelector('.edit').innerHTML;
        }
        this.setDecoButtonOpacity(0.5);
        this.setFooterButtonState('preview');
    }


    // footer button 클릭시  deco버튼의 투명도 조절
    Editor.prototype.setDecoButtonOpacity = function (val) {
        var link = this.element.main.getElementsByClassName('link');


        for (var i = 0; i < link.length; i++) {
            link[i].firstChild.style.opacity = val;
        }
    }


    // footer button state 설정
    Editor.prototype.setFooterButtonState = function (btnName) {
        var deco = this.element.main.querySelector('.deco');
        var decoChildLength = deco.childNodes.length;


        this.element.main.querySelector('.edit').style.display = "none";
        this.element.main.querySelector('.html').style.display = "none";
        this.element.main.querySelector('.preview').style.display = "none";


        this.element.main.querySelector('.editbtn').removeAttribute("disabled");
        this.element.main.querySelector('.htmlbtn').removeAttribute("disabled");
        this.element.main.querySelector('.previewbtn').removeAttribute("disabled");


        if (btnName == 'edit') {


            this.element.main.querySelector('.deco').style.pointerEvents = "auto";


            this.element.main.querySelector('.edit').style.display = "block";
            this.element.main.querySelector('.editbtn').disabled = true;


        } else if (btnName == 'html') {
            this.element.main.querySelector('.html').setAttribute('contentEditable', 'true');

            deco.style.pointerEvents = "none";
            for (var i = 0; i < decoChildLength; i++) {
                deco.childNodes[i].style.backgroundColor = "white";
            }


            this.element.main.querySelector('.html').style.display = "block";
            this.element.main.querySelector('.htmlbtn').disabled = true;


        } else if (btnName == 'preview') {


            deco.style.pointerEvents = "none";


            for (var i = 0; i < decoChildLength; i++) {
                deco.childNodes[i].style.backgroundColor = "white";
            }
            this.element.main.querySelector('.preview').style.display = "block";
            this.element.main.querySelector('.previewbtn').disabled = true;
        }


    }




    // footer 이벤트 설정
    Editor.prototype.addFooterEvent = function () {


        this.element.main.querySelector('.editbtn').addEventListener('click', this.toEdit.bind(this, Editor));
        this.element.main.querySelector('.htmlbtn').addEventListener('click', this.toHtml.bind(this, Editor));
        this.element.main.querySelector('.previewbtn').addEventListener('click', this.toPreview.bind(this, Editor));


    }
    Editor.prototype.createAll = function () {
        this.createTemplate();

        this.createHeader();

        this.createMain();
        this.createMainToolbar();
        this.createMainContent();
        this.createMainFooter();

        this.addToolbarEvent();
        this.addContentEvent();
        this.addFooterEvent();

    }


    global.Editor = Editor;

})(window);