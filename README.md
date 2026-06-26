# Parcial 1 - Programación 3 (Desarrollo Frontend)
**Cent 35 - Tecnicatura en Desarrollo de Software** * **Estudiante:** Facundo Carrasco  
* **Fecha de entrega:** 26-06-2026  

## Descripción del Proyecto
Este módulo interactivo resuelve exclusivamente del lado del cliente (Frontend) las mecánicas esenciales de registro y autenticación de usuarios para el examen. Cuenta con una interfaz simétrica en paralelo mediante Flexbox, validaciones manuales legibles, persistencia de datos local y simulación de asincronía.

## Estructura y Lógica del Código
Para demostrar la autoría y el entendimiento completo de las herramientas, se evitó el uso de sintaxis avanzada o Expresiones Regulares complejas, estructurando el código de la siguiente manera:

* **Validación de Email (`validateEmailFormat`):** Se utiliza el método nativo `.includes()` de JavaScript para verificar de forma simple que la cadena contenga los caracteres esenciales de un correo (`@` y `.`).
* **Validación de Contraseña (`validatePasswordFormat`):** Controla mediante `.length` que tenga un mínimo de 8 caracteres y recorre el texto con un bucle `for` tradicional para comprobar de forma lineal que exista al menos un dígito numérico (del '0' al '9').
* **Validación de Edad (`isOver18`):** Extrae el año de la fecha seleccionada usando `.getFullYear()` y calcula la diferencia con el año actual para validar de forma directa la mayoría de edad.
* **Persistencia (`localStorage`):** Guarda y lee los usuarios registrados convirtiendo los objetos a texto mediante `JSON.stringify()` y `JSON.parse()`.
* **Asincronía:** Se implementa una función con `async/await` que simula una demora de red de 1 segundo antes de confirmar el éxito o el error de las operaciones.
* **Diseño y Maquetación (`styles.css`):** Se aplica `display: flex` con `flex-direction: row` en el contenedor principal para ubicar el Registro y el Login uno al lado del otro. El espaciado y la separación de las etiquetas se manejan estrictamente con propiedades tradicionales de `margin` y `padding`.

## Instrucciones para la Ejecución
1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` con doble clic en cualquier navegador web moderno. No requiere dependencias ni servidores externos.