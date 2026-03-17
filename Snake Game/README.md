# Snake Game - Classic Arcade Logic

Una recreación del clásico juego de la serpiente desarrollada con **Vanilla JavaScript**, enfocada en la gestión de colisiones, renderizado en tiempo real y lógica de movimiento vectorial.

## Características principales
* **Game Loop de Precisión:** Control del refresco de pantalla para una experiencia de juego fluida y responsiva.
* **Sistema de Colisiones:** Lógica matemática para detectar impactos con los bordes del mapa y el propio cuerpo de la serpiente.
* **Crecimiento Dinámico:** Gestión de arreglos (arrays) para expandir el cuerpo de la serpiente cada vez que consume una "manzana".
* **Puntuación Máxima:** Registro de la puntuación actual y persistencia del récord personal.

## Tecnologías utilizadas
* **JavaScript (ES6+):** Uso intensivo de intervalos y manipulación de coordenadas en el DOM (o HTML5 Canvas).
* **Event Listeners:** Mapeo de teclas de dirección para un control preciso del movimiento.
* **CSS Moderno:** Diseño retro-arcade con una interfaz adaptada para el juego.

## Desafíos Técnicos
* Implementación de la lógica de "movimiento continuo" donde la serpiente no puede detenerse.
* Generación aleatoria de comida en coordenadas que no estén ocupadas por el cuerpo de la serpiente.
* Control del aumento de velocidad progresivo para incrementar la dificultad.

## Demo en vivo
(https://hugohrc21.github.io/Curso-JavaScript/Snake%20Game/)