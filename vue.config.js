
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://newhr.t.ok.wang',
                changeOrigin: true
            }
        }
    }
}