export default function decorateSocialLinks(block) {
  const children = [...block.querySelectorAll('div > div')];

  children.forEach((child) => {
    const socialLinkContainer = document.createElement('p');
    socialLinkContainer.classList.add('social-link');

    const link = child.querySelector('a');
    if (link) {
      const icon = link.querySelector('.icon img');
      if (icon) {
        const iconName = icon.getAttribute('data-icon-name');
        const iconAlt = icon.getAttribute('alt') || iconName;

        link.classList.add('social-icon', iconName);
        link.title = iconAlt;

        socialLinkContainer.appendChild(link);
        block.appendChild(socialLinkContainer);
      }
    }
  });

  const originalContainer = block.querySelector('div');
  if (originalContainer) {
    block.removeChild(originalContainer);
  }
}