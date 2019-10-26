var path = require("path");
var fs = require("fs");
var express =require("express");
var app=express();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var url = require('url');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let {readFile} = require('./server')
//设置跨域访问
app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    // next();
});
let result = {
    code : 0,
    msg : "",
    data : "",
}
function changeResult(data){
    result.code = data.code;
    result.msg = data.msg;
    result.data = data.data ? data.data : '';
    return result
}
/* 用户登录 */
app.post('/api/login',function(req,res){
    readFile('./data.json').then(data=>{
        data = JSON.parse(data);
        if(!data.user.some(item => item.username == req.body.username)){
            console.log(!data.user.some(item => item.username == req.body.username));
            res.send(changeResult({
                code : 0,
                msg : '没有该用户',
            }));
            return false;
        }else{
            if(!data.user.some(item => item.password == req.body.password)){
                res.send(changeResult({
                    code : 0,
                    msg : '密码错误',
                }));
                return false;
            };
            res.send(changeResult({
                code : 1,
                msg : "登录成功",
                data : {
                    token : 'tokenliuyang'
                }
            }));
        }
    });
});
/* 获取部门结构 */
app.get('/api/department',function(req,res){
    readFile('./data.json').then(data=>{
        data = JSON.parse(data);

    });
});




//拦截请求
app.post("/api/uploader",function (req,res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../uploader");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        var filename = files.aaa.name
        var nameArray = filename.split('.');
        var type = files.aaa.type.split('/')[1];
        console.log(type);
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.aaa.path, newPath);  //重命名
        res.send({data:"/upload/"+avatarName})
    })
});
app.listen("4000",function () {
    console.log("服务启动111")
});