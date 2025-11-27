# El Dicho

Aplicación web estática para compartir refranes colombianos por departamento. Incluye un mapa interactivo con marcadores de los principales departamentos y un feed estilo red social para explorar y publicar nuevos dichos.

## Cómo usar

1. Abre `index.html` en tu navegador (no requiere servidor ni instalación de dependencias).
2. Haz clic en un departamento del mapa o en la leyenda para filtrar los refranes de esa región.
3. Usa el formulario "Agrega un refrán" para publicar nuevas entradas con autor y etiquetas. Las publicaciones nuevas aparecen al inicio del feed.

## Tecnologías

- HTML, CSS y JavaScript vanila.
- Leaflet y OpenStreetMap (vía CDN) para el mapa interactivo.

## Notas

- Los datos de departamentos se cargan desde `script.js` con coordenadas de referencia para colocar marcadores en el mapa.
- La aplicación funciona completamente en el navegador sin dependencias adicionales.
