const input = document.getElementById('code-input');
const output = document.getElementById('code-output');
const preview = document.getElementById('live-preview');
const saveBtn = document.getElementById('save-code');

// Sync scrolling
input.addEventListener('scroll', () => {
    output.scrollTop = input.scrollTop;
    output.scrollLeft = input.scrollLeft;
});

// Simple Regex Syntax Highlighter
function updateEditor() {
    let code = input.value;
    updatePreview(code);
    
    // Escape HTML to prevent injection in pre
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Highlight Tags
    code = code.replace(/(&lt;\/?)([a-zA-Z0-9]+)(.*?)(&gt;)/g, (match, p1, p2, p3, p4) => {
        let attrs = p3.replace(/([a-zA-Z\-]+)=(&quot;.*?&quot;|'.*?')/g, '<span class="attr">$1</span>=<span class="string">$2</span>');
        return `${p1}<span class="tag">${p2}</span>${attrs}${p4}`;
    });
    
    output.innerHTML = code;
}

function updatePreview(code) {
    const blob = new Blob([code], {type: 'text/html'});
    preview.src = URL.createObjectURL(blob);
}

input.addEventListener('input', updateEditor);

// Handle Tab key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = input.selectionStart;
        const end = input.selectionEnd;
        input.value = input.value.substring(0, start) + "    " + input.value.substring(end);
        input.selectionStart = input.selectionEnd = start + 4;
        updateEditor();
    }
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('win12Project', input.value);
    saveBtn.innerText = 'Saved!';
    setTimeout(() => saveBtn.innerText = '💾 Save', 2000);
});

// Load saved
const saved = localStorage.getItem('win12Project');
if(saved) input.value = saved;
updateEditor();
