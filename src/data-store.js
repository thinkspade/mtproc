const fs = require('fs');
const ndjson = require('ndjson');

const data_store_path = __dirname+'/data.ndjson';
const data_store_conf = {'flags':'a'};

let sock_com_emitter;

/**
* Registers an emitter to update socket.io 
*/
exports.registerEmitter = function(emitter) {
  sock_com_emitter = emitter;
}

/**
* Saves the JSON data to the JSON file store
*/
exports.save = function(validJSONData) {
  // using .ndjson for storage format
  let transformStream = ndjson.stringify();
  // pipe the ndjson serialized o/p to the file-system
  let outputStream = transformStream.pipe(fs.createWriteStream(data_store_path, data_store_conf));

  if(validJSONData.length > 0) {
    validJSONData.forEach(function(record) {
      transformStream.write(record);
    });
  } else {
    transformStream.write(validJSONData);
  }
  // end the stream so that transforstream knows to flush and close the file output stream
  transformStream.end();
  // once ndjson has flushed all data lets indicate done
  outputStream.on('finish', function() {
    sock_com_emitter.emit('new-data', validJSONData);
  });
}

/**
* Fetches all the records from the file store and pushes it 
* to the client socket
*/
exports.fetchAllRecords = function(socket) {
  let inputStream = fs.createReadStream(data_store_path);
  let transformStream = inputStream.pipe(ndjson.parse());
  transformStream.on('data', function handleRecord(data) {
    socket.send(data);
  });
}