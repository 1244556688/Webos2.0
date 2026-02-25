const windowManager = {
    zIndex: 100,
    bringToFront(el) {
        this.zIndex++;
        el.style.zIndex = this.zIndex;
    },
    init() {
        document.querySelectorAll('.window').forEach(win => {
            win.classList.add('opening');
            win.addEventListener('mousedown', () => this.bringToFront(win));
            
            // Close logic
            win.querySelector('.win-btn.close').addEventListener('click', () => {
                win.classList.add('opening');
                setTimeout(() => win.style.display = 'none', 200);
            });

            // Drag logic
            const header = win.querySelector('.win-header');
            let isDragging = false, startX, startY, startLeft, startTop;

            header.addEventListener('mousedown', (e) => {
                isDragging = true;
                win.style.transition = 'none';
                startX = e.clientX; startY = e.clientY;
                startLeft = win.offsetLeft; startTop = win.offsetTop;
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                win.style.left = startLeft + (e.clientX - startX) + 'px';
                win.style.top = startTop + (e.clientY - startY) + 'px';
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    win.style.transition = 'opacity 0.2s, transform 0.2s';
                }
            });

            // Resize logic
            const resize = win.querySelector('.resize-handle');
            if(resize) {
                let isResizing = false, startW, startH;
                resize.addEventListener('mousedown', (e) => {
                    isResizing = true; win.style.transition = 'none';
                    startX = e.clientX; startY = e.clientY;
                    startW = win.offsetWidth; startH = win.offsetHeight;
                    e.stopPropagation();
                });
                document.addEventListener('mousemove', (e) => {
                    if (!isResizing) return;
                    win.style.width = startW + (e.clientX - startX) + 'px';
                    win.style.height = startH + (e.clientY - startY) + 'px';
                });
                document.addEventListener('mouseup', () => isResizing = false);
            }
        });
    }
};
windowManager.init();
