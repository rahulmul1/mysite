export default function decorate(block) {
  // Step 2: Get the direct children inside the block
  const children = [...block.children];

  // Step 3: Add classes to the content and image divs
  children.forEach((child) => {
    // Create a container for the person
    const personContainer = document.createElement('div');
    personContainer.classList.add('person');

    // Move the picture and content into the container
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

    // Append the container to the block
    block.appendChild(personContainer);
  });

  // Remove the original children
  children.forEach((child) => {
    block.removeChild(child);
  });
}

