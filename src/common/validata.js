
export default { 
	mobilePhone:[{
        required: true,
        message: "手机号不能为空"
     },{
       validator: validatePhone,
       trigger: "blur",
       message: "请输入正确的证件号"
     }]
}