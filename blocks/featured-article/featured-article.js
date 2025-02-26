export default function decorateFeaturedArticle(block) {
  const children = [...block.children];
  children.forEach((child) => {
    const innerChildren = [...child.children];
    innerChildren.forEach((innerChild) => {
      const pictureElement = innerChild.querySelector('picture');
      if (pictureElement) {
        innerChild.classList.add('featured-article-image');
        pictureElement.classList.add('featured-article-picture');
      } else {
        innerChild.classList.add('featured-article-content');
      }
    });
  });
}
