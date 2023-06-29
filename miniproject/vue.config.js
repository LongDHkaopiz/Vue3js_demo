const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // customElement: false
  devServer: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org/v2/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  }
})
