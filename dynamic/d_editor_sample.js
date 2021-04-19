function Editor(node) {
    this.list = {
        tdID: ['header', 'deco', 'content', 'footer'],
        viewList: ['edit', 'html', 'preview'],
        headerList: ['newPage'],
        decoList: ['bold', 'Italic', 'underline', 'StrikeThrough']
    },

        this.headerUrl = {
            newPageImgUrl: "https://img.icons8.com/office/16/000000/new-by-copy--v1.png"
        },

        this.decoUrl = {
            boldImgUrl: "https://img.icons8.com/metro/26/000000/bold.png",
            ItalicImgUrl: "https://img.icons8.com/metro/26/000000/italic.png",
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
        td.setAttribute('class', el);
        tr.appendChild(td);
        this.element.tmp.appendChild(tr);
    });

    table.appendChild(this.element.tmp);
    this.element.root.appendChild(table);
    this.element.table = table;
}

// header 태그생성
Editor.prototype.header = function () {
    let headertd = this.element.table.querySelector('.header');

    if (headertd) {
        for (let i = 0; i < this.list.headerList.length; i++) {
            let span = document.createElement('span');
            let a = document.createElement('a');
            let img = document.createElement('img');

            img.setAttribute('class', this.list.headerList[i]);
            img.setAttribute('src', this.headerUrl[`${this.list.headerList[i]}ImgUrl`]);
            a.setAttribute('class', 'headerBtn');

            a.appendChild(img);
            span.appendChild(a);
            this.element.tmp.appendChild(span);
        }
        headertd.appendChild(this.element.tmp);
    } else {
        console.log('header화면 로딩중');
    }
}

// header 버튼 이벤트
Editor.prototype.headerEvent = function () {

    let a = this.element.table.querySelector('.headerBtn');
    a.addEventListener('click', function () {
        for (let i of this.element.table.querySelectorAll('.contentDiv')) {
            i.textContent = '';
        }
        this.element.table.querySelector('.edit').focus();
        this.toEdit();
    }.bind(this, Editor));
}

// deco 태그생성
Editor.prototype.deco = function () {

    let decotd = this.element.table.querySelector('.deco');
    let decolength = this.list.decoList.length;


    if (decotd) {

        // td에 span,a,img 태그 생성
        for (let i = 0; i < decolength; i++) {
            let span = document.createElement('span');
            let a = document.createElement('a');
            let img = document.createElement('img');

            img.setAttribute('class', this.list.decoList[i]);
            img.setAttribute('src', this.decoUrl[`${this.list.decoList[i]}ImgUrl`]);
            a.setAttribute('class', 'link');
            a.appendChild(img);
            span.appendChild(a);
            this.element.tmp.appendChild(span);
        }
        decotd.appendChild(this.element.tmp);

    } else {
        console.log('deco화면로딩중');
    }
}

// deco 버튼 이벤트
Editor.prototype.decoBtn = function (a, decoList) {
    a.addEventListener('click', function () {
        this.element.table.querySelector('.edit').focus();
        document.execCommand(a.firstChild.className)
        if (document.queryCommandState(decoList)) {
            a.parentElement.style.backgroundColor = "#eee";
        } else {
            a.parentElement.style.backgroundColor = "white";
        }
    }.bind(this, Editor))
}
Editor.prototype.selectionDeco = function (a, decoList) {


    document.addEventListener('selectionchange', function (e) {
        if (e.target.activeElement.parentElement.className==='content') {
            
            let aa = e.target.activeElement.closest('.root').querySelector('.deco').childNodes;

            for (let i = 0; i < decoList.length; i++) {
                if (document.queryCommandState(decoList[i])) {
                    aa[i].style.backgroundColor = "#eee";
                } else {
                    aa[i].style.backgroundColor = "white";
                }
            }
        } else {
            console.log('현재 선택된 div가 contentDiv가 아닙니다')
        }
    })

}

Editor.prototype.decoEvent = function () {
    let a = this.element.table.querySelectorAll('.link');

    for (let i = 0; i < this.list.decoList.length; i++) {
        this.decoBtn(a[i], this.list.decoList[i]);
    }

    if (document.getSelection) {
        this.selectionDeco(a, this.list.decoList);
    }
}


// content 태그 생성
Editor.prototype.content = function () {
    let contenttd = this.element.table.querySelector('.content');

    if (contenttd) {
        for (let i = 0; i < 3; i++) {
            let div = document.createElement('div');
            div.setAttribute('class', this.list.viewList[i]);
            div.classList.add('contentDiv');
            if (i === 0) {
                div.setAttribute('contentEditable', 'true');
                div.innerHTML = '';
                div.innerHTML = '<p><br><p>';
            } else {
                div.style.display = "none";
            }
            this.element.tmp.appendChild(div);
        }
        contenttd.appendChild(this.element.tmp);
    } else {
        console.log('footer화면로딩중');
    }
}

