let fs = require('fs');
let path = require('path');
let dirname = path.resolve();
['mkdir','rmdir','readdir','readFile','copyFile','unlink'].forEach(item=>{
    exports[item] = function(pathname,copypath = ''){
        pathname = path.resolve(dirname,pathname);
        copypath = path.resolve(dirname,copypath);
        return new Promise((resolve,reject) => {
            let agms = [(err,result)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            item === 'readFile' ? agms.unshift('utf8') : null;
            item === 'copyFile' ? agms.unshift(copypath) : null;
            fs[item](pathname,...agms);
        })
    }
});
['writeFile','appendFile'].forEach(item=>{
    exports[item] = function(pathname,content){
        pathname = path.resolve(dirname,pathname);
        if(typeof content !== 'string'){
            content  = JSON.stringify(content);
        }
        return new Promise((resolve,reject) => {
            fs[item](pathname,content,'utf8',(err,result)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        })
    }
});