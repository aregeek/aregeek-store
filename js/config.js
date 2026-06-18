// Configuración por defecto
const DEFAULT_CONFIG = {
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

// Cargar configuración
function cargarConfig() {
    // Intentar cargar desde config.json
    fetch('config/config.json')
        .then(r => r.json())
        .then(data => {
            const config = { ...DEFAULT_CONFIG, ...data };
            guardarConfigLocal(config);
            aplicarConfig(config);
        })
        .catch(() => {
            // Si no existe config.json, cargar desde localStorage
            const configLocal = localStorage.getItem('aregeekConfig');
            if (configLocal) {
                const config = JSON.parse(configLocal);
                aplicarConfig(config);
            } else {
                aplicarConfig(DEFAULT_CONFIG);
                guardarConfigLocal(DEFAULT_CONFIG);
            }
        });
}

// Guardar en localStorage
function guardarConfigLocal(config) {
    localStorage.setItem('aregeekConfig', JSON.stringify(config));
}

// Obtener configuración actual
function obtenerConfig() {
    const configLocal = localStorage.getItem('aregeekConfig');
    return configLocal ? JSON.parse(configLocal) : DEFAULT_CONFIG;
}

// Aplicar configuración a la página
function aplicarConfig(config) {
    // Textos
    document.getElementById('storeName').textContent = config.storeName;
    document.getElementById('storeTagline').textContent = config.storeTagline;
    document.getElementById('heroTitle').textContent = config.heroTitle;
    document.getElementById('heroSubtitle').textContent = config.heroSubtitle;
    document.getElementById('contactText').textContent = config.contactText;
    document.getElementById('footerText').textContent = config.footerText;

    // Logo
    const logoImg = document.getElementById('headerLogo');
    if (config.logo) {
        logoImg.src = config.logo;
    }

    // Hero Banner
    const heroBanner = document.getElementById('heroBanner');
    if (config.heroBanner) {
        heroBanner.src = config.heroBanner;
        heroBanner.style.display = 'block';
    }

    // Colores
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--color-dark', config.colors.dark);

    // Redes sociales
    const socialLinks = document.getElementById('socialLinks');
    if (socialLinks) {
        socialLinks.innerHTML = `
            <a href="${config.social.instagramLink}" target="_blank" class="social-btn instagram">
                Instagram ${config.social.instagram}
            </a>
            <a href="${config.social.facebookLink}" target="_blank" class="social-btn facebook">
                Facebook ${config.social.facebook}
            </a>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', cargarConfig);

// Escuchar cambios de configuración (desde admin)
window.addEventListener('storage', () => {
    const config = obtenerConfig();
    aplicarConfig(config);
});
