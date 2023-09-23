const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/gonzapf27.github.io/' : '/',
  transpileDependencies: true
})
