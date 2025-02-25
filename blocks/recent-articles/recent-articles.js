import { fetchQueryIndex } from '../../scripts/scripts.js';

export default async function decorateRecentArticles(block) {
  // Fetch articles from query-index.json
  await fetchQueryIndex();
  const articles = window.pageIndex.data;

  // Clear the block content except for the button container
  const buttonContainer = block.querySelector('.button-container');
  block.textContent = '';

  // Create a container for the articles
  const articlesContainer = document.createElement('div');
  articlesContainer.classList.add('recent-articles-content');

  // Create and append articles to the container
  articles.forEach((article, index) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('recent-article');
    if (index >= 4) {
      articleDiv.style.display = 'none'; // Hide articles beyond the first four
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

  // Append the container to the block
  block.appendChild(articlesContainer);

  // Append the button container below the first row of articles
  if (buttonContainer) {
    block.appendChild(buttonContainer);
  }

  // Handle the button click event to show all articles
  if (buttonContainer) {
    const button = buttonContainer.querySelector('a');
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        // Show all hidden articles
        articlesContainer.querySelectorAll('.recent-article').forEach((article) => {
          article.style.display = 'block';
        });
        // Hide the button after clicking
        buttonContainer.style.display = 'none';
      });
    }
  }
}