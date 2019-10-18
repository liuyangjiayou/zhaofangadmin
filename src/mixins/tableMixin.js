let bable_fun = {
    methods : {
        /* 所有表单删除的方法 */
        tabelConfirm(opts){
            this.$confirm(opts.msg ? opts.msg : '确定要这么做吗', opts.title ? opts.title : '提示', {
                confirmButtonText: opts.subText ? opts.subText : '确定',
                cancelButtonText: opts.closeText ? opts.closeText : '取消',
                type: opts.type ? opts.type : 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message:  opts.msg ? opts.msg : '成功!'
                });
                opts.then ? opts.then() : null;
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消' + opts.msg ? opts.msg : ''
                });    
                opts.catch ? opts.catch() : null;      
            });
        },
    }
}
let form_fun = {
    methods : {
        /* 所有form数据初始化的方法 */
        minix_init_formData(formData){
          
        }
    }
}

module.exports = {
    bable_fun,
}