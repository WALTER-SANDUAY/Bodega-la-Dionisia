# 🍷 Finca La Dionisia

## Guía de Markdown


## Descripción del Comercio

| Campo | Detalle |
|---|---|
| **Nombre** | Finca La Dionisia |
| **Ubicación** | Santo Tomás, Tinogasta, Catamarca |
| **Telefono** | +5493416930658 |
| **Objetivos del sitio** | Mostrar los vinos, la galería de fotos de la finca y facilitar el contacto directo por WhatsApp |

---

## Análisis Técnico: SPA y PWA

### ¿Qué es una SPA?
Una SPA (Single Page Application) es una aplicación web que carga un único documento HTML y actualiza el contenido dinámicamente sin recargar la página. Esto se logra con React, permitiendo una navegación fluida entre las secciones del sitio.

### ¿Por qué usamos SPA en Finca La Dionisia?
Porque permite que el usuario navegue entre Inicio, Nuestros Vinos, Galería y Contacto sin interrupciones, mejorando la experiencia y el tiempo de permanencia en el sitio.

### ¿Qué es una PWA?
Una PWA (Progressive Web App) combina lo mejor de un sitio web y una app móvil. Mediante Service Workers y un manifiesto web, permite que el sitio funcione sin conexión y se instale en el celular como una app nativa.

### ¿Por qué usamos PWA en Finca La Dionisia?
Porque la finca se encuentra en una zona rural donde la conectividad puede ser inestable. Con PWA, los clientes y turistas pueden ver el catálogo de vinos y el contacto incluso sin señal, y acceder al sitio desde la pantalla de su celular sin necesidad de una tienda de aplicaciones.

ETAPA 2-
## 2. Relevamiento de Necesidades 
| Necesidades destacada | Solución de la propuesta |
|------------------------|--------------------------|
| Mostrar productos      | Galeria con fotos y precios |
| Hinformar historia     | Sección "nuestra historia" con texto he himágenes |
| contacto rápido        | Formulario con nombre, email y mensaje |
------------------------------------------------------------------------------
## 3. Fundamentación Técnica 
**Aplicación en este proyecto:** El catalogo de vinos se muestrá en una sola vista, con navegación interna sin recargas. 

### PWA (Progressive web App)
**Aplicación en ete proyecto:** Los clientes podran guardar la Web en su selular y accseder a la misma incluso con conexion limitada. 

## 4. Arquitectura del proyecto
Estructura inicial de carpetas:
/SRC
/components
Header.jsx
Footer.jsx
Main.jsx
Gallery.jsx
/assets
/imagenes
/styles
/layout

Ejemplo de componente básico:
```jsx
function Header() {
  return (
    <header>
      <nav>
        <h1>Finca La Dionicia</h1>
      </nav>
    </header>
  );
}



