// Configuración por defecto para personalización
const DEFAULT_PERSONALIZATION = {
    storeName: 'AreGeek',
    storeTagline: 'Coleccionables',
    heroTitle: '🐧 Bienvenido a AreGeek Coleccionables',
    heroSubtitle: 'Descubre nuestra colección de figuras, peluches y coleccionables únicos',
    contactText: '¿Tienes preguntas? Contáctanos por nuestras redes sociales',
    footerText: '© 2026 AreGeek Coleccionables. Todos los derechos reservados.',
    logo: 'images/logo.png',
    heroBanner: '',
    colors: {
        primary: '#1b7a3a',
        secondary: '#e74c3c',
        accent: '#f39c12',
        dark: '#2c3e50'
    },
    social: {
        instagram: '@aregeek',
        instagramLink: 'https://instagram.com/aregeek',
        facebook: 'AreGeek Coleccionables',
        facebookLink: 'https://facebook.com/aregeek'
    }
};

// Cargar configuración de personalización
function cargarPersonalizacion() {
    const config = localStorage.getItem('aregeekConfig');
    return config ? JSON.parse(config) : DEFAULT_PERSONALIZATION;
}

// Guardar configuración de personalización
function guardarPersonalizacion(config) {
    localStorage.setItem('aregeekConfig', JSON.stringify(config));
    // Notificar a otras pestañas
    window.dispatchEvent(new Event('storage'));
}

// Actualizar form con configuración actual
function actualizarFormPersonalizacion() {
    const config = cargarPersonalizacion();
    
    document.getElementById('storeName').value = config.storeName;
    document.getElementById('storeTagline').value = config.storeTagline;
    document.getElementById('heroTitle').value = config.heroTitle;
    document.getElementById('heroSubtitle').value = config.heroSubtitle;
    document.getElementById('contactText').value = config.contactText;
    document.getElementById('footerText').value = config.footerText;
    document.getElementById('logoUrl').value = config.logo;
    document.getElementById('heroBannerUrl').value = config.heroBanner || '';
    document.getElementById('colorPrimary').value = config.colors.primary;
    document.getElementById('colorSecondary').value = config.colors.secondary;
    document.getElementById('colorAccent').value = config.colors.accent;
    document.getElementById('colorDark').value = config.colors.dark;
    document.getElementById('instagramUser').value = config.social.instagram;
    document.getElementById('instagramLink').value = config.social.instagramLink;
    document.getElementById('facebookPage').value = config.social.facebook;
    document.getElementById('facebookLink').value = config.social.facebookLink;

    actualizarPreview();
}

// Actualizar preview
function actualizarPreview() {
    const config = cargarPersonalizacion();
    
    document.getElementById('previewName').textContent = config.storeName;
    document.getElementById('previewTagline').textContent = config.storeTagline;
    document.getElementById('previewLogo').src = config.logo;
    
    document.getElementById('previewPrimary').style.backgroundColor = config.colors.primary;
    document.getElementById('previewSecondary').style.backgroundColor = config.colors.secondary;
    document.getElementById('previewAccent').style.backgroundColor = config.colors.accent;

    document.getElementById('colorPrimaryValue').textContent = config.colors.primary;
    document.getElementById('colorSecondaryValue').textContent = config.colors.secondary;
    document.getElementById('colorAccentValue').textContent = config.colors.accent;
    document.getElementById('colorDarkValue').textContent = config.colors.dark;
}

// Guardar personalización
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPersonalizacion');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const config = {
            storeName: document.getElementById('storeName').value,
            storeTagline: document.getElementById('storeTagline').value,
            heroTitle: document.getElementById('heroTitle').value,
            heroSubtitle: document.getElementById('heroSubtitle').value,
            contactText: document.getElementById('contactText').value,
            footerText: document.getElementById('footerText').value,
            logo: document.getElementById('logoUrl').value,
            heroBanner: document.getElementById('heroBannerUrl').value,
            colors: {
                primary: document.getElementById('colorPrimary').value,
                secondary: document.getElementById('colorSecondary').value,
                accent: document.getElementById('colorAccent').value,
                dark: document.getElementById('colorDark').value
            },
            social: {
                instagram: document.getElementById('instagramUser').value,
                instagramLink: document.getElementById('instagramLink').value,
                facebook: document.getElementById('facebookPage').value,
                facebookLink: document.getElementById('facebookLink').value
            }
        };

        guardarPersonalizacion(config);
        actualizarPreview();
        mostrarToast('✅ Configuración guardada exitosamente');
    });

    // Actualizar preview en tiempo real
    const inputsColor = document.querySelectorAll('input[type="color"]');
    inputsColor.forEach(input => {
        input.addEventListener('input', actualizarPreview);
    });

    const inputsTexto = document.querySelectorAll('input[type="text"]');
    inputsTexto.forEach(input => {
        input.addEventListener('input', actualizarPreview);
    });

    // Cargar datos iniciales
    actualizarFormPersonalizacion();
});

function restaurarDefaults() {
    if (confirm('¿Restaurar configuración a valores por defecto?')) {
        guardarPersonalizacion(DEFAULT_PERSONALIZATION);
        actualizarFormPersonalizacion();
        mostrarToast('✅ Configuración restaurada');
    }
}

// Exportar configuración
if (document.getElementById('exportConfigBtn')) {
    document.getElementById('exportConfigBtn').addEventListener('click', () => {
        const config = cargarPersonalizacion();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aregeek-config-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        mostrarToast('✅ Configuración descargada');
    });
}
