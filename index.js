const http = require('http');

const message = 'Hello World!';
http.createServer((request, response) => {
  // eslint-disable-next-line no-console
  console.log(message);
  response.end(message);
}).listen(3000, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log('Server is working...');
});
