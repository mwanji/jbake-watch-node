var
  rootDir = process.cwd(),
  spawn = require("child_process").spawn,
  watchr = require("watchr"),
  debounce = require("debounce");

var bake = (function () {
    var mode, jbakeProcess;

    var refresh = function () {
      if (mode === "serve") {
        console.log("Stopping JBake server...");
        jbakeProcess.kill();
      }
      
      mode = "bake";
      jbakeProcess = spawn("jbake");
      jbakeProcess.stdout.pipe(process.stdout);
      jbakeProcess.on("close", function (code) {
        if (code !== 0) {
          mode = null;
          console.err("There were errors. JBake server not started.");
          return;
        }
        
        jbakeProcess = spawn("jbake", ["-s"]);
        mode = "serve";
        jbakeProcess.stdout.pipe(process.stdout);
      });
    };
    
    return debounce(refresh, 3000);
  }());
  
watchr.watch({
  paths: [rootDir],
  ignorePaths: [rootDir + "/output"],
  ignoreHiddenFiles: true,
  listener: function (type, filename) {
    console.log(type + ": " + filename);
    bake();
  }
});

console.log("Waiting for changes...");
