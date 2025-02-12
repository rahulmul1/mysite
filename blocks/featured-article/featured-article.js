export default function decorateFeaturedArticle(block) {
    // Step 2: Get the direct children inside the block
    const children = [...block.children];
    // Step 3: Add classes to the content and image divs
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
