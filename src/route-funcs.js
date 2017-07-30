const sock_com = require('./sock-com.js');
const data_store = require('./data-store.js');

/**
*  Starts the socket io
*/
exports.start_sock_com = function(server) {
  sock_com.start(server);
  data_store.registerEmitter(sock_com.emitter);
}

/**
*  Serves the dashboard page
*/
exports.dashboard = function(req, res) {
  res.sendFile(__dirname + '/dash.html');
}

/**
*  Endpoint to post market trade data
*/
exports.market_trade_endpoint_post = function(req, res) {
  let incoming = '';
  req.on('data', function(chunk) {
    incoming += chunk.toString();
  });

  req.on('end', function() {
    let validJSONData = validateJSON(incoming);
    if(!validJSONData) {
      res.end('Invalid JSON payload\n');
      return;
    }
    data_store.save(validJSONData);
    res.end();
  });
}

/**
*  Validates the JSON data
*/
function validateJSON(rawdata) {
  try {
    let validJSONObj = JSON.parse(rawdata);
    if(validJSONObj && typeof validJSONObj === 'object') {
      return validJSONObj;
    }
  } catch(err) {
    console.log(err);
    return false;
  }
}
