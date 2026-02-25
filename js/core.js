// Core Utilities and State
const sysState = {
    theme: localStorage.getItem('win12Theme') || 'dark',
    user: JSON.parse(localStorage.getItem('win12User')) || null
};

function setTheme(theme) {
    sysState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('win12Theme', theme);
}

// Initialize Theme
setTheme(sysState.theme);

// Prevent default drag behaviors natively
document.addEventListener('dragstart', e => e.preventDefault());
