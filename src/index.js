const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static('public'));

const options = {
	cert: fs.readFileSync(path.join(__dirname, '..', 'certificate', 'cert.pem')),
	key: fs.readFileSync(path.join(__dirname, '..', 'certificate', 'key.pem')),
	requestCert: false,
	rejectUnauthorized: false,
};
https.createServer(options, app).listen(8443, '0.0.0.0');
