const cluster = require('cluster');

if (cluster.isMaster) {
  const fs = require('fs');
  const toml = require('toml');

  const config = toml.parse(fs.readFileSync('./config.toml'));

  for (const task of config.tasks) {
    cluster.fork({
      TP12_PLACE: task.place,
      TP12_GAMETIME: task.gameTime,
      TP12_GAMEDATE: task.gameDate,
      TP12_SID: config.sid,
    });
  }
} else {
  const { TP12_SID, TP12_GAMEDATE, TP12_GAMETIME, TP12_PLACE } = process.env;
  const prefixLogs = logger => {
    const originalConsoleLog = logger;
    return (...args) => originalConsoleLog.apply(console, [`[${cluster.worker.id}]`, ...args]);
  };
  console.log = prefixLogs(console.log);
  console.error = prefixLogs(console.error);
  require('./tp12_worker')(TP12_SID, TP12_GAMEDATE, TP12_GAMETIME, TP12_PLACE);
}



