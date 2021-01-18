const { 
  override, 
  fixBabelImports, 
  addLessLoader,
  disableChunk,
  addWebpackPlugin,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackResolve,
  addWebpackExternals
} = require('customize-cra');
const path = require("path");
const modifyVars = require('./antdTheme');

const rewiredMap = () => config => {
    console.log("mode:" + config.mode)
    console.log("precess-env:" + process.env.NODE_ENV)
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
    return config
};

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      // 改变antd的主题色调; 以下健和值一样，可以简化为只写键（即modifyVars）
      modifyVars: modifyVars
    }),

    // 避免yarn build时产生map文件
    rewiredMap(),
    // 支持装饰器
    addDecoratorsLegacy(),
    disableChunk(),
    // disable eslint in webpack
    // disableEsLint(),
    addWebpackResolve({
      extensions:[".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@axios": path.resolve(__dirname, "src/axios"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@com": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
      }
    }),
    // 百度地图通过index.html 的js引入，需要通过这种方式组件化
    // addWebpackExternals({
    //   BMapGL: 'BMapGL'
    // })
);