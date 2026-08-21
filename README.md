# Around The U.S.

Proyecto de práctica en JavaScript, HTML y CSS. Muestra una galería de lugares (tarjetas con imagen y título) y un formulario de perfil editable, con ventanas emergentes (modales) manejadas mediante manipulación del DOM.

## 🧭 Descripción

La página presenta el perfil de un usuario y una lista de tarjetas de lugares. El usuario puede:

- Editar el nombre y la descripción de su perfil a través de una ventana emergente.
- Ver una galería de tarjetas con imágenes y nombres de lugares.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (metodología BEM)
- JavaScript (ES6+)

## ✨ Funcionalidades implementadas

- **Modal de edición de perfil**
  - Se abre al hacer clic en el botón "Editar perfil".
  - Se cierra al hacer clic en el botón de cierre (X).
  - Al abrirse, el formulario se rellena automáticamente con los datos actuales del perfil.
  - Al guardar (`submit`), los nuevos valores se reflejan en la página y el modal se cierra.

- **Datos de tarjetas**
  - Array `initialCards` con seis lugares (nombre + URL de imagen), como base para la generación dinámica de tarjetas.

## 📁 Estructura del proyecto

```
around-the-us/
├── index.html
├── pages/
│   └── index.css
├── images/
└── scripts/
    └── index.js
```

## 🚧 Próximos pasos

- Generar dinámicamente las tarjetas de la galería a partir del array `initialCards`.
- Implementar la funcionalidad de "Agregar tarjeta" (nuevo lugar).
- Implementar "Eliminar tarjeta" y "Me gusta" en cada tarjeta.
- Implementar la ventana emergente de vista ampliada de imagen (`image-popup`).

## ▶️ Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
