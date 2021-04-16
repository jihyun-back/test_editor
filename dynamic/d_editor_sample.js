function Editor(node) {
    this.list = {
        tdID: ['header', 'content', 'footer'],
        viewList: ['edit', 'html', 'preview','newPage'],
        
        decoList: ['bold', 'Italic', 'underline', 'StrikeThrough']
    },

        this.imgUrl = {
            boldImgUrl: "https://img.icons8.com/metro/26/000000/bold.png",
            ItaricImgUrl: "https://img.icons8.com/metro/26/000000/italic.png",
            underlineImgUrl: "https://img.icons8.com/android/24/000000/underline.png",
            StrikeThroughImgUrl: "https://img.icons8.com/ios-filled/50/000000/strikethrough.png"
        },
        this.element = {
            root: document.getElementById(node),
            tmp: document.createDocumentFragment()
        }
}

// table template 만들기
Editor.prototype.tableTemplate = function () {
    let table = document.createElement('table');

    this.list.tdID.forEach(el => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('id', el);
        tr.appendChild(td);
        this.element.tmp.appendChild(tr);
    });

    table.appendChild(this.element.tmp);
    this.element.root.appendChild(table);
}

// header 태그생성 및 이벤트
Editor.prototype.header = function () {

    let headertd = document.getElementById('header');
    let decolength = this.list.decoList.length;


    if (headertd) {

        // td에 span,a,img 태그 생성
        for (let i = 0; i < decolength; i++) {
            let span = document.createElement('span');
            let a = document.createElement('a');
            let img = document.createElement('img');

            img.setAttribute('id', this.list.decoList[i]);
            a.setAttribute('class', 'link');
            a.appendChild(img);
            span.appendChild(a);
            this.element.tmp.appendChild(span);
        }
        headertd.appendChild(this.element.tmp);

        this.headerEvent(decolength);
    } else {
        console.log('화면로딩중');
    }
}

Editor.prototype.headerEvent = function (decolength) {
    let num = 0;
    let a = document.getElementsByClassName('link');
    let div = document.getElementsByClassName('contentDiv');
    let decoList = this.list.decoList;
    


    if (a) {

        // img 태그에 링크넣기
        for (let el in this.imgUrl) {
            a[num].firstChild.setAttribute('src', this.imgUrl[el]);
            num++;
        }

        // deco 버튼 클릭이벤트 달기

        for (let i = 0; i < decolength; i++) {
            a[i].addEventListener('click', function (e) {
                div[0].focus();
                document.execCommand(a[i].firstChild.id, true)
                if (document.queryCommandState(decoList[i])) {
                    a[i].parentElement.style.backgroundColor = "#ddd";
                } else {
                    a[i].parentElement.style.backgroundColor = "white";
                }

            })
        }

        //TODO : selection 부분에대한 cmmandstate활용하기
        if (document.getSelection) {
            let selObj = window.getSelection();
            let range = document.createRange();
            document.addEventListener('selectionchange', function (e) {
                for (let i = 0; i < decolength; i++) {
                    if (document.queryCommandState(decoList[i])) {
                        a[i].parentElement.style.backgroundColor = "#ddd";
                    } else {
                        a[i].parentElement.style.backgroundColor = "white";
                    }
                }

            })
        }
    } else {
        console.log('a링크 미존재');
    }
}

// content 태그생성 및 이벤트
Editor.prototype.content = function () {
    let contenttd = document.getElementById('content');

    if (contenttd) {
        for (let i = 0; i < 3; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', 'contentDiv');
            div.setAttribute('autofocus',true);
            div.setAttribute('id', this.list.viewList[i]);
            if (i === 0) {
                div.setAttribute('contentEditable', 'true');
            } else {
                div.style.display = "none";
            }
            this.element.tmp.appendChild(div);
        }
        contenttd.appendChild(this.element.tmp);
    } else {
        console.log('화면로딩중');
    }
}

