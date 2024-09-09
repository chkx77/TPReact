# Adiviná el Número

Una aplicación de juego simple en React donde el objetivo es adivinar un número entre 1 y 20. El juego incluye una puntuación acumulativa, un contador de tiempo, y un sistema de intentos que se representan como corazones. También cuenta con un modo difícil que se activa automáticamente cuando los intentos se reducen.

## Características

- **Juego Interactivo:** Adivina el número objetivo dentro de un rango de 1 a 20.
- **Sistema de Intentos:** Comienza con 10 intentos (representados como corazones) y pierde uno cada vez que adivinas incorrectamente.
- **Puntuación Acumulativa:** La puntuación se basa en la cantidad de intentos restantes cuando adivinas correctamente.
- **Modo Difícil:** Se activa cuando el número de intentos es menor o igual a 5, haciendo que el tiempo se reduzca más rápido.
- **Temporizador:** Un contador de tiempo que se reinicia con cada intento y se agota al final del juego.
- **Puntuación Máxima:** Se guarda y actualiza si la puntuación acumulativa es mayor al puntaje más alto registrado.
