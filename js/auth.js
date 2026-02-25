const form = document.getElementById('auth-form');
const toggleBtn = document.getElementById('toggle-mode');
const title = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const pwdInput = document.getElementById('password');
const strengthMeter = document.querySelector('.strength-meter');
const strengthFill = document.getElementById('strength-fill');
let isLogin = true;

if (!sysState.user && localStorage.getItem('win12FirstRun') === null) {
    isLogin = false; // Force register on first run
    localStorage.setItem('win12FirstRun', 'false');
}

function updateUI() {
    title.innerText = isLogin ? 'Welcome Back' : 'Initialize Account';
    submitBtn.innerText = isLogin ? 'Login' : 'Create Core';
    toggleBtn.innerText = isLogin ? 'Create an account' : 'Already have access?';
    strengthMeter.style.display = isLogin ? 'none' : 'block';
}

toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    updateUI();
});

pwdInput.addEventListener('input', (e) => {
    if(isLogin) return;
    const val = e.target.value;
    let strength = 0;
    if(val.length > 5) strength += 33;
    if(val.match(/[A-Z]/)) strength += 33;
    if(val.match(/[0-9!@#$%^&*]/)) strength += 34;
    strengthFill.style.width = `${strength}%`;
    strengthFill.style.background = strength < 40 ? '#ef4444' : strength < 70 ? '#eab308' : '#22c55e';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = pwdInput.value;

    if (!isLogin) {
        localStorage.setItem('win12User', JSON.stringify({ user, pass }));
        sysState.user = { user, pass };
        successTransition();
    } else {
        if (sysState.user && sysState.user.user === user && sysState.user.pass === pass) {
            successTransition();
        } else {
            document.getElementById('auth-box').style.transform = 'translate(-50%, -50%) translateX(10px)';
            setTimeout(() => document.getElementById('auth-box').style.transform = 'translate(-50%, -50%)', 100);
        }
    }
});

function successTransition() {
    document.body.style.opacity = 0;
    setTimeout(() => window.location.href = 'index.html', 500);
}

updateUI();
