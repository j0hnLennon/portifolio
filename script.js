// ==========================================
// 1. NAVEGAÇÃO E HEADER STICKY
// ==========================================
const header = document.querySelector("header");
const menu = document.querySelector('#menu-icon');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Unificando todos os comportamentos do Scroll em um único evento
window.addEventListener("scroll", () => {
    // Adiciona classe sticky ao cabeçalho ao rolar
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 120);
    }
    
    // Fecha o menu mobile ao rolar a página
    if (menu && navList) {
        menu.classList.remove('bx-x');
        navList.classList.remove('active');
    }
});

// Alterna o menu mobile ao clicar no ícone do hambúrguer
if (menu && navList) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navList.classList.toggle('active');
    };
}

// Fecha o menu mobile ao clicar em QUALQUER link da navegação
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu && navList) {
            menu.classList.remove('bx-x');
            navList.classList.remove('active');
        }
    });
});


// ==========================================
// 2. ENVIO DO FORMULÁRIO DE CONTATO (AJAX)
// ==========================================
const form = document.getElementById("meu-formulario");
const status = document.getElementById("status-envio");
const btn = document.getElementById("btn-enviar");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página
        
        const data = new FormData(event.target);
        
        // Desabilita o botão enquanto envia
        if (btn) {
            btn.disabled = true;
            btn.innerText = "Enviando...";
        }
        if (status) {
            status.innerHTML = "";
        }

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Mensagem de Sucesso
                if (status) {
                    status.style.color = "#22c55e"; // Cor verde viva
                    status.innerHTML = "✅ Mensagem enviada com sucesso! Em breve entrarei em contato.";
                }
                form.reset(); // Limpa os campos do formulário
            } else {
                // Mensagem de Erro do Servidor
                const responseData = await response.json();
                if (status) {
                    status.style.color = "#ef4444"; // Cor vermelha
                    if (Object.hasOwn(responseData, 'errors')) {
                        status.innerHTML = "❌ " + responseData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "❌ Ocorreu um erro ao enviar. Tente novamente mais tarde.";
                    }
                }
            }
        } catch (error) {
            // Erro de Conexão/Rede
            if (status) {
                status.style.color = "#ef4444";
                status.innerHTML = "❌ Erro de conexão. Verifique sua internet e tente novamente.";
            }
        } finally {
            // Reativa o botão
            if (btn) {
                btn.disabled = false;
                btn.innerText = "Enviar Mensagem";
            }
        }
    }

    form.addEventListener("submit", handleSubmit);
}
