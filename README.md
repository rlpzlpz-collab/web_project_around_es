# Around The U.S.

Proyecto de práctica en TypeScript, HTML y CSS. Muestra una galería de lugares (tarjetas con imagen y título) y un perfil de usuario editable, con ventanas emergentes (modales) y validación de formularios.

## 🧭 Descripción

La página presenta el perfil de un usuario y una galería interactiva de tarjetas. El usuario puede:

- Editar su perfil (nombre y ocupación).
- Agregar nuevas tarjetas con título y enlace a una imagen.
- Darles "me gusta" y eliminarlas.
- Ver una vista ampliada de cada imagen.

Los formularios se validan en tiempo real y los modales se cierran con la X, haciendo clic fuera de ellos o con la tecla Esc.

## 🛠️ Tecnologías y técnicas utilizadas

- HTML5
- CSS3 (metodología BEM)
- TypeScript (con `strict` activado)
- Programación Orientada a Objetos (POO): clases, herencia, encapsulamiento y acoplamiento débil mediante callbacks
- Manipulación del DOM

## 🧩 Arquitectura de clases

| Clase            | Responsabilidad                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `FormValidator`  | Valida los campos de un formulario y controla el estado del botón de envío, usando un objeto de configuración. |
| `Card`           | Construye una tarjeta a partir de una plantilla, con los eventos de me gusta, eliminar y abrir imagen.         |
| `Section`        | Renderiza una lista de elementos en un contenedor mediante una función `renderer`.                             |
| `Popup`          | Clase base de los modales: abrir, cerrar, cierre con Esc y clic en el fondo.                                   |
| `PopupWithImage` | Hereda de `Popup`. Muestra una imagen ampliada con su leyenda.                                                 |
| `PopupWithForm`  | Hereda de `Popup`. Gestiona el envío del formulario y lo reinicia al cerrar.                                   |
| `UserInfo`       | Lee y actualiza el nombre y la ocupación del usuario en la página.                                             |

`index.ts` solo crea las instancias de las clases y agrega los detectores de eventos.

## 📁 Estructura del proyecto

```
web_project_around_es/
├── public/
│   ├── blocks/
│   ├── images/
│   ├── pages/
│   ├── vendor/
│   ├── index.html
│   └── *.js            (archivos compilados por tsc)
├── src/
│   ├── utils/
│   │   ├── constants.ts
│   │   └── dom.ts
│   ├── Card.ts
│   ├── FormValidator.ts
│   ├── Popup.ts
│   ├── PopupWithForm.ts
│   ├── PopupWithImage.ts
│   ├── Section.ts
│   ├── UserInfo.ts
│   └── index.ts
├── tsconfig.json
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

1. Clona el repositorio.
2. Compila el código TypeScript desde la raíz del proyecto:

```
   tsc
```

Esto genera los archivos `.js` dentro de `public/`. 3. Abre la carpeta `public/` con un servidor local (por ejemplo, la extensión Live Server de VS Code o `npx serve public`). No abras `index.html` con doble clic, porque los módulos de ES no cargan desde `file://`.
