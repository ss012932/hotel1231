const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/hotel1231/' : '/' // 將 <REPO_NAME> 替換為儲存庫名稱
})
