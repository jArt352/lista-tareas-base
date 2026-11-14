// Pantalla de la lista de tareas.
// Este archivo habla con la página (botones, texto) y con el almacenamiento del navegador.
// Las reglas de las tareas viven en tareas.js.

import { alternarTarea, crearTarea } from './tareas.js';

const CLAVE = 'lista-tareas';

const formulario = document.querySelector('#formulario');
const campo = document.querySelector('#campo');
const aviso = document.querySelector('#aviso');
const lista = document.querySelector('#lista');
const vacio = document.querySelector('#vacio');

let tareas = cargar();

function cargar() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? [];
  } catch {
    return [];
  }
}

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(tareas));
}

function crearElemento(tarea) {
  const fila = document.createElement('li');
  fila.className = tarea.completada ? 'tarea completada' : 'tarea';

  const marca = document.createElement('button');
  marca.type = 'button';
  marca.className = 'marca';
  marca.setAttribute('aria-pressed', String(tarea.completada));
  marca.setAttribute('aria-label', `Marcar «${tarea.titulo}» como hecha`);
  marca.addEventListener('click', () => {
    tareas = alternarTarea(tareas, tarea.id);
    guardar();
    mostrar();
  });

  const titulo = document.createElement('span');
  titulo.className = 'titulo';
  titulo.textContent = tarea.titulo;

  fila.append(marca, titulo);
  return fila;
}

function mostrar() {
  lista.replaceChildren(...tareas.map(crearElemento));
  vacio.hidden = tareas.length > 0;
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  try {
    tareas = crearTarea(tareas, campo.value);
    aviso.textContent = '';
    campo.value = '';
    guardar();
    mostrar();
    lista.lastElementChild.classList.add('nueva');
  } catch (error) {
    aviso.textContent = error.message;
  }
  campo.focus();
});

mostrar();
