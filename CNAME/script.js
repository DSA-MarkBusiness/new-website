  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  // ===== WhatsApp =====
  // Troque pelo número real da empresa, no formato 55 + DDD + número (só dígitos).
  const WHATSAPP_NUMBER = '5519998181396';

  function abrirWhatsApp(mensagem) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    return window.open(url, '_blank');
  }

  // Botão "Falar no WhatsApp" do rodapé
  const footerWhatsBtn = document.getElementById('whatsappFooterBtn');
  if (footerWhatsBtn) {
    footerWhatsBtn.addEventListener('click', () => {
      abrirWhatsApp('Olá! Vim pelo site e quero saber mais sobre a MarkBusiness.');
    });
  }

  // Formulário de diagnóstico gratuito -> abre o WhatsApp com os dados preenchidos
  document.getElementById('diagForm').addEventListener('submit', function(e){
    e.preventDefault();
    const form = this;
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.getElementById('formMsg');
    const original = btn.innerHTML;

    const nome = form.nome.value.trim();
    const empresa = form.empresa.value.trim();
    const instagram = form.instagram.value.trim();
    const whatsapp = form.whatsapp.value.trim();

    const mensagem =
      `Olá! Quero meu diagnóstico de marca gratuito \n\n` +
      `Nome: ${nome}\n` +
      `Empresa: ${empresa}\n` +
      `Instagram: ${instagram || 'não informado'}\n` +
      `Meu WhatsApp: ${whatsapp}`;

    const janela = abrirWhatsApp(mensagem);

    if (janela) {
      btn.innerHTML = 'Abrindo WhatsApp...';
      msg.textContent = '';
      form.reset();
      setTimeout(() => { btn.innerHTML = original; }, 3000);
    } else {
      // Pop-up bloqueado pelo navegador
      msg.textContent = 'Seu navegador bloqueou a abertura. Permita pop-ups e tente novamente.';
    }
  });
