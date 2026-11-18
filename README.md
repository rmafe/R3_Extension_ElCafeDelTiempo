# ☕ El café del tiempo

El café del tiempo es una extensión para Firefox que permite gestionar pequeños descansos durante una jornada de trabajo o estudio, utilizando una taza de café como representación visual del paso del tiempo.

El proyecto parte de un reloj creativo desarrollado anteriormente con p5.js. En esta nueva versión, la taza comienza llena y se va vaciando a medida que transcurre el descanso, simulando cómo nos vamos tomando un café durante ese tiempo.

## Funcionalidades

- Temporizador configurable entre 1 y 30 minutos.
- Animación del nivel del café en función del tiempo restante.
- Representación animada del vapor.
- Cambio del color de fondo según el momento del día.
- Visualización de la hora local.
- Controles para iniciar, pausar, reanudar y reiniciar el temporizador.
- Contador de descansos completados.
- Persistencia de los datos al cerrar y volver a abrir la extensión.
- Funcionamiento sin conexión a Internet.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- p5.js
- Firefox WebExtensions (Manifest V3)
- localStorage

## Instalación en Firefox

Actualmente, la extensión se puede instalar de forma temporal siguiendo estos pasos:

1. Descargar o clonar este repositorio.
2. Abrir Firefox.
3. Introducir `about:debugging` en la barra de direcciones.
4. Seleccionar «Este Firefox».
5. Pulsar «Cargar complemento temporal».
6. Seleccionar el archivo `manifest.json` del proyecto.

Una vez cargada la extensión, podremos acceder a ella desde la barra de herramientas del navegador.

## Funcionamiento

El nivel del café representa la proporción de tiempo restante respecto a la duración total del descanso. Por otro lado, el vapor permanece animado y el fondo cambia de color dependiendo del momento del día.

Para mantener el estado del temporizador se utilizan las funciones `storeItem()` y `getItem()` de p5.js. Esto permite recuperar la información al volver a abrir la extensión, incluso si el descanso ha finalizado mientras permanecía cerrada.

Estas funciones utilizan localStorage, por lo que no es necesario solicitar el permiso `storage` en el manifiesto.

## Posibles mejoras

- Incorporar notificaciones de escritorio al finalizar un descanso.
- Añadir un historial de descansos.
- Permitir configurar sesiones de trabajo y descanso siguiendo la técnica Pomodoro.

## Referencias

- [p5.js](https://p5js.org/)
- [Mozilla WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Google Fonts – DynaPuff](https://fonts.google.com/specimen/DynaPuff)

## Autor

Rafael Menéndez

Proyecto desarrollado para la actividad R3 de la asignatura Desarrollo de Aplicaciones Interactivas de la Universitat Oberta de Catalunya (UOC).

Curso 2026-2027.

## Licencia

El código propio del proyecto se distribuye bajo la licencia MIT. Las bibliotecas y tipografías de terceros mantienen sus respectivas licencias.