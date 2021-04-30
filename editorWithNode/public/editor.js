(function (global) {


    var list = {
        tdID: ['header', 'deco', 'content', 'footer'],
        viewList: ['edit', 'html', 'preview'],
        decoList: ['bold', 'Italic', 'underline', 'StrikeThrough']
    };


    var decoLength = list.decoList.length;
    var decoUrl = {
        boldImgUrl: "https://img.icons8.com/metro/26/000000/bold.png",
        ItalicImgUrl: "https://img.icons8.com/metro/26/000000/italic.png",
        underlineImgUrl: "https://img.icons8.com/android/24/000000/underline.png",
        StrikeThroughImgUrl: "https://img.icons8.com/ios-filled/50/000000/strikethrough.png"
    };


    //==== mathes, closest 호환
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1) {
                return null;
            }
        };
    }

    function Editor(node) {
        this.element = {
            root: document.getElementById(node)
        }
    }


    // table template 만들기
    Editor.prototype.createTableTemplate = function () {


        var table = document.createElement('table');
        var tmp = document.createDocumentFragment();
        list.tdID.forEach(function (el) {
            // list.tdID.forEach(el => {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.setAttribute('class', el);
            tr.appendChild(td);
            tmp.appendChild(tr);
        });


        table.appendChild(tmp);
        this.element.root.appendChild(table);


        this.element.table = table;
    }


    // header 태그생성
    Editor.prototype.createHeader = function () {
        var headertd = this.element.table.querySelector('.header');


        var a;
        var span;
        var img;
        var div;
        var form;
        var input;


        if (headertd) {
            // newPage버튼
            span = document.createElement('span');
            a = document.createElement('a');
            img = document.createElement('img');
            img.setAttribute('class', 'newPageBtn');
            img.setAttribute('src', "https://img.icons8.com/office/16/000000/new-by-copy--v1.png");
            a.setAttribute('class', 'headerBtn');
            a.appendChild(img);
            span.appendChild(a);


            headertd.appendChild(span);


            // imgupload버튼
            span = document.createElement('span');
            form = document.createElement('form');
            div = document.createElement('div');
            input = document.createElement('input');
            img = document.createElement('img');


            form.setAttribute('enctype', 'multipart/form-data');
            form.setAttribute('method', 'POST');
            form.setAttribute('class', 'uploadForm');
            form.setAttribute('name', 'uploadForm');
            form.setAttribute('action', './up');
            img.setAttribute('src', "https://img.icons8.com/ios/50/000000/image.png");
            div.appendChild(img);
            div.setAttribute('class', 'uploadBtn')


            input.setAttribute('type', 'file');
            input.setAttribute('class', 'file');
            input.setAttribute('name', 'img');
            input.style.display = 'none';
            form.appendChild(input);
            form.appendChild(div);

            span.appendChild(form);
            headertd.appendChild(span);

        } else {
            console.log('header화면 로딩중');
        }
    }



    // header event 설정
    Editor.prototype.addHeaderEvent = function () {


        var newPageBtn = this.element.table.querySelector('.newPageBtn');
        var uploadBtn = this.element.table.querySelector('.uploadBtn');
        var fileInput = this.element.table.querySelector('.file');
        var me = this;


        // newPage 버튼 이벤트
        newPageBtn.addEventListener('click', function () {


            this.toEdit();
            this.element.table.querySelector('.edit').innerHTML = "<p><br></p>"
        }.bind(this, Editor));



        // 이미지 upload 버튼 이벤트
        // div 클릭시 input(file) 클릭
        uploadBtn.addEventListener('click', function (e) {
            var agent = navigator.userAgent.toLowerCase();
       
            if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                // TODO : 익스플로러에서 input(type=file).value의 값을 초기화 하는 기능
                // var newInput = document.createElement('input');
                // newInput.setAttribute('type', 'file');
                // newInput.setAttribute('class', 'file');
                // newInput.setAttribute('name', 'img');
                // newInput.style.display = 'none';
                // var form = me.element.table.querySelector('.uploadForm')
                // var file = $(me.element.table).find('.file')
            } else {
                fileInput.value = "";
            }
            
            me.element.table.querySelector('.file').click();
        })
        // input(file) change 이벤트 > ajax > 이미지삽입
        me.element.table.querySelector('.file').addEventListener('change', function (e) {
            var inputData = fileInput.files;
            if (fileInput.value == "" || $('.file').val()=="") {
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
        
        $(me.element.table).find('form[name=uploadForm]').ajaxForm({
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
  




    // deco 태그생성
    Editor.prototype.createDeco = function () {


        var decotd = this.element.table.querySelector('.deco');
        var tmp = document.createDocumentFragment();


        if (decotd) {


            for (var i = 0; i < decoLength; i++) {
                var span = document.createElement('span');
                var a = document.createElement('a');
                var img = document.createElement('img');


                img.setAttribute('class', list.decoList[i]);
                img.setAttribute('src', decoUrl[list.decoList[i] + 'ImgUrl']);
                // img.setAttribute('src', decoUrl[`${list.decoList[i]}ImgUrl`]);
                a.setAttribute('class', 'link');
                a.appendChild(img);
                span.appendChild(a);
                tmp.appendChild(span);
            }
            decotd.appendChild(tmp);


        } else {
            console.log('deco화면로딩중');
        }
    }


    // DecoButton에 exeCommand 추가
    Editor.prototype.setDecoButtonState = function (aLink, decoList) {
        aLink.addEventListener('click', function () {
            this.element.table.querySelector('.edit').focus();
            document.execCommand(decoList)
            setDecoButtonColor(aLink.parentElement, decoList);
            // setDecoButtonColor(aLink.closest('span'), decoList);


        }.bind(this, Editor))
    }





    // 현재 DeoButton state 감지하기
    Editor.prototype.getDecoButtonState = function (decoList) {

        document.addEventListener('selectionchange', function (e) {

            if (e.target.activeElement.parentElement.className === 'content') {

                var decoChild = e.target.activeElement.closest('.root').querySelector('.deco').childNodes;

                for (var i = 0; i < decoLength; i++) {
                    setDecoButtonColor(decoChild[i], decoList[i]);
                }
            }
        })
    }


    // DecoButton state에 따른 Color 변경
    function setDecoButtonColor(button, commandState) {
        if (document.queryCommandState(commandState)) {
            button.style.backgroundColor = "#eee";
        } else {
            button.style.backgroundColor = "white";
        }
    }


    // deco 이벤트 설정
    Editor.prototype.addDecoEvent = function () {
        var aLink = this.element.table.querySelectorAll('.link');


        for (var i = 0; i < decoLength; i++) {
            this.setDecoButtonState(aLink[i], list.decoList[i]);
        }


        this.getDecoButtonState(list.decoList);
    }



    // content 태그 생성
    Editor.prototype.createContent = function () {
        var contenttd = this.element.table.querySelector('.content');
        var tmp = document.createDocumentFragment();


        if (contenttd) {
            for (var i = 0; i < list.viewList.length; i++) {
                var div = document.createElement('div');
                div.setAttribute('class', list.viewList[i]);
                div.className += ' contentDiv';
                if (i === 0) {
                    div.setAttribute('contentEditable', 'true');
                    div.innerHTML = '<p><br></p>';
                } else {
                    div.style.display = "none";
                }
                tmp.appendChild(div);
            }
            contenttd.appendChild(tmp);
        } else {
            console.log('content화면로딩중');
        }
    }

    Editor.prototype.addContentEvent = function () {
        var contentDiv = this.element.table.querySelector('.contentDiv');

        contentDiv.addEventListener('click', this.saveRange.bind(this, Editor));
    }

    Editor.prototype.saveRange = function () {

        var sel = document.getSelection();
        var range = sel.getRangeAt(0);

        var clone = range.cloneRange();
        this.element.caret = clone;

    }

    // footer 태그생성
    Editor.prototype.createFooter = function () {
        var footertd = this.element.table.querySelector('.footer');
        var tmp = document.createDocumentFragment();



        if (footertd) {
            footertd.setAttribute('class', 'buttons')
            for (var i = 0; i < list.viewList.length; i++) {
                var button = document.createElement('button');
                button.setAttribute('class', 'btn' + (i + 1));
                // button.setAttribute('class', `btn${i + 1}`);
                button.textContent = list.viewList[i];
                // button.appendChild(list.viewList[i]);

                if (i === 0) { // edit 버튼
                    button.setAttribute('disabled', 'true');
                }
                tmp.appendChild(button);
            }


            footertd.appendChild(tmp);
        } else {
            console.log('화면로딩중');
        }


    }


    // edit보기
    Editor.prototype.toEdit = function () {


        if (this.element.table.querySelector('.btn2').disabled) {
            this.element.table.querySelector('.edit').innerHTML = this.element.table.querySelector('.html').innerText;
        } else {
            this.element.table.querySelector('.edit').innerHTML = this.element.table.querySelector('.preview').innerHTML;
        }
        this.setDecoButtonOpacity(1);
        this.setFooterButtonState('edit');
        this.element.table.querySelector('.edit').focus();
    }


    // html보기
    Editor.prototype.toHtml = function () {


        if (this.element.table.querySelector('.btn1').disabled) {
            this.element.table.querySelector('.html').innerText = this.element.table.querySelector('.edit').innerHTML;
        } else {
            this.element.table.querySelector('.html').innerText = this.element.table.querySelector('.preview').innerHTML;
        }
        this.setDecoButtonOpacity(0.5);
        this.setFooterButtonState('html');
    }


    // preiew보기
    Editor.prototype.toPreview = function () {


        if (this.element.table.querySelector('.btn2').disabled) {
            this.element.table.querySelector('.preview').innerHTML = this.element.table.querySelector('.html').innerText;
        } else {
            this.element.table.querySelector('.preview').innerHTML = this.element.table.querySelector('.edit').innerHTML;
        }
        this.setDecoButtonOpacity(0.5);
        this.setFooterButtonState('preview');
    }


    // footer button 클릭시  deco버튼의 투명도 조절
    Editor.prototype.setDecoButtonOpacity = function (val) {
        var link = this.element.table.getElementsByClassName('link');


        for (var i = 0; i < link.length; i++) {
            link[i].firstChild.style.opacity = val;
        }
    }


    // footer button state 설정
    Editor.prototype.setFooterButtonState = function (btnName) {
        var deco = this.element.table.querySelector('.deco');
        var decoChildLength = deco.childNodes.length;


        this.element.table.querySelector('.edit').style.display = "none";
        this.element.table.querySelector('.html').style.display = "none";
        this.element.table.querySelector('.preview').style.display = "none";


        this.element.table.querySelector('.btn1').removeAttribute("disabled");
        this.element.table.querySelector('.btn2').removeAttribute("disabled");
        this.element.table.querySelector('.btn3').removeAttribute("disabled");


        if (btnName == 'edit') {


            this.element.table.querySelector('.deco').style.pointerEvents = "auto";


            this.element.table.querySelector('.edit').style.display = "block";
            this.element.table.querySelector('.btn1').disabled = true;


        } else if (btnName == 'html') {
            this.element.table.querySelector('.html').setAttribute('contentEditable', 'true');


            deco.style.pointerEvents = "none";
            for (var i = 0; i < decoChildLength; i++) {
                deco.childNodes[i].style.backgroundColor = "white";
            }


            this.element.table.querySelector('.html').style.display = "block";
            this.element.table.querySelector('.btn2').disabled = true;


        } else if (btnName == 'preview') {


            deco.style.pointerEvents = "none";


            for (var i = 0; i < decoChildLength; i++) {
                deco.childNodes[i].style.backgroundColor = "white";
            }
            this.element.table.querySelector('.preview').style.display = "block";
            this.element.table.querySelector('.btn3').disabled = true;
        }


    }




    // footer 이벤트 설정
    Editor.prototype.addFooterEvent = function () {


        this.element.table.querySelector('.btn1').addEventListener('click', this.toEdit.bind(this, Editor));
        this.element.table.querySelector('.btn2').addEventListener('click', this.toHtml.bind(this, Editor));
        this.element.table.querySelector('.btn3').addEventListener('click', this.toPreview.bind(this, Editor));


    }


    // editor구성하기
    Editor.prototype.createEditor = function () {
        this.createTableTemplate();
        this.createHeader();
        this.createDeco();
        this.createContent();
        this.createFooter();


        this.addHeaderEvent();
        this.addDecoEvent();
        this.addContentEvent();
        this.addFooterEvent();
    }

    global.Editor = Editor;

})(window);





