// URL da API Supabase para onde as mensagens serão enviadas
const URL_SUPA = "https://dcofwjpqqjsvzesqpyuc.supabase.co/rest/v1/mensagens";

// Cabeçalhos necessários para a requisição, incluindo a chave da API e o token de autorização
const HEADERS = {
    "Content-Type":"application/json",
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjb2Z3anBxcWpzdnplc3FweXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjc5NzEsImV4cCI6MjAzOTk0Mzk3MX0.KISQ2_J_azg2gjjQ-o0mM3RULkSF-uGv8yy2FULmnJM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjb2Z3anBxcWpzdnplc3FweXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjc5NzEsImV4cCI6MjAzOTk0Mzk3MX0.KISQ2_J_azg2gjjQ-o0mM3RULkSF-uGv8yy2FULmnJM'
}
// Adiciona um evento ao carregar o conteúdo da página
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtém os valores dos campos do formulário
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const cidade = form.cidade.value.trim();
    const mensagem = form.mensagem.value.trim();
    
    // Verifica se todos os campos estão preenchidos
    if (nome && email && telefone && cidade && mensagem) {

      // Envia os dados para o servidor usando fetch
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
          alert('Mensagem enviada com sucesso!'); //alerta de sucesso
          form.reset(); //reseta o formulário
        })
        .catch(error => {
          console.error('Erro:', error); //loga o erro no console
          alert('Ocorreu um erro ao enviar a mensagem.');
        });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
});
  
// Função assíncrona para obter a lista de mensagens
const getLista = async () => {
  try {
    const response = await fetch(URL_SUPA + '?order=id.desc&limit=10', {
        method: 'GET',
        headers: HEADERS       
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`); // Lança um erro se a resposta não for ok
    }
    const json = await response.json(); //converte a reposta para JSON
    adicionaTabela(json); // add dados á tabela

  } catch (error) {
      console.error(error.message);
  }
}

// Função para adicionar os dados à tabela
const adicionaTabela = (data) => {
  const tableBody = document.getElementById('nomes').querySelector('tbody');
  tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

  data.forEach(item => {
    const row = document.createElement('tr');

    const nomeCell = document.createElement('td');
    nomeCell.textContent = item.nome; // Adiciona o nome à célula
    row.appendChild(nomeCell);

    tableBody.appendChild(row); // Adiciona a linha à tabela
  });
}
// Chama a função getLista quando a página é carregada
window.onload = () => {getLista()}