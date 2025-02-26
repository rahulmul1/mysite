import { fetchQueryIndex } from '../../scripts/scripts.js';

export default async function decorateRecentArticles(block) {
  await fetchQueryIndex();
  const articles = window.pageIndex.data;

  const buttonContainer = block.querySelector('.button-container');
  block.textContent = '';

  const articlesContainer = document.createElement('div');
  articlesContainer.classList.add('recent-articles-content');

  articles.forEach((article, index) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('recent-article');
    if (index >= 4 && buttonContainer) {
      articleDiv.style.display = 'none';
    }

    const pictureParent = document.createElement('p');
    pictureParent.classList.add('recent-article-picture');
    const pictureElement = document.createElement('picture');
    const imgElement = document.createElement('img');
    imgElement.src = article.image;
    imgElement.alt = article.title;
    imgElement.loading = 'lazy';
    pictureElement.appendChild(imgElement);
    pictureParent.appendChild(pictureElement);

    const linkContainer = document.createElement('h4');
    linkContainer.classList.add('recent-article-link-container');
    const linkElement = document.createElement('a');
    linkElement.href = article.path;
    linkElement.title = article.title;
    linkElement.textContent = article.title;
    linkContainer.appendChild(linkElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('recent-article-content');
    descriptionElement.textContent = article.description;

    articleDiv.appendChild(pictureParent);
    articleDiv.appendChild(linkContainer);
    articleDiv.appendChild(descriptionElement);

    articlesContainer.appendChild(articleDiv);
  });

  block.appendChild(articlesContainer);

  if (buttonContainer) {
    block.appendChild(buttonContainer);

    const button = buttonContainer.querySelector('a');
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        articlesContainer.querySelectorAll('.recent-article').forEach((article) => {
          article.style.display = 'block';
        });
        buttonContainer.style.display = 'none';
      });
    }
  }
}