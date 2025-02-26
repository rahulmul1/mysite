export default function transformSocialLinks(block) {
  const originalContainer = block.querySelector('div > div');
  if (!originalContainer) return;

  const newContainer = document.createElement('div');
  newContainer.classList.add('person-social-links');

  const links = originalContainer.querySelectorAll('p');
  links.forEach((link) => {
    const newLink = document.createElement('p');
    newLink.classList.add('person-social-link');
    newLink.innerHTML = link.innerHTML;
    newContainer.appendChild(newLink);
  });

  block.innerHTML = '';
  block.appendChild(newContainer);
}

document.querySelectorAll('.social-links.block').forEach(transformSocialLinks);