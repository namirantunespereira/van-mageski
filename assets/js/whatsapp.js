
(() => {
  const btnFloat = document.getElementById('float-whats');
  const phone = '5527999930338';
  function openWhatsWithMessage(message){
    const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener');
  }
  btnFloat?.addEventListener('click', (e)=>{
    e.preventDefault();
    const texto = [
      'Olá! Tudo bem? Vi seu site e quero falar sobre tatuagem.',
      '',
      '[utm_source=site&utm_medium=fab&utm_campaign=whatsapp_float]'
    ].join('
');
    openWhatsWithMessage(texto);
  });
})();
