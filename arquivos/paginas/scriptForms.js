document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const cidade = form.cidade.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (nome && email && telefone && cidade && mensagem) {
      // Enviar os dados para o servidor mockado usando fetch
      fetch('http://localhost:3000/contatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          telefone: telefone,
          cidade: cidade,
          mensagem: mensagem
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Sucesso:', data);
          alert('Mensagem enviada com sucesso!');
          form.reset();
        })
        .catch(error => {
          console.error('Erro:', error);
          alert('Ocorreu um erro ao enviar a mensagem.');
        });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
});
