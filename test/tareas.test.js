import assert from 'node:assert/strict';
import { test } from 'node:test';
import { completarTarea, crearTarea, listarTareas } from '../src/tareas.js';

test('crearTarea agrega una tarea pendiente con id 1 en una lista vacía', () => {
  const lista = crearTarea([], 'Comprar pan');
  assert.deepEqual(lista, [{ id: 1, titulo: 'Comprar pan', completada: false }]);
});

test('crearTarea asigna ids consecutivos', () => {
  const lista = crearTarea(crearTarea([], 'Uno'), 'Dos');
  assert.equal(lista[1].id, 2);
});

test('crearTarea rechaza un título vacío', () => {
  assert.throws(() => crearTarea([], ''), /no puede estar vacío/);
});

test('crearTarea no modifica la lista original', () => {
  const original = [];
  crearTarea(original, 'Comprar pan');
  assert.equal(original.length, 0);
});

test('completarTarea marca la tarea indicada', () => {
  const lista = completarTarea(crearTarea([], 'Comprar pan'), 1);
  assert.equal(lista[0].completada, true);
});

test('completarTarea falla si el id no existe', () => {
  assert.throws(() => completarTarea([], 99), /No existe la tarea/);
});

test('listarTareas muestra el estado de cada tarea', () => {
  const lista = completarTarea(crearTarea(crearTarea([], 'Uno'), 'Dos'), 2);
  assert.deepEqual(listarTareas(lista), ['[ ] 1. Uno', '[x] 2. Dos']);
});
