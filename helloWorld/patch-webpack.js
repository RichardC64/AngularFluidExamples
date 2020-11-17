// inspired from https://github.com/DanWahlin/FluidAngular, updated for Angular 11
const fs = require('fs');
// Angular 10
// const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
// Angular 11
const f11 ='node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js';
 
fs.readFile(f11, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let result = data.replace(/node: false/g, "node: { crypto: true, stream: true, assert: true }");
 
  fs.writeFile(f11, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});