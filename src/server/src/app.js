const db = require('./db');
const server = require('./server');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');

  // To parse responses from services and return them as proper API responses
  res.apiResponse = (err, message) => {
    let status = err ? (err.status || 500) : 200;
    message = err && err.message || message;

    return res.status(status).end(JSON.stringify({status, message}));
  };

  next();
});

app.get('/api/v1', (req, res) =>  server( res.apiResponse));

app.get('/internal/initialize', (req, res) => db.initialize(res.apiResponse));

app.get('/internal/all', (req, res) => db.getAthletes(res.apiResponse));

app.get('/internal/logs', (req, res) => db.getLogs(res.apiResponse));

app.use((req, res) => res.apiResponse({status:404, message:'Page not found'}));

app.use((err, req, res, next) => res.apiResponse('Server error. ' + err));

module.exports = app;
