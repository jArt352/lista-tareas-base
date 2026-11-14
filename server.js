// Servidor mínimo para ver la página en tu navegador.
// Solo entrega los archivos de la carpeta public. No hay que tocarlo.

import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('./public/', import.meta.url));
const PUERTO = process.env.PORT || 3000;
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

createServer(async (peticion, respuesta) => {
  const ruta = decodeURIComponent(new URL(peticion.url, 'http://localhost').pathname);
  const archivo = normalize(join(RAIZ, ruta === '/' ? 'index.html' : ruta));

  if (!archivo.startsWith(RAIZ)) {
    respuesta.writeHead(403).end('Prohibido');
    return;
  }

  try {
    const datos = await readFile(archivo);
    respuesta.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] ?? 'application/octet-stream' });
    respuesta.end(datos);
  } catch {
    respuesta.writeHead(404).end('No encontrado');
  }
}).listen(PUERTO, '127.0.0.1', () => {
  console.log(`Lista de tareas lista. Abre http://localhost:${PUERTO} en tu navegador.`);
});
