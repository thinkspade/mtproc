const sticky = require('sticky-session');
const server = require('./server.js').getInstance();

const port = 3000;

if (!sticky.listen(server, port)) {
  server.once('listening', function() {
    console.log('Master - started on '+port+' port');
  });
} else {
  console.log('Slave - started on '+port+' port');
}
