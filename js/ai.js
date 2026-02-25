const aiToggle = document.querySelector('.ai-toggle');
const aiPanel = document.getElementById('ai-panel');
const cpuBar = document.getElementById('cpu-bar');
const ramBar = document.getElementById('ram-bar');
const chatInput = document.getElementById('ai-input');
const chatArea = document.getElementById('ai-chat');

// Toggle Panel
aiToggle.addEventListener('click', () => {
    aiPanel.classList.toggle('active');
});

// Fake System Metrics Loop
function updateMetrics() {
    if(aiPanel.classList.contains('active')) {
        cpuBar.style.width = Math.floor(Math.random() * 60 + 20) + '%';
        ramBar.style.width = Math.floor(Math.random() * 30 + 50) + '%';
    }
    setTimeout(updateMetrics, 2000);
}
updateMetrics();

// AI Chat Interaction
chatInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && chatInput.value.trim() !== '') {
        const val = chatInput.value;
        appendMsg(val, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            const replies = ["Core optimized.", "I've analyzed your workflow.", "System running at optimal parameters."];
            appendMsg(replies[Math.floor(Math.random() * replies.length)], 'ai');
        }, 800);
    }
});

function appendMsg(txt, sender) {
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerText = txt;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Initial AI greeting
setTimeout(() => appendMsg("System online. How can I assist you today?", 'ai'), 500);
