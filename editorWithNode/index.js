
//node.js 기본 내장 모듈
const fs = require('fs')

//express 모듈 사용
const express = require('express')


const app = express()
const port = 3000

//multer 모듈 사용
const multer = require('multer')
const upload = multer({dest: './upload/', limits: {fileSize : 5 * 1024 * 1024}}).single('img');


// 3000번 포트로 서버 오픈
app.listen(port, ()=> {

})

// '/up' post 요청이 있을 시 req의 정보를 받아 imgurl을 만들어서 res에 담아보냄
app.post('/up', (req,res) => {
    var agent = req.header('User-Agent')
    upload(req, res, (err) => {
        if (err) {
          return res.json({ succes: false, err });
        }
        
        if(!req.file){
            res.send({success : false})
            return 
        }
        const imgUrl= `http://localhost:3000/upload/${req.file.filename}`
        
        if(agent.toLowerCase().match(/chrome/)){
            res.json({success : true,  'imgUrl':imgUrl})
        } else {
            res.setHeader("Content-Type", "text/plain")
            res.json({success : true,  'imgUrl':imgUrl})
        }
      });
});


app.use('/upload',express.static(__dirname + '/upload'))

// public 경로를 static으로 지정
app.use('/public',express.static(__dirname + '/public'));

// '/' get요청이 있을 시 editor.html을 읽음
app.get('/', (req, res) => {
    
    fs.readFile('./public/editor.html',(err,data) => {
        if(err) {
            res.send('에러')
        } else {
            res.write(data)
            res.end()
        }
    })

})

