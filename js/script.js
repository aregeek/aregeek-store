let productosData = [];

// Cargar productos desde archivos JSON
async function cargarProductos() {
    try {
        // Intentar cargar el archivo de índice de productos
        const response = await fetch('products/index.json');
        
        if (!response.ok) {
            console.log('Archivo index.json no encontrado. Esperando primeros productos...');
            productosData = [];
            renderizarProductos(productosData);
            return;
        }

        productosData = await response.json();
        
        if (!Array.isArray(productosData)) {
            productosData = [productosData];
        }

        renderizarProductos(productosData);
    } catch (error) {
        console.error('Error cargando productos:', error);
        renderizarProductos(productosData);
    }
}

// Renderizar productos en la página
function renderizarProductos(productos = productosData, filtro = 'todos') {
    const grid = document.getElementById('productosGrid');
    
    if (!grid) return;

    let productosFiltrados = productos;

    if (filtro !== 'todos') {
        productosFiltrados = productos.filter(p => p.category === filtro);
    }

    if (productosFiltrados.length === 0) {
        grid.innerHTML = '<div class="no-productos">No hay productos disponibles en esta categoría</div>';
        return;
    }

    grid.innerHTML = productosFiltrados.map(producto => `
        <div class="producto-card" data-categoria="${producto.category}">
            <div class="producto-imagen">
                ${producto.image ? `<img src="${producto.image}" alt="${producto.name}">` : '<span>🐧</span>'}
            </div>
            <div class="producto-info">
                <span class="producto-categoria">${producto.category}</span>
                <h3 class="producto-nombre">${producto.name}</h3>
                <p class="producto-descripcion">${producto.description}</p>
                <p class="producto-precio">$${producto.price.toFixed(2)}</p>
                <button class="producto-btn" onclick="contactarProducto('${producto.name}')">Consultar Precio</button>
            </div>
        </div>
    `).join('');
}

// Filtrar productos
function configurarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            e.target.classList.add('active');

            const filtro = e.target.dataset.filtro;
            renderizarProductos(productosData, filtro);
        });
    });
}

// Contactar sobre un producto
function contactarProducto(nombreProducto) {
    const mensaje = `Hola! Me interesa el producto: ${nombreProducto}`;
    const enlaceWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    const enlaceInstagram = 'https://instagram.com/aregeek';
    
    // Para demostración, redirigir a Instagram
    window.open(enlaceInstagram, '_blank');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarFiltros();
});

// Recargar productos cada 30 segundos para detectar cambios
setInterval(cargarProductos, 30000);