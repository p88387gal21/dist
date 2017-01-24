var AutoUpdater = require('auto-updater');
var GalExe = new ActiveXObject("WScript.Shell");

function runGAL() {
  GalExe.Run("file:///C:/gal/gal.exe")
}

    var autoupdater = new AutoUpdater({
     pathToJson: '',
     autoupdate: false,
     checkgit: true,
     jsonhost: 'raw.githubusercontent.com',
     contenthost: 'codeload.github.com',
     progressDebounce: 0,
     devmode: false
    });

    // State the events
    autoupdater.on('git-clone', function() {
      console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
    });
    autoupdater.on('check.up-to-date', function(v) {
      console.info("Versão mais recente já está instalada: " + v);
    });
    autoupdater.on('check.out-dated', function(v_old, v) {
      console.warn("Existe uma versão mais actual: " + v_old + " of " + v);
      autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
      // Maybe ask if the'd like to download the update.
    });
    autoupdater.on('update.downloaded', function() {
      console.log("Terminou descarregamento da aplicação.");
      autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update.not-installed', function() {
      console.log("Actualização pronta a instalar.");
      autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update.extracted', function() {
      console.log("Actualização completa.");
      console.warn("Reinicie a aplicação.");
    });
    autoupdater.on('download.start', function(name) {
      console.log("A fazer o carregamento da aplicação: " + name);
    });
    autoupdater.on('download.progress', function(name, perc) {
      process.stdout.write("A carregar " + perc + "% \033[0G");
    });
    autoupdater.on('download.end', function(name) {
      console.log("Carregamento completo " + name);
    });
    autoupdater.on('download.error', function(err) {
      console.error("Erro a carregar " + err);
    });
    autoupdater.on('end', function() {
      console.log("A aplicação está pronta.");
      runGAL();
    });
    autoupdater.on('erro', function(name, e) {
      console.error(name, e);
    });

    // Start checking
    autoupdater.fire('check');

