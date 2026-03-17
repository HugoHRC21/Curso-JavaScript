# Playes Sound - Interactive Audio Board

Una botonera interactiva desarrollada en **Vanilla JavaScript** que permite la reproducción instantánea de efectos de sonido, ideal para aplicaciones de juegos o interfaces de usuario dinámicas.

## Características principales
* **Reproducción Instantánea:** Activación de sonidos mediante clics o interacción directa con la interfaz.
* **Manejo Multimedia:** Uso eficiente del elemento `<audio>` para cargar y reproducir archivos de sonido sin retraso (latencia baja).
* **Interfaz Visual Activa:** Los elementos visuales cambian de estado (animaciones o colores) mientras el sonido se está reproduciendo.

## Tecnologías utilizadas
* **JavaScript (ES6+):** Lógica para controlar los métodos `.play()` y `.pause()` del objeto de audio.
* **HTML5 Audio:** Estructura semántica para la gestión de recursos multimedia.
* **CSS Moderno:** Estilos dinámicos para ofrecer feedback visual al usuario durante la interacción.

## Conceptos Aplicados
* Manejo de la propiedad `currentTime` para permitir reproducciones consecutivas rápidas.
* Asociación de datos mediante atributos `data-*` en HTML para vincular botones con sus respectivos archivos de audio.

## Demo en vivo
(https://hugohrc21.github.io/Curso-JavaScript/Playes%20Sound/)