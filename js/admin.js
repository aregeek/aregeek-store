// Verificar sesión de admin
function verificarSesion() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    const currentTime = Date.now();
    const sesionTimeout = 24 * 60 * 60 * 1000; // 24 horas

    if (!isLoggedIn || (currentTime - loginTime) > sesionTimeout) {
        window.location.href = 'admin-login.html';
    }
}

verificarSesion();

let productosData = [];

// Cargar productos
async function cargarProductos() {
    try {
        const response = await fetch('products/index.json');
        if (response.ok) {
            productosData = await response.json();
            if (!Array.isArray(productosData)) {
                productosData = [productosData];
            }
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
    actualizarVistaProductos();
    actualizarEstadisticas();
}

// Actualizar tabla de productos
function actualizarVistaProductos(filtro = '') {
    const tbody = document.getElementById('productosBody');
    let productosFiltrados = productosData;

    if (filtro) {
        productosFiltrados = productosData.filter(p =>
            p.name.toLowerCase().includes(filtro.toLowerCase()) ||
            p.category.toLowerCase().includes(filtro.toLowerCase())
        );
    }

    if (productosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No hay productos</td></tr>';
        return;
    }

    tbody.innerHTML = productosFiltrados.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td><span class="badge badge-${p.category.toLowerCase()}">${p.category}</span></td>
            <td><strong>$${p.price.toFixed(2)}</strong></td>
            <td>${p.description.substring(0, 50)}...</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="abrirEditarProducto(${p.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${p.id})">🗑️ Eliminar</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Actualizar estadísticas
function actualizarEstadisticas() {
    const total = productosData.length;
    const figuras = productosData.filter(p => p.category === 'Figuras').length;
    const peluches = productosData.filter(p => p.category === 'Peluches').length;
    const accesorios = productosData.filter(p => p.category === 'Accesorios').length;
    const precioPromedio = total > 0 ? productosData.reduce((sum, p) => sum + p.price, 0) / total : 0;
    const inventarioTotal = productosData.reduce((sum, p) => sum + p.price, 0);

    document.getElementById('totalProductos').textContent = total;
    document.getElementById('totalFiguras').textContent = figuras;
    document.getElementById('totalPeluches').textContent = peluches;
    document.getElementById('totalAccesorios').textContent = accesorios;
    document.getElementById('precioPromedio').textContent = '$' + precioPromedio.toFixed(2);
    document.getElementById('inventarioTotal').textContent = '$' + inventarioTotal.toFixed(2);
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString('es-ES');
}

// Crear producto
document.getElementById('formCrearProducto').addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoProducto = {
        id: productosData.length > 0 ? Math.max(...productosData.map(p => p.id)) + 1 : 1,
        name: document.getElementById('nombre').value,
        category: document.getElementById('categoria').value,
        price: parseFloat(document.getElementById('precio').value),
        description: document.getElementById('descripcion').value,
        image: document.getElementById('imagen').value || ''
    };

    productosData.push(nuevoProducto);
    guardarProductos();
    
    document.getElementById('formCrearProducto').reset();
    mostrarToast('✅ Producto creado exitosamente');
    
    setTimeout(() => {
        mostrarSeccion('productos');
    }, 1500);
});

// Editar producto
function abrirEditarProducto(id) {
    const producto = productosData.find(p => p.id === id);
    if (!producto) return;

    document.getElementById('editId').value = id;
    document.getElementById('editNombre').value = producto.name;
    document.getElementById('editCategoria').value = producto.category;
    document.getElementById('editPrecio').value = producto.price;
    document.getElementById('editDescripcion').value = producto.description;
    document.getElementById('editImagen').value = producto.image || '';

    document.getElementById('editModal').classList.add('active');
}

function cerrarModal() {
    document.getElementById('editModal').classList.remove('active');
}

document.getElementById('formEditarProducto').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = parseInt(document.getElementById('editId').value);
    const producto = productosData.find(p => p.id === id);

    if (producto) {
        producto.name = document.getElementById('editNombre').value;
        producto.category = document.getElementById('editCategoria').value;
        producto.price = parseFloat(document.getElementById('editPrecio').value);
        producto.description = document.getElementById('editDescripcion').value;
        producto.image = document.getElementById('editImagen').value;

        guardarProductos();
        cerrarModal();
        actualizarVistaProductos();
        actualizarEstadisticas();
        mostrarToast('✅ Producto actualizado');
    }
});

// Eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        productosData = productosData.filter(p => p.id !== id);
        guardarProductos();
        actualizarVistaProductos();
        actualizarEstadisticas();
        mostrarToast('✅ Producto eliminado');
    }
}

// Guardar productos en JSON
function guardarProductos() {
    const contenido = JSON.stringify(productosData, null, 2);
    
    // Enviar al servidor para guardar
    fetch('guardar-productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productosData)
    }).catch(err => {
        console.log('Nota: Para guardar cambios permanentes, necesitas acceso al servidor.');
        // Almacenar en localStorage como alternativa
        localStorage.setItem('productosAreGeek', contenido);
    });
}

// Exportar JSON
document.getElementById('exportBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify(productosData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aregeek-productos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    mostrarToast('✅ Archivo descargado');
});

// Importar JSON
document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            productosData = JSON.parse(event.target.result);
            if (!Array.isArray(productosData)) {
                productosData = [productosData];
            }
            guardarProductos();
            actualizarVistaProductos();
            actualizarEstadisticas();
            mostrarToast('✅ Productos importados exitosamente');
        } catch (error) {
            mostrarToast('❌ Error al importar JSON');
        }
    };
    reader.readAsText(file);
});

// Restablecer productos demo
document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('¿Restaurar productos de demostración? Esto eliminará todos los productos actuales.')) {
        fetch('products/index.json')
            .then(r => r.json())
            .then(data => {
                productosData = Array.isArray(data) ? data : [data];
                guardarProductos();
                actualizarVistaProductos();
                actualizarEstadisticas();
                mostrarToast('✅ Productos restaurados');
            });
    }
});

// Buscar productos
document.getElementById('searchInput').addEventListener('input', (e) => {
    actualizarVistaProductos(e.target.value);
});

// Cambiar secciones
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.dataset.section;
        mostrarSeccion(section);
    });
});

function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Mostrar sección activa
    document.getElementById(seccion).classList.add('active');
    document.querySelector(`[data-section="${seccion}"]`).classList.add('active');
}

// Toast notifications
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.href = 'index.html';
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        cerrarModal();
    }
});

// Inicializar
window.addEventListener('load', () => {
    cargarProductos();
});

// Estilos para badges
const style = document.createElement('style');
style.innerHTML = `
    .badge {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
    }
    .badge-figuras {
        background: #3498db;
        color: white;
    }
    .badge-peluches {
        background: #e74c3c;
        color: white;
    }
    .badge-accesorios {
        background: #f39c12;
        color: white;
    }
`;
document.head.appendChild(style);