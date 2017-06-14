/**
 * weIconBuilder v0.1
 * https://github.com/safe-dog/weIconBuilder
 * author: safe-dog
 */

var fs = require('fs');
var path = require('path');
var argv = process.argv;

if (argv.length !== 3 && argv.length !== 4) {
  console.log(argv.length, argv)
  console.log('* 使用方法：weIcon fontello-68bafb5c/ [output.wxss]');
  return console.log('- 第一个参数为解压的图标资源目录，第二个可选，为输出的wxss文件名');
}

var fontFolder = argv[2];
var outputWxss = argv[3];

var fontCss = path.resolve(fontFolder, 'css/fontello.css');
var fontTtf = path.resolve(fontFolder, 'font/fontello.ttf');

// 检测字体目录是否符合
if (!fs.existsSync(fontFolder) || !fs.existsSync(fontCss) || !fs.existsSync(fontTtf)) {
  return console.log('! 不符合的资源目录，请检查');
}

// 转换base64
var fontTtfBase64 = fs.readFileSync(fontTtf).toString('base64');
// 读取css资源
var fontCssContent = fs.readFileSync(fontCss).toString().split('\n');
// 解析css资源
var fontCssResult = '';

for (var i = 0; i < fontCssContent.length; i++) {
  var line = fontCssContent[i];
  if (line.indexOf('.icon-') === 0) {
    fontCssResult += line.split(' /*')[0].replace('.icon-', '.weIcon-');
  }
}

// 头部内容
var fontCssHeader = "\
/** [由weIconBuilder生成](https://github.com/safe-dog/weIconBuilder) **/\n\
@font-face {\
  font-family: 'weIcon';\
  src: url(data:font/truetype;charset=utf-8;base64," + fontTtfBase64 + ") format('truetype');\
  font-weight: normal;\
  font-style: normal;\
}\
.weIcon {\
  display: inline-block;\
  font: normal normal normal 14px/1 weIcon;\
  font-size: inherit;\
  text-rendering: auto;\
  -webkit-font-smoothing: antialiased;\
  -moz-osx-font-smoothing: grayscale;\
}";

// 生成wxss文件
var wxssContent = fontCssHeader + fontCssResult;
var wxssFileName = outputWxss || 'weIcon.wxss';

fs.writeFileSync(wxssFileName, wxssContent, 'utf-8');

console.log('+ 生成完毕！');
console.log('- ' + wxssFileName);