export default function decorateFeaturedArticle(block) {
  // Step 2: Get the direct children inside the block
  const children = [...block.children];

  // Step 3: Add classes to the content and image divs
  children.forEach((child) => {
    // Create a container for the person
    const personContainer = document.createElement('div');
    personContainer.classList.add('person');

    // Move the picture and content into the container
    const picture = child.querySelector('picture');
    const name = child.querySelector('div:nth-child(2) p');
    const role = child.querySelector('div:nth-child(3) p');

    if (picture) {
      personContainer.appendChild(picture);
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

    // Append the container to the block
    block.appendChild(personContainer);
  });

  // Remove the original children
  children.forEach((child) => {
    block.removeChild(child);
  });
}