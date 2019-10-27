var path = require("path");
var fs = require("fs");
var express =require("express");
var app=express();
var bodyParser = require('body-parser');
// var formidable = require('formidable');
var url = require('url');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let {readFile,writeFile} = require('./server.js')
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* 用户登录 */
app.post('/api/login',function(req,res){
    readFile('./dataFile/logInData/logIn.json').then(data=>{
        data = JSON.parse(data);
        if(!data.some(item => item.username == req.body.username)){
            res.send({
                code : 0,
                msg : '该账号不存在'
            })
        }else{
            if(!data.some(item => item.password == req.body.password)){
                res.send({
                    code : 0,
                    msg : '密码错误'
                })
            }else{
                data.find(item => {
                    if(item.username == req.body.username){
                        item.token = item.username
                        writeFile('./dataFile/logInData/logIn.json',data);
                        readFile('./dataFile/logInData/roles.json').then(data => {
                            let result = {
                                code : 1,
                                msg : "登陆成功",
                                data : "",
                                token : item.username,
                                roles : JSON.parse(data)
                            }
                            res.send(result)
                            return true;
                        });
                    }
                });
            }
        }
    });
});
/* 获取合并记录列表 */
app.post('/api/real/mergeRecordList',function(req,res){
    readFile('./dataFile/realData/real_mergeRecord.json').then(data=>{
        data = JSON.parse(data);
        res.send({
            code : 1,
            msg : '',
            data,
        })
    })
})





/* 获取部门结构 */
app.get('/api/department',function(req,res){
    readFile('./data.json').then(data=>{
        data = JSON.parse(data);

    });
});




//拦截请求
// app.post("/api/uploader",function (req,res) {
//     var form = new formidable.IncomingForm();
//     form.encoding = 'utf-8';
//     form.uploadDir = path.join(__dirname + "/../uploader");
//     form.keepExtensions = true;//保留后缀
//     form.maxFieldsSize = 2 * 1024 * 1024;
//     //处理图片
//     form.parse(req, function (err, fields, files){
//         var filename = files.aaa.name
//         var nameArray = filename.split('.');
//         var type = files.aaa.type.split('/')[1];
//         console.log(type);
//         var name = '';
//         for (var i = 0; i < nameArray.length - 1; i++) {
//             name = name + nameArray[i];
//         }
//         var date = new Date();
//         var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
//         var avatarName = name + time + '.' + type;
//         var newPath = form.uploadDir + "/" + avatarName;
//         fs.renameSync(files.aaa.path, newPath);  //重命名
//         res.send({data:"/upload/"+avatarName})
//     })
// });
app.listen("4000",function () {
    console.log("服务启动111")
});