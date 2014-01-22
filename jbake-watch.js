var
  rootDir = process.cwd(),
  watch = require("watch"),
  spawn = require("child_process").spawn;
  
console.log("started from " + rootDir);

var jbake = spawn("jbake");
jbake.stdout.pipe(process.stdout);