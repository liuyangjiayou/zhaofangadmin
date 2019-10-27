
module.exports = {
    devServer: {
        proxy: {
            // '/api': {
            //     target: 'https://newhr.t.ok.wang',
            //     changeOrigin: true
            // },
            '/api' : {
                target: 'http://localhost:4000',
                changeOrigin: true
            }
        }
    }
}