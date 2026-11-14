import assert from 'node:assert/strict';
import { test } from 'node:test';
import { alternarTarea, crearTarea } from '../public/tareas.js';

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

test('alternarTarea marca como completada una tarea pendiente', () => {
  const lista = alternarTarea(crearTarea([], 'Comprar pan'), 1);
  assert.equal(lista[0].completada, true);
});

test('alternarTarea vuelve a dejar pendiente una tarea completada', () => {
  const lista = alternarTarea(alternarTarea(crearTarea([], 'Comprar pan'), 1), 1);
  assert.equal(lista[0].completada, false);
});

test('alternarTarea falla si el id no existe', () => {
  assert.throws(() => alternarTarea([], 99), /No existe la tarea/);
});
