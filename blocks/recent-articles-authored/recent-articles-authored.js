export default function decorateRecentArticles(block) {
  const children = [...block.children];

  children.forEach((child) => {
    child.classList.add('recent-articles-authored-content');
    
    const articleDivs = [...child.children];
    articleDivs.forEach((articleDiv) => {
      if (child.classList.contains('recent-articles-authored-content')) {
        articleDiv.classList.add('recent-article-authored');
      }

      const pictureElement = articleDiv.querySelector('picture');
      if (pictureElement) {
        const pictureParent = pictureElement.closest('p');
        if (pictureParent) {
          pictureParent.classList.add('recent-article-authored-picture');
        }
      }

      const linkContainer = articleDiv.querySelector('h4');
      if (linkContainer) {
        linkContainer.classList.add('recent-article-authored-link-container');
      }

      const paragraphs = articleDiv.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        if (!paragraph.querySelector('picture') && !paragraph.querySelector('a')) {
          paragraph.classList.add('recent-article-authored-content');
        }
      });
    });
  });
}
