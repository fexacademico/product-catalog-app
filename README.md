# Catálogo de Productos Inteligente

Esta es una aplicación web donde cualquier persona puede crear un catálogo digital de productos. Lo interesante es que no hace falta tener ni las imágenes ni una descripción perfecta: la inteligencia artificial se encarga de eso.

---

## ¿Qué hace esta app?

- Permite que el usuario escriba una idea o descripción básica del producto.
- Con esa información, se genera automáticamente una imagen representativa.
- También se genera una descripción mejorada y más profesional del producto.
- Todo queda guardado en el navegador del usuario (no hay base de datos).

---

## ¿Cómo funciona?

La aplicación está dividida en dos partes:

1. **Frontend** (interfaz): está hecha con HTML, CSS y JavaScript (con jQuery) y se puede alojar en GitHub Pages.
2. **Backend**: es una API sencilla hecha con Express.js que está desplegada en Render. Se encarga de hablar con OpenAI para generar imágenes y textos.

La API pública (segura) está disponible en:  
https://product-catalog-api-urhs.onrender.com

---

## ¿Qué tecnologías se usan?

- JavaScript + jQuery
- OpenAI API (DALL·E para imágenes y GPT para descripciones)
- HTML + CSS (con diseño responsivo)
- LocalStorage, SessionStorage y Cookies
- GitHub Pages para publicar el sitio
- Render para alojar el backend

---

## ¿Cómo lo puedo probar?

1. Abrí el archivo `index.html` directamente o desplegalo con GitHub Pages.
2. Escribí tu nombre, área de trabajo y una idea de producto.
3. La aplicación generará una imagen y una descripción.
4. Podés eliminar productos, y todo lo que generás queda guardado localmente.

---

## API del backend (disponible públicamente)

### POST /generate
Descipción: Genera una imagen

- **body**: { idea: string }
  ```json
  {
    "idea": "Una lámpara solar ecológica para exteriores"
  }
  ```
- **response**: { imageUrl: string }
   ```json
  {
    "imageUrl": "www.imageurl.com"
  }
  ```

### POST /describe
Descipción: Genera una descripción profesional

- **body**: { features: string }
  ```json
  {
    "features": "Hecha de materiales reciclados, funciona toda la noche"
  }
  ```
- **response**: { description: string }
   ```json
  {
    "description": "Una descripción profesional de la imagen"
  }
  ```

## Notas

- No hace falta clave de OpenAI, la API ya la incluye del lado seguro.
- Todo el código es editable. Podés agregar más campos, estilos o funcionalidades.
- Esta versión es solo para uso académico. No se recomienda para producción comercial sin ajustes.

---

## Créditos y Licencia

Proyecto desarrollado con fines educativos.

Podés adaptarlo y compartirlo sin restricciones, siempre que se use para aprender.
