const URL_SUPA = "https://dcofwjpqqjsvzesqpyuc.supabase.co/rest/v1/mensagens";
const HEADERS = {
    "Content-Type":"application/json",
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjb2Z3anBxcWpzdnplc3FweXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjc5NzEsImV4cCI6MjAzOTk0Mzk3MX0.KISQ2_J_azg2gjjQ-o0mM3RULkSF-uGv8yy2FULmnJM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjb2Z3anBxcWpzdnplc3FweXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjc5NzEsImV4cCI6MjAzOTk0Mzk3MX0.KISQ2_J_azg2gjjQ-o0mM3RULkSF-uGv8yy2FULmnJM'
}
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const cidade = form.cidade.value.trim();
    const mensagem = form.mensagem.value.trim();

    const get = async () => {
      try {
        const response = await fetch(URL_SUPA + '?order=id.desc&limit=10', {
            method: 'GET',
            headers: HEADERS       
          }
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        adicionaTabela(json);
    
      } catch (error) {
          console.error(error.message);
      }
    }

    if (nome && email && telefone && cidade && mensagem) {
      // Enviar os dados para o servidor mockado usando fetch
      fetch(URL_SUPA, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          nome: nome,
          email: email,
          telefone: telefone,
          cidade: cidade,
          mensagens: mensagem
        })
      })

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
