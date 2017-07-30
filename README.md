# mtproc
frontend endpoint - http://localhost:3000/dash
endpoint to POST messages - http://localhost:3000/mt

Required
--------
Node.js and NPM

How to Run
----------
Type the following commands from the root directory of the project
- 'npm install' to install dependencies
- 'npm start' to start the server

Accepted JSON data format
-------------------------
{"userId": "134256", "currencyFrom": "EUR", "currencyTo": "GBP", "amountSell": 1000,
"amountBuy": 747.10, "rate": 0.7471, "timePlaced" : "24-JAN-15 10:27:44", "originatingCountry": "FR"}

Curl command to test
--------------------
curl -H "Content-Type: application/json" -d {"userId": "134256", "currencyFrom": "EUR", "currencyTo": "GBP", "amountSell": 1000,
"amountBuy": 747.10, "rate": 0.7471, "timePlaced" : "24-JAN-15 10:27:44", "originatingCountry": "FR"} http://127.0.0.1:3000/

Frontend
--------
- Its a basic HTML page which doesn't make use of any UI libraries
- It displays the connection status, total number of records and the data data posted to the '/mt' endpoint.

Libraries used
-------------- 
- 'Sticky-Session' lib is used to balance incoming requests depending on the CPU cores
- 'Express' is used as a file server
- 'Socket.io' for realtime bidirectional communication
- 'ndjson' for reading and writing JSON to local file

Working
-------
- When http://localhost:3000/dash is loaded all the saved records from the file storage are sent to the client using Socket.io.
- Any JSON data recieved through the '/mt' endpoint will be saved to the local file store and all the connected clients will be dynamically updated using the Socket.io.
