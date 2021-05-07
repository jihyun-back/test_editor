const express = require('express')
const fs = require('fs');
const app = express()
const port = 3030

// 3000번 포트로 서버 오픈
app.listen(port, ()=> {

})


// public 경로를 static으로 지정
app.use('/public',express.static(__dirname + '/public'));

// '/' get요청이 있을 시 editor.html을 읽음
app.get('/', (req, res) => {
    
    fs.readFile('./public/index.html',(err,data) => {
        if(err) {
            res.send('에러')
        } else {
            res.write(data)
            res.end()
        }
    })

})
