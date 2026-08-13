

const header  = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle ("sticky", window.scrollY > 120)
});

let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.nav-list');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('active')
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navList.classList.remove('active')
}





const form = document.getElementById("meu-formulario");
  const status = document.getElementById("status-envio");
  const btn = document.getElementById("btn-enviar");

  async function handleSubmit(event) {
    event.preventDefault(); // recarregar a pagina
    
    const data = new FormData(event.target);
    
    //Botão
    btn.disabled = true;
    btn.innerText = "Enviando...";
    status.innerHTML = "";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // MENSAGEM DE SUCESSO
        status.style.color = "green";
        status.innerHTML = "✅ Mensagem enviada com sucesso! Em breve entrarei em contato.";
        form.reset(); // Limpa 
      } else {
        // MENSAGEM DE ERRO (se o Formspree responder com erro)
        const responseData = await response.json();
        status.style.color = "red";
        if (Object.hasOwn(responseData, 'errors')) {
          status.innerHTML = "❌ " + responseData["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "❌ Ocorreu um erro ao enviar. Tente novamente mais tarde.";
        }
      }
    } catch (error) {
      // MENSAGEM DE ERRO (problema de conexão/rede)
      status.style.color = "red";
      status.innerHTML = "❌ Erro de conexão. Verifique sua internet e tente novamente.";
    } finally {
      // Reativa o botão
      btn.disabled = false;
      btn.innerText = "Enviar Mensagem";
    }
  }

  form.addEventListener("submit", handleSubmit);