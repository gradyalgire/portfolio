const toggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(theme) {
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
}

function detectInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

const currentTheme = detectInitialTheme();
applyTheme(currentTheme);
toggle.checked = currentTheme === 'dark';

toggle.addEventListener('change', () => {
    const newTheme = toggle.checked ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});