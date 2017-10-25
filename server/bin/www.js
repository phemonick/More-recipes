import http from 'http';
import app from '../index';

const port = parseInt(process.env.PORT,10) || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
