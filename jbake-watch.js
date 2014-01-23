var
  spawn = require("child_process").spawn,
  watchr = require("watchr"),
  debounce = require("debounce");

module.exports = function (rootDir) {
  var jbakeProcess;

  var bake = debounce(function () {
    jbakeProcess = spawn("jbake");
    jbakeProcess.stdout.pipe(process.stdout);
    jbakeProcess.on("close", function (code) {
      if (code !== 0) {
        console.err("There were errors. JBake server not started.");
        return;
      }
    });
  }, 2000);

  return {
    serve: function () {
      watchr.watch({
        paths: [rootDir],
        ignorePaths: [rootDir + "/output"],
        ignoreHiddenFiles: true,
        listener: function (type, filename) {
          console.log(type + ": " + filename);
          bake();
        }
      });

      jbakeProcess = spawn("jbake", ["-s"]);
      jbakeProcess.stdout.pipe(process.stdout);
    }
  };
};
