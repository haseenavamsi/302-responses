const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.writeFile('filename.txt', body, err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Error writing file');
        } else {
          res.writeHead(302, {'Location': 'http://example.com'});
          res.end();
        }
      });
    });
  } else {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method not allowed');
  }
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
