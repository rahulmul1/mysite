export default function decorateSocialLinks(block) {
  // Step 2: Get the direct children inside the block
  const children = [...block.querySelectorAll('div > div')];

  // Step 3: Add classes to the content and image divs
  children.forEach((child) => {
    // Create a container for the social link
    const socialLinkContainer = document.createElement('p');
    socialLinkContainer.classList.add('social-link');

    // Move the link into the container
    const link = child.querySelector('a');
    if (link) {
      const icon = link.querySelector('.icon img');
      if (icon) {
        const iconName = icon.getAttribute('data-icon-name');
        const iconAlt = icon.getAttribute('alt') || iconName;

        // Add appropriate classes to the link
        link.classList.add('social-icon', iconName);
        link.title = iconAlt;

        // Append the link to the container
        socialLinkContainer.appendChild(link);

        // Append the container to the block
        block.appendChild(socialLinkContainer);
      }
    }
  });

  // Remove the original children
  const originalContainer = block.querySelector('div');
  if (originalContainer) {
    block.removeChild(originalContainer);
  }
}