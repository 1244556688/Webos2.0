// Clock
const clockEl = document.getElementById('system-clock');
setInterval(() => {
    const d = new Date();
    clockEl.innerText = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);

// Parallax Wallpaper
const bg = document.body;
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bg.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
});

// Taskbar bindings
document.querySelectorAll('.tb-icon[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-open');
        const win = document.getElementById(targetId);
        if(win) {
            win.style.display = 'flex';
            setTimeout(() => win.classList.remove('opening'), 10);
            windowManager.bringToFront(win);
        }
    });
});
