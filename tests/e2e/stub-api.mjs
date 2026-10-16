import { createServer } from 'node:http';

const materials = [];

const readBody = (request) =>
  new Promise((resolve) => {
    let body = '';
    request.on('data', (chunk) => (body += chunk));
    request.on('end', () => resolve(JSON.parse(body || '{}')));
  });

const send = (response, status, payload) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(payload));
};

createServer(async (request, response) => {
  if (request.method === 'GET') {
    return send(response, 200, materials);
  }

  if (request.method === 'POST' && request.url.endsWith('/save')) {
    const material = { id: materials.length + 1, ...(await readBody(request)) };
    materials.push(material);
    return send(response, 200, material);
  }

  send(response, 404, {});
}).listen(4010);
