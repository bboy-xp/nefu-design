// const fs = require("fs");
// const path = require("path");

// let config = {
//   publicPath: './',
//   lintOnSave: false,

// };

// /**
//  * 如果是本地环境，就返回mock json文件
//  */
// switch (process.env.NODE_ENV) {
//   case 'development':
//     config['devServer'] = {
//       before(app) {
//         app.all("/mock/*.json", (req, res) => {
//           res.json(
//             JSON.parse(fs.readFileSync(path.join(__dirname, './', req.url), "utf8"))
//           );
//         });
//       }
//     };
//     break;
//   case 'debug':
//     /**
//      * 注意！！！如果需要启用debug环境，需要你在本地设置一份借贷宝用户登陆的公参（可用charles抓取，不影响单点登录），将根目录下
//      * http_config/commonData.ts文件中的数据更新
//      */
//     config['devServer'] = {
//       // 如果你的项目只对接一个服务器，可以直接用这种配置
//       proxy: 'http://127.0.0.1:8081'

//       // 如果你的项目对接多个服务器，可以用这种配置分开配置
//       // proxy: {
//       //   '/aaaa/*': {
//       //     target: 'http://100.73.55.34'
//       //   },
//       //   '/bbbb/*': {
//       //     // target: 'http://100.73.37.249'
//       //     target: 'http://127.0.0.1:3000'
//       //   }
//       // },
//     };
//     break;
// }

// module.exports = config;

// mock数据

//请求data文件下的goods.json等文件
const login = require("./mock/login.json");
const modifyInfo = require("./mock/modifyInfo.json");
const showInfo = require("./mock/showInfo.json");
const addEquipment = require("./mock/addEquipment.json");
const showDataByEid = require("./mock/showDataByEid.json");
const showEquData = require("./mock/showEquData.json");
const showEquCleanData = require("./mock/showEquCleanData.json");
const showAbnormalData = require("./mock/showAbnormalData.json");
const dealAbnormal = require("./mock/dealAbnormal.json");
const showAllInfo = require("./mock/showAllInfo.json");
const addEnterprise = require("./mock/addEnterprise.json");
const addRecord = require("./mock/addRecord.json");
const showRecord = require("./mock/showRecord.json");
const modifyRecord = require("./mock/modifyRecord.json");
const showEnvData = require("./mock/showEnvData.json")

module.exports = {
  // baseUrl: '/',//根路径
  outputDir: 'dist1', //构建输出路径
  assetsDir: 'assets', //静态资源输出目录（js,css,img,fonts）
  lintOnSave: false, //是否开启eslint保存检测，有效值：true || false || 'error'
  devServer: {
    open: false, //true 启动项目后自动打开本地网页 false 不会自动打开在线页面
    host: 'localhost', //本地开发主机名用localhost或者是127.0.0.0 真机测试用0.0.0.0
    port: 8080, //默认端口号8080 
    https: false, //true: https://localhost:8081启动 false :http://localhost:8081
    hotOnly: false, //热更新
    // proxy: { //配置跨域，解决跨域问题
    //   //配置跨域
    //   '/api': { //以"/api"开头的代理到下面的target属性的值中去
    //     target: 'http://localhost:5000/api/', // api服务器的地址
    //     ws: true, //询问是否跨域 true跨域 false 不跨域
    //     changOrigin: true,
    //     pathRewrite: { //路径重写 
    //       '^/api': '' //这个意思是以api开头的，定向到哪里，如果后面还有路径的话，会自动拼接上
    //     }
    //   }
    // },
    before(app) {
      //接口地址：http://localhost:8080/api/test
      app.post('/basic/login', (req, res) => {
        res.json(login);
      });
      app.post('/enterprise/modifyInfo', (req, res) => {
        res.json(modifyInfo);
      });
      app.post('/enterprise/showInfo', (req, res) => {
        res.json(showInfo);
      });
      app.post('/equipment/addEquipment', (req, res) => {
        res.json(addEquipment);
      });
      app.post('/equipmentFlow/showDataByEid', (req, res) => {
        res.json(showDataByEid);
      });
      app.post('/equipment/showEquData', (req, res) => {
        res.json(showEquData);
      });
      app.post('/equipmentFlow/showEquCleanData', (req, res) => {
        res.json(showEquCleanData);
      });
      app.post('/abnormal/dealAbnormal', (req, res) => {
        res.json(dealAbnormal);
      });
      app.post('/abnormal/showAbnormalData', (req, res) => {
        res.json(showAbnormalData);
      });
      app.get('/enterprise/showAllInfo', (req, res) => {
        res.json(showAllInfo);
      });
      app.post('/enterprise/addEnterprise', (req, res) => {
        res.json(addEnterprise);
      });
      app.post('/lawEnforcementRecord/addRecord', (req, res) => {
        res.json(addRecord);
      });
      app.post('/lawEnforcementRecord/showRecord', (req, res) => {
        res.json(showRecord);
      });
      app.post('/lawEnforcementRecord/modifyRecord', (req, res) => {
        res.json(modifyRecord);
      });
      app.get('/environmental/showEnvData', (req, res) => {
        res.json(showEnvData);
      });
    },
    
  }
}