// footer 태그생성 및 이벤트
Editor.prototype.footer = function () {

    let footertd = document.getElementById('footer');
    let btnLength = this.list.viewList.length;

    if (footertd) {
        footertd.setAttribute('class', 'buttons')
        for (let i = 0; i < btnLength; i++) {
            let button = document.createElement('button');
            button.setAttribute('id', `btn${i + 1}`);
            button.append(this.list.viewList[i]);
            if (i === 0) {
                button.setAttribute('disabled', 'true');
            }
            this.element.tmp.appendChild(button);
        }
        
        footertd.appendChild(this.element.tmp);
    } else {
        console.log('화면로딩중');
    }

    this.footerEvent();
}

// footer 이벤트

Editor.prototype.footerEvent = function () {

    let div = {
        editDiv: document.getElementById('edit'),
        htmlDiv: document.getElementById('html'),
        previewDiv: document.getElementById('preview')
    }

    let btn = {
        btn1: document.getElementById('btn1'),
        btn2: document.getElementById('btn2'),
        btn3: document.getElementById('btn3'),
        btn4: document.getElementById('btn4')
    }



    let newPage = function(){
        div.htmlDiv.innerText = `<p><br></p>`;
        toEdit();
        
        
        
    }
    // edit
    let toEdit = function () {
        div.editDiv.focus();
        div.editDiv.innerHTML = div.htmlDiv.innerText;
        decoOpacity(1);
        displayFooter(1);
    };

    //html
    let toHtml = function () {
        div.htmlDiv.focus();
        div.htmlDiv.innerText = div.editDiv.innerHTML;
        decoOpacity(0.5);
        displayFooter(2);
    };

    //preview
    let toPreview = function () {
        if (btn2.disabled) {
            div.previewDiv.innerHTML = div.htmlDiv.innerText;
        } else {
            div.previewDiv.innerHTML = div.editDiv.innerHTML;
        }
        decoOpacity(0.5);
        displayFooter(3);
    };



    // edit/html/preview 보기 style
    let displayFooter = function (btnNum) {
        if (btn1 && btn2 && btn3) {
            if (btnNum == 1) {
                header.style.pointerEvents = "auto";
                div.editDiv.style.display = "block";
                btn.btn1.disabled = true;
                div.htmlDiv.style.display = "none";
                btn.btn2.removeAttribute("disabled");
                div.previewDiv.style.display = "none";
                btn.btn3.removeAttribute("disabled");

            } else if (btnNum == 2) {

                header.style.pointerEvents = "none";

                div.editDiv.style.display = "none";
                btn.btn1.removeAttribute("disabled");
                div.htmlDiv.style.display = "block";
                div.htmlDiv.setAttribute('contentEditable', 'true');
                btn.btn2.disabled = true;
                div.previewDiv.style.display = "none";
                btn.btn3.removeAttribute("disabled");

            } else if (btnNum == 3) {
                header.style.pointerEvents = "none";
                header.style.backgroundColor = "white";
                div.editDiv.style.display = "none";
                btn.btn1.removeAttribute("disabled");
                div.htmlDiv.style.display = "none";
                btn.btn2.removeAttribute("disabled");
                div.previewDiv.style.display = "block";
                btn.btn3.disabled = true;
            }
        } else {
            console.log('버튼없음');
        }

    }

    // eidt/html/preview 클릭시 상단 데코 style
    let decoOpacity = function (val) {
        const link = document.getElementsByClassName('link');
        for (let i = 0; i < 4; i++) {
            link[i].firstChild.style.opacity = val;
        }
    }
    let unDeco = function () {
        const header = document.getElementById('header');
        if (btn.btn2.disabled || btn.btn3.disabled) {
            for (let i = 0; i < 4; i++) {
                header.childNodes[i].style.backgroundColor = "white";
            }
        } else {
            for (let i = 0; i < 4; i++) {
                header.childNodes[i].style.backgroundColor = "#eee";
            }
        }
    }


    btn1.addEventListener('click', function () { toEdit() });
    btn2.addEventListener('click', function () { toHtml(), unDeco() });
    btn3.addEventListener('click', function () { toPreview(), unDeco() });
    btn4.addEventListener('click', function() { newPage()});
    

}

Editor.prototype.createEditor = function () {
    this.tableTemplate();
    this.header();
    this.content();
    this.footer();
}


// Editor 생성자
const editor = new Editor('root');
editor.createEditor();

