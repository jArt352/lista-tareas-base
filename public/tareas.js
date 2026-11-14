// Reglas de la lista de tareas.
// Todas las funciones reciben una lista y devuelven una lista NUEVA.
// Aquí no hay pantalla ni almacenamiento: eso es trabajo de app.js.

export function crearTarea(lista, titulo) {
  if (titulo === '') {
    throw new Error('El título no puede estar vacío');
  }
  const id = lista.length === 0 ? 1 : Math.max(...lista.map((t) => t.id)) + 1;
  return [...lista, { id, titulo, completada: false }];
}

export function alternarTarea(lista, id) {
  const existe = lista.some((t) => t.id === id);
  if (!existe) {
    throw new Error(`No existe la tarea con id ${id}`);
  }
  return lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t));
}
