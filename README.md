# Around The U.S.

Proyecto de práctica en TypeScript, HTML y CSS. Muestra una galería de lugares (tarjetas con imagen y título) y un perfil de usuario editable, con ventanas emergentes (modales), validación de formularios y conexión a una API para guardar los datos en un servidor.

## 🧭 Descripción

La página presenta el perfil de un usuario y una galería interactiva de tarjetas. Los datos del perfil y las tarjetas se cargan desde el servidor y los cambios se guardan en él, así que se conservan al recargar la página. El usuario puede:

- Editar su perfil (nombre y ocupación).
- Cambiar su foto de perfil con un enlace a una imagen. Al pasar el cursor sobre la foto, esta se oscurece y aparece el icono de edición.
- Agregar nuevas tarjetas con título y enlace a una imagen.
- Darles "me gusta" y quitárselo. El estado se guarda en el servidor.
- Eliminar sus tarjetas, previa confirmación en una ventana emergente. El icono de la papelera solo aparece en las tarjetas creadas por el propio usuario.
- Ver una vista ampliada de cada imagen.

Los formularios se validan en tiempo real. Mientras se guarda la información, el botón de envío muestra "Guardando..." hasta que el servidor responde. Los modales se cierran con la X, haciendo clic fuera de ellos o con la tecla Esc.

## 🛠️ Tecnologías y técnicas utilizadas

- HTML5
- CSS3 (metodología BEM)
- TypeScript (con `strict` activado)
- Programación Orientada a Objetos (POO): clases, herencia, encapsulamiento y acoplamiento débil mediante callbacks
- Manipulación del DOM
- Fetch API y Promesas (`Promise.all` para la carga inicial)
- API REST de TripleTen (Around The U.S.)

## 🧩 Arquitectura de clases

| Clase                   | Responsabilidad                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Api`                   | Concentra todas las solicitudes al servidor. Revisa `res.ok` y lanza un error con el código de estado si la respuesta falla.                               |
| `FormValidator`         | Valida los campos de un formulario y controla el estado del botón de envío, usando un objeto de configuración.                                             |
| `Card`                  | Construye una tarjeta a partir de una plantilla, con los eventos de me gusta, eliminar y abrir imagen. Oculta la papelera si la tarjeta no es del usuario. |
| `Section`               | Renderiza una lista de elementos en un contenedor mediante una función `renderer`.                                                                         |
| `Popup`                 | Clase base de los modales: abrir, cerrar, cierre con Esc y clic en el fondo.                                                                               |
| `PopupWithImage`        | Hereda de `Popup`. Muestra una imagen ampliada con su leyenda.                                                                                             |
| `PopupWithForm`         | Hereda de `Popup`. Gestiona el envío del formulario, muestra "Guardando..." durante la solicitud y solo se cierra si esta tiene éxito.                     |
| `PopupWithConfirmation` | Hereda de `Popup`. Pide confirmación antes de eliminar una tarjeta.                                                                                        |
| `UserInfo`              | Lee y actualiza el nombre y la ocupación del usuario en la página.                                                                                         |

`index.ts` solo crea las instancias de las clases, carga los datos iniciales y agrega los detectores de eventos.

## 🌐 Conexión con la API

La clase `Api` se comunica con `https://around-api.es.tripleten-services.com/v1` y envía el token de autorización en los encabezados de cada solicitud.

| Acción                    | Método   | Ruta                   |
| ------------------------- | -------- | ---------------------- |
| Obtener datos del usuario | `GET`    | `/users/me`            |
| Editar perfil             | `PATCH`  | `/users/me`            |
| Actualizar foto de perfil | `PATCH`  | `/users/me/avatar`     |
| Obtener tarjetas          | `GET`    | `/cards`               |
| Crear tarjeta             | `POST`   | `/cards`               |
| Dar "me gusta"            | `PUT`    | `/cards/:cardId/likes` |
| Quitar "me gusta"         | `DELETE` | `/cards/:cardId/likes` |
| Eliminar tarjeta          | `DELETE` | `/cards/:cardId`       |

Al cargar la página, el perfil y las tarjetas se piden al mismo tiempo con `Promise.all`, y las tarjetas se renderizan cuando ambas respuestas han llegado. Los errores de red o del servidor se registran en la consola.

### Tipos de datos

En `src/types.ts` se separan los datos que se envían desde los formularios de los datos completos que devuelve el servidor (por ejemplo, una tarjeta con `_id`, `owner` e `isLiked`). Así TypeScript distingue entre ambos y las firmas de los métodos de `Api` son más claras.

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
│   ├── Api.ts
│   ├── Card.ts
│   ├── FormValidator.ts
│   ├── Popup.ts
│   ├── PopupWithConfirmation.ts
│   ├── PopupWithForm.ts
│   ├── PopupWithImage.ts
│   ├── Section.ts
│   ├── UserInfo.ts
│   ├── index.ts
│   └── types.ts
├── tsconfig.json
└── README.md
```

## ▶️ Cómo ejecutar el proyecto

1. Clona el repositorio.
2. Compila el código TypeScript desde la raíz del proyecto:

   ```
   tsc
   ```

   Esto genera los archivos `.js` dentro de `public/`.

3. Abre la carpeta `public/` con un servidor local (por ejemplo, la extensión Live Server de VS Code o `npx serve public`). No abras `index.html` con doble clic, porque los módulos de ES no cargan desde `file://`.
4. Necesitas conexión a internet, ya que los datos se cargan desde la API.

El token de la API se configura en `src/index.ts`, al crear la instancia de `Api`.
