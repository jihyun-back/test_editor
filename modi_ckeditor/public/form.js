(function (global) {


    var list = {
        mainDivList: ['toolbar', 'content', 'footer'],
        contentList: ['edit', 'html', 'preview'],
        toolbarList: ['heading', 'bold', 'italic', 'underline', 'strikeThrough', 'newPage', 'imageUpload'],
        headerDivText: ['Classic', 'Balloon', 'Balloon Block', 'Inline', 'Document', 'Pagination']
    };


    var toolbarImgUrl = {
        headingImgUrl: "https://img.icons8.com/windows/24/000000/expand-arrow--v1.png",
        boldImgUrl: "https://img.icons8.com/metro/26/000000/bold.png",
        italicImgUrl: "https://img.icons8.com/metro/26/000000/italic.png",
        underlineImgUrl: "https://img.icons8.com/android/24/000000/underline.png",
        strikeThroughImgUrl: "https://img.icons8.com/ios-filled/50/000000/strikethrough.png",

        newPageImgUrl: "https://img.icons8.com/office/16/000000/new-by-copy--v1.png",
        imageUploadImgUrl: "https://img.icons8.com/ios/50/000000/image.png"

        

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
            var button = document.createElement('button');
            div.setAttribute('class', el);
            div.style.backgroundImage = "url(" + toolbarImgUrl[el + 'ImgUrl'] + ")";
            div.classList.add('toolbarDiv');

            tmp.appendChild(div);

            if (el == 'heading' || el == 'strikeThrough') {
                var span = document.createElement('span');
                span.setAttribute('class', 'seperate');
                div.after(span);
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
            button.style.backgroundColor = "#eee";
        } else {
            button.style.backgroundColor = "white";
        }
    }
    Editor.prototype.addToolbarEvent = function () {
        var me = this;

        // heading
        // deco
        var deco = me.element.main.querySelectorAll('.deco');
        deco.forEach(function (el) {
            el.addEventListener('click', function () {
                var decoName = el.className.split(' ')[0];
                console.log(el.className.split(' ')[0])
                document.execCommand(decoName);
                setDecoButtonColor(el, decoName);
            })
        })
        // newpage
        var newPage = me.element.main.querySelector('.newPage');
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

    Editor.prototype.createMainContent = function() {
        var content = this.element.main.querySelector('.content');
        var tmp = document.createDocumentFragment();

        list.contentList.forEach(function(el){
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
        var content = this.element.main.querySelector('.content');

        content.addEventListener('click', this.saveRange.bind(this, Editor));
    }
    Editor.prototype.saveRange = function () {

        var sel = document.getSelection();
        var range = sel.getRangeAt(0);

        var clone = range.cloneRange();
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