var
  rootDir = process.cwd(),
  watch = require("watch"),
  spawn = require("child_process").spawn;
  
console.log("started from " + rootDir);

var jbake = spawn("jbake");
jbake.stdout.pipe(process.stdout);
jbake.on("close", function (code) {
  if (code !== 0) {
    console.err("There were errors. jbake-watch will shut down.");
    return;
  }
  
  jbake = spawn("jbake", ["-s"]);
  jbake.stdout.pipe(process.stdout);
});


