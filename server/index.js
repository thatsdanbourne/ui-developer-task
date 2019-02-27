const express = require('express');
const fs = require('fs');
const router = require('express').Router();

router.get('/api/search/jobs', file('./server/search-results.json'));

function file(filename) {
  return (request, response) => {
    response.writeHead(200, 'OK');
    fs.createReadStream(filename).pipe(response);
  };
}
server();

function server() {
  express()
    .use(router)
    .listen(8090);
}