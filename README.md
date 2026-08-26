# Around The U.S.

Proyecto de práctica en JavaScript, HTML y CSS. Muestra una galería de lugares (tarjetas con imagen y título) y un formulario de perfil editable, con ventanas emergentes (modales) manejadas mediante manipulación del DOM.

## 🧭 Descripción

La página presenta el perfil de un usuario y una galería interactiva de tarjetas de lugares. El usuario puede editar su perfil, agregar nuevas tarjetas, darles "me gusta", eliminarlas y ver una vista ampliada de cada imagen.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (metodología BEM)
- JavaScript (ES6+)

## ✨ Funcionalidades implementadas

- **Modal de edición de perfil**
  - Se abre al hacer clic en el botón "Editar perfil" y se cierra con el botón de cierre (X).
  - Al abrirse, el formulario se rellena automáticamente con los datos actuales del perfil.
  - Al guardar (`submit`), los nuevos valores se reflejan en la página y el modal se cierra.

- **Galería de tarjetas dinámica**
  - Las tarjetas se generan a partir del array `initialCards`, clonando un `<template>` para cada una (`getCardElement()`).
  - Manejo de datos incompletos mediante parámetros predeterminados (nombre y/o imagen de marcador de posición).

- **Agregar nueva tarjeta**
  - Modal "Nuevo lugar" que se abre/cierra con `openModal()` / `closeModal()`.
  - Al enviar el formulario, la nueva tarjeta se agrega a la galería sin recargar la página.

- **Me gusta**
  - Cada tarjeta tiene un botón de "me gusta" que alterna su estado visual al hacer clic (`classList.toggle`).

- **Eliminar tarjeta**
  - Cada tarjeta tiene un botón de eliminar que la remueve del DOM (`closest()` + `.remove()`).

- **Vista ampliada de imagen**
  - Al hacer clic en la imagen de una tarjeta, se abre un modal (`image-popup`) mostrando la imagen ampliada y su título.

## 📁 Estructura del proyecto

```
web_project_around_es/
├── blocks/
│   ├── card.css
│   ├── cards.css
│   ├── content.css
│   ├── footer.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   └── profile.css
├── images/
│   ├── add-icon.svg
│   ├── avatar.jpg
│   ├── close.svg
│   ├── delete-icon.svg
│   ├── edit-icon.svg
│   ├── like-active.svg
│   ├── like-inactive.svg
│   ├── logo.svg
│   └── placeholder.jpg
├── pages/
│   └── index.css
├── scripts/
│   └── index.js
├── vendor/
│   ├── fonts/
│   │   ├── Inter-Black.woff2
│   │   ├── Inter-Medium.woff2
│   │   └── Inter-Regular.woff2
│   ├── fonts.css
│   └── normalize.css
├── .prettierignore
├── index.html
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
