# Lista de tareas

Mini aplicación de línea de comandos para anotar tareas pendientes. Es el proyecto de práctica de la sesión 10.

## Requisitos

- Node.js 20 o superior
- Git

No hay que instalar dependencias.

## Uso

```bash
node src/cli.js agregar "Comprar pan"
node src/cli.js listar
node src/cli.js completar 1
```

Las tareas se guardan en `tareas.json`, en la carpeta desde donde ejecutas el comando.

## Pruebas

```bash
npm test
```

## Estructura

```
src/tareas.js         reglas de las tareas (sin archivos ni pantalla)
src/cli.js            entrada por comandos, lectura y guardado en tareas.json
test/tareas.test.js   pruebas de las reglas
```
