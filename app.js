document.addEventListener('DOMContentLoaded', () => {
    // 1. Boot Sequence Logic
    const bootScreen = document.getElementById('boot-screen');
    const osEnv = document.getElementById('os-environment');

    // Simulate system load
    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            osEnv.classList.add('loaded');
        }, 1000); // Wait for fade out
    }, 2500); // 2.5s boot time

    // 2. Draggable Windows Logic (Optimized for 60fps)
    const windows = document.querySelectorAll('.window.draggable');
    let highestZIndex = 100;

    windows.forEach(win => {
        const header = win.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        // Bring to front on click anywhere on window
        win.addEventListener('mousedown', () => {
            win.style.zIndex = ++highestZIndex;
        });

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            win.style.transition = 'none'; // Disable transition for instant follow
            
            // Get exact coordinates
            const rect = win.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = rect.left;
            initialTop = rect.top;
        });

        // Use requestAnimationFrame for buttery smooth movement
        let animationFrameId;
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            cancelAnimationFrame(animationFrameId);
            
            animationFrameId = requestAnimationFrame(() => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                win.style.left = `${initialLeft + dx}px`;
                win.style.top = `${initialTop + dy}px`;
            });
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                // Re-enable transition for opening/closing animations
                win.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });
    });
});

// 3. Window Management Functions
function openWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'flex';
        // Force reflow
        void win.offsetWidth;
        win.classList.remove('hidden');
        win.style.zIndex = ++highestZIndex; // Needs highestZIndex from scope, declared above but accessible if global.
        // Quick fix to make Z-index available globally:
        window.highestZIndex = window.highestZIndex || 100;
        win.style.zIndex = ++window.highestZIndex;
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.add('hidden');
        // Wait for CSS transition before hiding completely
        setTimeout(() => {
            if (win.classList.contains('hidden')) {
                win.style.display = 'none';
            }
        }, 300);
    }
}

function toggleWindow(id) {
    const win = document.getElementById(id);
    if (win.classList.contains('hidden') || win.style.display === 'none') {
        openWindow(id);
    } else {
        closeWindow(id);
    }
}

// 4. Task View / Multi-Desktop Logic
let taskViewActive = false;
function toggleTaskView() {
    const overlay = document.getElementById('task-view-overlay');
    const taskbar = document.getElementById('taskbar');
    taskViewActive = !taskViewActive;
    
    if (taskViewActive) {
        overlay.classList.add('active');
        taskbar.style.transform = 'translateY(100px)'; // Hide taskbar gracefully
    } else {
        overlay.classList.remove('active');
        taskbar.style.transform = 'translateY(0)';
    }
}

// Close task view if clicking on the background
document.getElementById('task-view-overlay').addEventListener('click', (e) => {
    if(e.target.id === 'task-view-overlay') {
        toggleTaskView();
    }
});
