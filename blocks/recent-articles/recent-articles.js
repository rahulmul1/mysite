import { fetchQueryIndex } from '../../scripts/scripts.js';

export default async function decorateRecentArticles(block) {
  // Fetch articles from query-index.json
  await fetchQueryIndex();
  const articles = window.pageIndex.data;

  // Clear the block content
  block.textContent = '';

  // Create a container for the articles
  const articlesContainer = document.createElement('div');
  articlesContainer.classList.add('recent-articles-content');

  // Create and append articles to the container
  articles.forEach((article) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('recent-article');

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
}