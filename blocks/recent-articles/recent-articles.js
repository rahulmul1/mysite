export default function decorateRecentArticles(block) {

  // Step 2: Get the children inside the block
  const children = [...block.children];

  // Step 3: Add classes to the article divs
  children.forEach((child) => {
    const articleDivs = [...child.children];
    articleDivs.forEach((articleDiv) => {
      articleDiv.classList.add('recent-article');

      // Step 4: Add classes to the picture and content elements
      const pictureElement = articleDiv.querySelector('picture');
      if (pictureElement) {
        pictureElement.classList.add('recent-article-picture');
      }

      const buttonContainer = articleDiv.querySelector('.button-container');
      if (buttonContainer) {
        buttonContainer.classList.add('recent-article-button-container');
      }

      const paragraphs = articleDiv.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        if (!paragraph.querySelector('picture')) {
          paragraph.classList.add('recent-article-content');
        }
      });
    });
  });
}