// footer 태그생성
Editor.prototype.footer = function () {
    let footertd = this.element.table.querySelector('.footer');
    let btnLength = this.list.viewList.length;

    if (footertd) {
        footertd.setAttribute('class', 'buttons')
        for (let i = 0; i < btnLength; i++) {
            let button = document.createElement('button');
            button.setAttribute('class', `btn${i + 1}`);
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

}

// footer 이벤트
Editor.prototype.toEdit = function () {
    this.element.table.querySelector('.edit').focus();
    if (this.element.table.querySelector('.btn2').disabled) {
        this.element.table.querySelector('.edit').innerHTML = this.element.table.querySelector('.html').innerText;
    } else {
        this.element.table.querySelector('.edit').innerHTML = this.element.table.querySelector('.preview').innerHTML;
    }
    this.decoOpacity(1);
    this.displayFooter(1);
}
Editor.prototype.toHtml = function () {
    this.element.table.querySelector('.html').focus();
    if (this.element.table.querySelector('.btn1').disabled) {
        this.element.table.querySelector('.html').innerText = this.element.table.querySelector('.edit').innerHTML;
    } else {
        this.element.table.querySelector('.html').innerText = this.element.table.querySelector('.preview').innerHTML;
    }
    this.decoOpacity(0.5);
    this.displayFooter(2);
}
Editor.prototype.toPreview = function () {
    this.element.table.querySelector('.preview').focus();
    if (this.element.table.querySelector('.btn2').disabled) {
        this.element.table.querySelector('.preview').innerHTML = this.element.table.querySelector('.html').innerText;
    } else {
        this.element.table.querySelector('.preview').innerHTML = this.element.table.querySelector('.edit').innerHTML;
    }
    this.decoOpacity(0.5);
    this.displayFooter(3);
}
Editor.prototype.displayFooter = function (btnNum) {
    const deco = this.element.table.querySelector('.deco');
    if (btnNum == 1) {

        this.element.table.querySelector('.deco').style.pointerEvents = "auto";

        this.element.table.querySelector('.edit').style.display = "block";
        this.element.table.querySelector('.html').style.display = "none";
        this.element.table.querySelector('.preview').style.display = "none";
        this.element.table.querySelector('.btn1').disabled = true;
        this.element.table.querySelector('.btn2').removeAttribute("disabled");
        this.element.table.querySelector('.btn3').removeAttribute("disabled");

    } else if (btnNum == 2) {

        deco.style.pointerEvents = "none";
        for (let i = 0; i < 4; i++) {
            deco.childNodes[i].style.backgroundColor = "white";
        }
        this.element.table.querySelector('.edit').style.display = "none";
        this.element.table.querySelector('.html').style.display = "block";
        this.element.table.querySelector('.html').setAttribute('contentEditable', 'true');
        this.element.table.querySelector('.preview').style.display = "none";
        this.element.table.querySelector('.btn1').removeAttribute("disabled");
        this.element.table.querySelector('.btn2').disabled = true;
        this.element.table.querySelector('.btn3').removeAttribute("disabled");

    } else if (btnNum == 3) {
        deco.style.pointerEvents = "none";
        for (let i = 0; i < 4; i++) {
            deco.childNodes[i].style.backgroundColor = "white";
        }
        this.element.table.querySelector('.edit').style.display = "none";
        this.element.table.querySelector('.html').style.display = "none";
        this.element.table.querySelector('.preview').style.display = "block";
        this.element.table.querySelector('.btn1').removeAttribute("disabled");
        this.element.table.querySelector('.btn2').removeAttribute("disabled");
        this.element.table.querySelector('.btn3').disabled = true;
    }

}
Editor.prototype.decoOpacity = function (val) {
    const link = this.element.table.getElementsByClassName('link');

    for (let i = 0; i < 4; i++) {
        link[i].firstChild.style.opacity = val;
    }
}
Editor.prototype.unDeco = function () {

    if (this.element.table.querySelector('.btn2').disabled || this.element.table.querySelector('.btn3').disabled) {
        for (let i = 0; i < 4; i++) {
            this.element.table.querySelector('.deco').childNodes[i].style.backgroundColor = "white";
        }
    } else {
        for (let i = 0; i < 4; i++) {
            this.element.table.querySelector('.deco').childNodes[i].style.backgroundColor = "#eee";
        }
    }
}

Editor.prototype.footerEvent = function () {

    this.element.table.querySelector('.btn1').addEventListener('click', this.toEdit.bind(this, Editor));
    this.element.table.querySelector('.btn2').addEventListener('click', this.toHtml.bind(this, Editor));
    this.element.table.querySelector('.btn3').addEventListener('click', this.toPreview.bind(this, Editor));

}

Editor.prototype.createEditor = function () {
    this.tableTemplate();
    this.header();
    this.deco();
    this.content();
    this.footer();

    this.headerEvent();
    this.decoEvent();
    this.footerEvent();
}


// Editor 생성자
const editor = new Editor('div1');
const editor2 = new Editor('div2');

editor.createEditor();
editor2.createEditor();

