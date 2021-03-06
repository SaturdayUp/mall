//因为后期需要反复的利用路径去加载图片等资源，所以这里给一些文件夹其一些别名
//当使用图片资源时，只要~即可，如果在js代码中需要一些组件，只需要@即可
const path=require('path')
module.exports={
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target:'http://localhost:8080'
      }
    }
  },
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'views':'@/views'
      }
    }
  }
}