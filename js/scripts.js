/* ============================================
   PORTFOLIO BLOG - JAVASCRIPT SIM A IA FORMATOU ISSO TUDO PRA MIM 
   ELA FOI DANDO IDEIA E EU FUI CLICKANDO EM KEEP MEU DEUS EU ODEIO JAVA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
   Funcionalidades: Dark Mode, Validação de Formulário, Acessibilidade
   ============================================ */

// ============================================
// 1. DARK MODE (MODO NOTURNO)
// ============================================

const darkModeBtn = document.getElementById('darkModeBtn');
const htmlElement = document.documentElement;

// Inicializar dark mode com base na preferência do usuário
function initializeDarkMode() {
    const prefersDark = localStorage.getItem('darkMode') === 'true' ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    if (darkModeBtn) darkModeBtn.textContent = '☀️';
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    if (darkModeBtn) darkModeBtn.textContent = '🌙';
}

function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Event listener para o botão de dark mode
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
}

// ============================================
// 2. ACESSIBILIDADE - AUMENTAR/DIMINUIR FONTE
// ============================================

const fontSizeBtn = document.getElementById('fontSizeBtn');
let currentFontScale = localStorage.getItem('fontScale') ? 
                      parseFloat(localStorage.getItem('fontScale')) : 1;

// Aplicar escala de fonte ao carregar
function applyFontScale() {
    document.documentElement.style.setProperty('--font-size-scale', currentFontScale);
}

function increaseFontSize() {
    if (currentFontScale < 1.5) {
        currentFontScale += 0.1;
        currentFontScale = Math.round(currentFontScale * 10) / 10; // Arredondar para 1 casa decimal
        applyFontScale();
        localStorage.setItem('fontScale', currentFontScale);
        
        // Feedback visual
        showAccessibilityNotification(`Tamanho da fonte: ${Math.round(currentFontScale * 100)}%`);
    }
}

function decreaseFontSize() {
    if (currentFontScale > 0.8) {
        currentFontScale -= 0.1;
        currentFontScale = Math.round(currentFontScale * 10) / 10;
        applyFontScale();
        localStorage.setItem('fontScale', currentFontScale);
        
        // Feedback visual
        showAccessibilityNotification(`Tamanho da fonte: ${Math.round(currentFontScale * 100)}%`);
    }
}

function showAccessibilityNotification(message) {
    // Remover notificação anterior se existir
    const oldNotification = document.querySelector('.accessibility-notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = 'accessibility-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--color-primary);
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 2 segundos
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Event listener para o botão de fonte
// Usar clique ciclo: A+ aumenta, ou implementar toggle
if (fontSizeBtn) {
    let fontState = 0; // 0 = normal, 1 = aumentada
    
    fontSizeBtn.addEventListener('click', () => {
        if (fontState === 0) {
            increaseFontSize();
            fontState = 1;
        } else {
            decreaseFontSize();
            fontState = 0;
        }
    });
}

// ============================================
// 3. VALIDAÇÃO DE FORMULÁRIO DE CONTATO
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Funções de validação
    function validateFullname(fullname) {
        return fullname.trim().length >= 3;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validatePhone(phone) {
        // Validar apenas se preenchido
        if (phone.trim() === '') return true;
        
        const phoneRegex = /^[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.trim());
    }

    function validateSubject(subject) {
        return subject !== '';
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    // Função para mostrar erro
    function showError(fieldName, isError) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (isError) {
            field.classList.add('error');
            errorElement.classList.add('show');
            
            // Mensagens de erro específicas
            switch(fieldName) {
                case 'fullname':
                    errorElement.textContent = 'Nome deve ter pelo menos 3 caracteres';
                    break;
                case 'email':
                    errorElement.textContent = 'Email inválido';
                    break;
                case 'phone':
                    errorElement.textContent = 'Telefone inválido';
                    break;
                case 'subject':
                    errorElement.textContent = 'Selecione um assunto';
                    break;
                case 'message':
                    errorElement.textContent = 'Mensagem deve ter pelo menos 10 caracteres';
                    break;
            }
        } else {
            field.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    // Função para limpar mensagens de formulário
    function clearFormMessage() {
        const formMessage = document.getElementById('formMessage');
        formMessage.classList.remove('success', 'error');
        formMessage.textContent = '';
    }

    // Validação em tempo real (opcional)
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (fullnameInput) {
        fullnameInput.addEventListener('blur', () => {
            showError('fullname', !validateFullname(fullnameInput.value));
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            showError('email', !validateEmail(emailInput.value));
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            showError('phone', !validatePhone(phoneInput.value));
        });
    }

    if (subjectInput) {
        subjectInput.addEventListener('blur', () => {
            showError('subject', !validateSubject(subjectInput.value));
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => {
            showError('message', !validateMessage(messageInput.value));
        });
    }

    // Validação no envio do formulário
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        clearFormMessage();
        
        // Validar todos os campos
        const fullnameValid = validateFullname(fullnameInput.value);
        const emailValid = validateEmail(emailInput.value);
        const phoneValid = validatePhone(phoneInput.value);
        const subjectValid = validateSubject(subjectInput.value);
        const messageValid = validateMessage(messageInput.value);
        
        // Mostrar erros
        showError('fullname', !fullnameValid);
        showError('email', !emailValid);
        showError('phone', !phoneValid);
        showError('subject', !subjectValid);
        showError('message', !messageValid);
        
        // Se tudo válido
        if (fullnameValid && emailValid && phoneValid && subjectValid && messageValid) {
            // Simular envio
            const formMessage = document.getElementById('formMessage');
            formMessage.classList.add('success');
            formMessage.textContent = '✓ Mensagem enviada com sucesso! Obrigada, ' + fullnameInput.value + '!';
            
            // Limpar formulário
            contactForm.reset();
            
            // Limpar mensagem após 5 segundos
            setTimeout(() => {
                clearFormMessage();
            }, 5000);
        } else {
            const formMessage = document.getElementById('formMessage');
            formMessage.classList.add('error');
            formMessage.textContent = '✗ Por favor, preencha todos os campos corretamente.';
        }
    });
}

// ============================================
// 4. MELHORIAS DE UX - SMOOTH SCROLL E OUTROS
// ============================================

// Atualizar link ativo na navegação baseado na página atual
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 5. INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar dark mode
    initializeDarkMode();
    
    // Aplicar escala de fonte salva
    applyFontScale();
    
    // Atualizar links ativos
    updateActiveNavLink();
});

// Respeitar preferências do sistema (dark mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
});
