# Mis tareas

Una lista de tareas en una página web. Anotas lo que tienes que hacer y marcas lo que ya terminaste. Es el proyecto de práctica de la sesión 10.

## Requisitos

- Node.js 20 o superior
- Git

No hay que instalar dependencias.

## Cómo verla

```bash
npm start
```

Luego abre http://localhost:3000 en tu navegador. Para detenerla, pulsa `Ctrl + C` en la terminal.

Las tareas se guardan en tu navegador, así que siguen ahí al recargar la página.

## Pruebas

```bash
npm test
```

## Estructura

```
public/index.html     la página
public/estilos.css    los colores y el diseño
public/app.js         la pantalla: botones, texto y guardado en el navegador
public/tareas.js      las reglas de las tareas (sin pantalla)
server.js             servidor mínimo para ver la página
test/tareas.test.js   pruebas de las reglas
```
