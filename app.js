// --- 1. SIMULACIÓN DE SERVIDOR (PROMISE) ---
function fakeRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
    });
}

// --- 2. MANEJO DE LOCALSTORAGE ---
const getLocalUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveLocalUser = (user) => {
    const users = getLocalUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

// --- 3. FUNCIONES AUXILIARES DE VALIDACIÓN ---
const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePasswordFormat = (password) => {
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasNumber;
};

const isOver18 = (dobString) => {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age >= 18;
};

const clearErrors = (formType) => {
    document.querySelectorAll(`[id^="error-${formType}"]`).forEach(el => el.textContent = "");
};

// --- 4. PROCESO DE REGISTRO ---
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors('reg');

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const dob = document.getElementById('reg-dob').value;
    const terms = document.getElementById('reg-terms').checked;
    const btnRegister = document.getElementById('btn-register');

    let hasErrors = false;

    if (!name) { document.getElementById('error-reg-name').textContent = "El nombre es obligatorio."; hasErrors = true; }
    
    if (!email) { 
        document.getElementById('error-reg-email').textContent = "El email es obligatorio."; 
        hasErrors = true; 
    } else if (!validateEmailFormat(email)) {
        document.getElementById('error-reg-email').textContent = "Formato de email inválido."; 
        hasErrors = true;
    }

    if (!password) { 
        document.getElementById('error-reg-password').textContent = "La contraseña es obligatoria."; 
        hasErrors = true; 
    } else if (!validatePasswordFormat(password)) {
        document.getElementById('error-reg-password').textContent = "Debe tener mínimo 8 caracteres y un número."; 
        hasErrors = true;
    }

    if (!confirm) { 
        document.getElementById('error-reg-confirm').textContent = "Debe confirmar la contraseña."; 
        hasErrors = true; 
    } else if (password !== confirm) {
        document.getElementById('error-reg-confirm').textContent = "Las contraseñas no coinciden."; 
        hasErrors = true;
    }

    if (!dob) { 
        document.getElementById('error-reg-dob').textContent = "La fecha de nacimiento es obligatoria."; 
        hasErrors = true; 
    } else if (!isOver18(dob)) {
        document.getElementById('error-reg-dob').textContent = "Debes ser mayor de 18 años."; 
        hasErrors = true;
    }

    if (!terms) { document.getElementById('error-reg-terms').textContent = "Debes aceptar los términos."; hasErrors = true; }

    if (hasErrors) return;

    const users = getLocalUsers();
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        document.getElementById('error-reg-email').textContent = "Este email ya se encuentra registrado.";
        return;
    }

    try {
        btnRegister.textContent = "Cargando...";
        btnRegister.disabled = true;
        
        const userData = { name, email, password, dob };
        const response = await fakeRequest(userData);

        saveLocalUser(response);

        btnRegister.textContent = "¡Registro Exitoso!";
        document.getElementById('register-form').reset();
        
        setTimeout(() => {
            btnRegister.textContent = "Registrarse";
            btnRegister.disabled = false;
        }, 2000);

    } catch (err) {
        btnRegister.textContent = "Error al registrar";
        btnRegister.disabled = false;
    }
});

// --- 5. PROCESO DE LOGIN ---
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors('log');

    const email = document.getElementById('log-email').value.trim();
    const password = document.getElementById('log-password').value;
    const btnLogin = document.getElementById('btn-login');

    let hasErrors = false;

    if (!email) { document.getElementById('error-log-email').textContent = "El email es obligatorio."; hasErrors = true; }
    if (!password) { document.getElementById('error-log-password').textContent = "La contraseña es obligatoria."; hasErrors = true; }

    if (hasErrors) return;

    try {
        btnLogin.textContent = "Cargando...";
        btnLogin.disabled = true;

        const credentials = { email, password };
        const response = await fakeRequest(credentials);

        const users = getLocalUsers();
        const foundUser = users.find(u => u.email.toLowerCase() === response.email.toLowerCase());

        if (!foundUser) {
            document.getElementById('error-log-email').textContent = "El usuario no existe.";
            btnLogin.textContent = "Ingresar";
            btnLogin.disabled = false;
            return;
        }

        if (foundUser.password !== response.password) {
            document.getElementById('error-log-password').textContent = "Contraseña incorrecta.";
            btnLogin.textContent = "Ingresar";
            btnLogin.disabled = false;
            return;
        }

        btnLogin.textContent = `¡Bienvenido ${foundUser.name}!`;
        document.getElementById('login-form').reset();
        
        setTimeout(() => {
            btnLogin.textContent = "Ingresar";
            btnLogin.disabled = false;
        }, 2000);

    } catch (err) {
        btnLogin.textContent = "Error al ingresar";
        btnLogin.disabled = false;
    }
});