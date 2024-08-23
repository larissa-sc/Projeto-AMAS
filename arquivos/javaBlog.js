// Adiciona um evento que será executado quando o conteúdo do DOM for completamente carregado
document.addEventListener('DOMContentLoaded', () => {
     // Obtém o formulário com o ID 'newNewsForm'
    const form = document.getElementById('newNewsForm');
     // Obtém o elemento div onde as notícias serão adicionadas
    const newsDiv = document.getElementById('news');

    // Adiciona um evento de submissão ao formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão de submissão do formulário

           // Obtém os valores dos campos do formulário
        const title = document.getElementById('newsTitle').value;
        const link = document.getElementById('newsLink').value;
        const image = document.getElementById('newsImage').value;

         // Verifica se todos os campos estão preenchidos
        if (title && link && image) {
            // Cria um novo elemento div para a notícia
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item'); // Adiciona a classe 'news-item' ao div

             // Cria um novo elemento de link
            const newsLink = document.createElement('a');
            newsLink.href = link; //define href do link
            newsLink.target = '_blank';

            const newsImage = document.createElement('img');
            newsImage.src = image;
            newsImage.alt = title;

            const newsTitle = document.createElement('h4');
            newsTitle.textContent = title;

            // Adiciona a imagem e o título ao link
            newsLink.appendChild(newsImage);
            newsLink.appendChild(newsTitle);
            newsItem.appendChild(newsLink);
            newsDiv.appendChild(newsItem);

            form.reset();
        }
    });
});