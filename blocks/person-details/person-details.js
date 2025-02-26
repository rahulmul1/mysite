export default function decorate(block) {
  const children = [...block.children];

  children.forEach((child) => {
    const personContainer = document.createElement('div');
    personContainer.classList.add('person');

    const picture = child.querySelector('picture');
    const name = child.querySelector('h4');
    const role = child.querySelector('h5');
    const socialLinks = child.querySelectorAll('p');

    if (picture) {
      const pictureContainer = document.createElement('div');
      pictureContainer.classList.add('person-picture-container');
      pictureContainer.appendChild(picture);
      personContainer.appendChild(pictureContainer);
    }
    if (name) {
      const nameElement = document.createElement('p');
      nameElement.classList.add('name');
      nameElement.textContent = name.textContent;
      personContainer.appendChild(nameElement);
    }
    if (role) {
      const roleElement = document.createElement('p');
      roleElement.classList.add('role');
      roleElement.textContent = role.textContent;
      personContainer.appendChild(roleElement);
    }
    if (socialLinks.length > 0) {
      const socialLinksContainer = document.createElement('div');
      socialLinksContainer.classList.add('person-social-links');
      socialLinks.forEach((link) => {
        const socialLink = document.createElement('p');
        socialLink.classList.add('person-social-link');
        socialLink.innerHTML = link.innerHTML;
        socialLinksContainer.appendChild(socialLink);
      });
      personContainer.appendChild(socialLinksContainer);
    }

    block.appendChild(personContainer);
  });

  children.forEach((child) => {
    block.removeChild(child);
  });
}

