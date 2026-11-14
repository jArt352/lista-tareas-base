// Entrada por línea de comandos.
// Este archivo habla con el mundo exterior (teclado, pantalla, archivo tareas.json).
// Las reglas de las tareas viven en tareas.js.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { completarTarea, crearTarea, listarTareas } from './tareas.js';

const ARCHIVO = 'tareas.json';

function cargar() {
  return existsSync(ARCHIVO) ? JSON.parse(readFileSync(ARCHIVO, 'utf8')) : [];
}

function guardar(lista) {
  writeFileSync(ARCHIVO, JSON.stringify(lista, null, 2));
}

const [comando, argumento] = process.argv.slice(2);

try {
  switch (comando) {
    case 'agregar': {
      guardar(crearTarea(cargar(), argumento ?? ''));
      console.log('Tarea agregada.');
      break;
    }
    case 'completar': {
      guardar(completarTarea(cargar(), Number(argumento)));
      console.log('Tarea completada.');
      break;
    }
    case 'listar': {
      const lineas = listarTareas(cargar());
      console.log(lineas.length > 0 ? lineas.join('\n') : 'No hay tareas.');
      break;
    }
    default:
      console.log('Uso: node src/cli.js <agregar "título" | completar <id> | listar>');
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
