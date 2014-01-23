var
  spawn = require("child_process").spawn,
  watchr = require("watchr"),
  debounce = require("debounce");

module.exports = function (rootDir) {
  var mode, jbakeProcess;

  var bake = function () {
    var self = this;
    if (mode === "serve") {
      console.log("Stopping JBake server.");
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
      
      self.serve();
    });
  };
  
  return {
    bake: debounce(bake, 2000),
    serve: function () {
      jbakeProcess = spawn("jbake", ["-s"]);
      mode = "serve";
      jbakeProcess.stdout.pipe(process.stdout);
    },
    watch: function () {
      var self = this;
      watchr.watch({
        paths: [rootDir],
        ignorePaths: [rootDir + "/output"],
        ignoreHiddenFiles: true,
        listener: function (type, filename) {
          console.log(type + ": " + filename);
          self.bake();
        }
      });
    }
  };
};
