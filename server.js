var name = require('./package.json').name

var port = ( process.env.PORT || 8080 )

var level = require('levelup')(
  ( process.env.DATA_PATH || '.projects' ),
  { db: require('leveldown') })

var bole = require('bole')
var log = bole(name)
bole.output(
  [ { level: 'debug', stream: process.stdout },
    { level: 'info',  stream: process.stdout },
    { level: 'warn',  stream: process.stdout },
    { level: 'error', stream: process.stdout } ])

require('http')
  .createServer(require('commonform-serve-projects')(log, level))
  .listen(port, function() {
    log.info(name + ' listening on port ' + this.address().port) })
