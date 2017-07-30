const events = require('events');
let event_emitter = new events.EventEmitter();

/**
*  EventEmitter for Socket IO 
*/
exports.emitter = event_emitter;

/**
*  Starts the Socket IO and listens to incoming 
*  client connections
*/
exports.start = function(server) {
  const fs = require('fs');
  const ndjson = require('ndjson');
  const data_store = require('./data-store.js');
  const io = require('socket.io')(server);

  io.on('connection', function(socket) {
    data_store.fetchAllRecords(socket);

    event_emitter.on('new-data', function(incomingJSONData) {
      socket.send(incomingJSONData);
    });

    socket.on('disconnect', function() {
      socket.removeAllListeners();
      socket.disconnect(true);
    });
  });
}
