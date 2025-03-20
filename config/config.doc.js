/*
 * @Author: zhanghan
 * @Date: 2022-11-28 09:13:53
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 13:33:12
 * @Descripttion: 文档环境配置
 */

const path = require('path')

module.exports = {
  outputDir: './docs',
  publicPath: './',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'doc/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置
  chainWebpack: (config) => {
    // set worker-loader
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end()

    // 解决：worker 热更新问题
    config.module.rule('js').exclude.add(/\.worker\.js$/)

    // packages 加入编译
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')

    // 别名配置
    config.resolve.alias
      .set('@', path.resolve(__dirname, '../doc'))
      .set('@packages', path.resolve(__dirname, '../packages'))
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          // 设置 Sass 的严格模式，这有助于减少一些警告
          charset: false,
          outputStyle: 'expanded'
        },
        additionalData: `
          @use "sass:color";
          @use "@/style/mixins" as mix;
          @use "@/style/vars" as var;
          @use "@/style/md-colors" as colors;
        `
      }
    }
  }
}
