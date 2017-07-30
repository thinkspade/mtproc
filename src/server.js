/**
*  Retrieves the instance of the Server
*/
exports.getInstance = function() {
  const express = require('express');
  const app = express();
  const server = require('http').Server(app);
  const route_funcs = require('./route-funcs.js');

  app.use(express.static('public'));
  app.get('/dash', route_funcs.dashboard);
  app.post('/mt', route_funcs.market_trade_endpoint_post);

  route_funcs.start_sock_com(server);

  return server;
}
