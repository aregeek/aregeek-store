# 📋 Instrucciones para Agregar Productos

## 🎯 Cómo agregar productos a tu tienda

### Opción 1: Actualizar el archivo `products/index.json` (Recomendado)

1. Ve a la carpeta `products/`
2. Abre el archivo `index.json`
3. Agrega tus productos en el siguiente formato:

```json
{
  "id": 13,
  "name": "Nombre del Producto",
  "category": "Figuras",
  "price": 19.99,
  "description": "Breve descripción del producto",
  "image": "ruta/a/imagen.jpg"
}
```

### Campos disponibles:

- **id**: Número único para el producto
- **name**: Nombre del producto
- **category**: Categoría (opciones: "Figuras", "Peluches", "Accesorios")
- **price**: Precio en USD (ej: 19.99)
- **description**: Descripción corta (máx 150 caracteres)
- **image**: Ruta a la imagen (opcional)

### Categorías disponibles:
- 🎨 **Figuras** - Figuras de acción y coleccionables
- 🧸 **Peluches** - Peluches y juguetes suaves
- ✨ **Accesorios** - Accesorios y complementos

---

## 🖼️ Agregar imágenes

1. Sube la imagen a la carpeta `images/productos/`
2. En el JSON, usa: `"image": "images/productos/mi-producto.jpg"`

---

## 💰 Estimación de precios

Los precios base varían según el tipo de producto:

- **Figuras pequeñas**: $15-20
- **Figuras medianas**: $20-35
- **Peluches pequeños**: $18-25
- **Peluches medianos**: $25-40
- **Accesorios**: $10-30

*(Los precios en el archivo son estimaciones. Puedes ajustarlos según tu costo real)*

---

## 🔄 El sitio se actualiza automáticamente

Cuando guardes cambios en `products/index.json`, el sitio recargará los productos cada 30 segundos.

---

## 📱 Redes sociales configuradas

- **Instagram**: @aregeek
- **Facebook**: AreGeek Coleccionables

Estos enlaces aparecen en la sección de contacto y en los botones de "Consultar Precio".

---

## 🚀 Publicar en GitHub Pages

Tu sitio estará disponible en: `https://aregeek.github.io/aregeek-store`

**Pasos para habilitarlo:**
1. Ve a Settings del repositorio
2. Baja a "GitHub Pages"
3. Selecciona rama "main" como source
4. ¡Listo! Tu sitio estará activo en unos segundos

---

## 📝 Ejemplo completo

```json
[
  {
    "id": 1,
    "name": "My Little Pony - Twilight Sparkle",
    "category": "Figuras",
    "price": 18.99,
    "description": "Figura coleccionable de Twilight Sparkle con detalles de pintura de alta calidad.",
    "image": "images/productos/twilight.jpg"
  },
  {
    "id": 2,
    "name": "Peluche Rainbow Dash",
    "category": "Peluches",
    "price": 22.99,
    "description": "Peluche suave de Rainbow Dash, perfecto para coleccionistas y fans.",
    "image": "images/productos/rainbow-peluche.jpg"
  }
]
```

---

## ❓ Cómo funcionan los precios y descripciones

Ya hemos buscado y agregado precios estimados basados en:

- **My Little Pony Figuras**: Precio promedio de mercado $15-25
- **My Little Pony Peluches**: Precio promedio $20-25
- **Figuras Barbie**: Precio coleccionable $20-30
- **Accesorios**: Precio promedio $10-35

Las descripciones fueron creadas basándose en los tipos de productos mostrados en tus imágenes. Puedes editarlas según sea necesario.

---

¡Tu tienda está lista! 🎉 Ahora solo agrega tus productos actualizando `products/index.json` y ¡a vender!