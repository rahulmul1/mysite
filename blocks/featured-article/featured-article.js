export default function decorateFeaturedArticle(block) {

    // Step 2: Get the children inside the block
    const children = [...block.children];

    // Step 3: Add classes to the content and image divs
    children.forEach((child) => {
        const imageDiv = child.querySelector('div:first-child');
        const contentDiv = child.querySelector('div:last-child');
        if (imageDiv) {
            imageDiv.classList.add('featured-article-image');
        }

        if (contentDiv) {
            contentDiv.classList.add('featured-article-content');
        }

        // Step 4: Find the picture element in the image div and add a class
        const pic = imageDiv.querySelector('picture');
        if (pic) {
            pic.classList.add('featured-article-picture');
        }
    });
}