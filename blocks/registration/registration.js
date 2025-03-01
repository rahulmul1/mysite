export default function decorate(block) {
  const children = [...block.children];

  // Create the form element
  const form = document.createElement('form');
  form.classList.add('registration-form');

  children.forEach((child) => {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('form-field');

    const firstDiv = child.querySelector('div:first-child');
    const secondDiv = child.querySelector('div:nth-child(2)');
    let inputElement;

    if (firstDiv) {
      const labelElement = document.createElement('label');
      labelElement.classList.add('form-label');

      const fieldDetails = [...firstDiv.querySelectorAll('p')];
      fieldDetails.forEach((detail) => {
        const text = detail.textContent;
        const [key, value] = text.split('=');

        if (key === 'label') {
          labelElement.textContent = value;
        } else if (key === 'type') {
          inputElement = document.createElement('input');
          inputElement.type = value;
          inputElement.classList.add('form-input');
        } else if (key === 'name') {
          inputElement.name = value;
        }
      });

      fieldContainer.appendChild(labelElement);

      if (inputElement.type === 'checkbox' || inputElement.type === 'select') {
        if (secondDiv) {
          const options = [...secondDiv.querySelectorAll('p')];
          options.forEach((option) => {
            const optionText = option.textContent;
            const [optionLabel, optionValue] = optionText.split(',');

            const checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-checkbox-label');
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.name = inputElement.name;
            checkboxInput.value = optionValue.split('=')[1];
            checkboxInput.classList.add('form-checkbox-input');

            checkboxLabel.textContent = optionLabel.split('=')[1];
            checkboxLabel.prepend(checkboxInput);

            fieldContainer.appendChild(checkboxLabel);
          });
        }
      } else {
        fieldContainer.appendChild(inputElement);
      }
    }
    if (inputElement.type !== 'submit') {
      form.appendChild(fieldContainer);
    }
  });

  // Add the submit button
  const submitButtonContainer = children.find((child) => {
    const firstDiv = child.querySelector('div:first-child');
    const fieldDetails = [...firstDiv.querySelectorAll('p')];
    return fieldDetails.some((detail) => detail.textContent.includes('type=submit'));
  });

  if (submitButtonContainer) {
    const firstDiv = submitButtonContainer.querySelector('div:first-child');
    const fieldDetails = [...firstDiv.querySelectorAll('p')];
    const submitButton = document.createElement('button');
    submitButton.classList.add('form-submit-button');

    fieldDetails.forEach((detail) => {
      const text = detail.textContent;
      const [key, value] = text.split('=');

      if (key === 'label') {
        submitButton.textContent = value;
      } else if (key === 'type') {
        submitButton.type = value;
      }
    });

    form.appendChild(submitButton);
  }

  // Clear the block and append the form
  block.innerHTML = '';
  block.appendChild(form);
}

// Call the function to decorate the registration block
document.querySelectorAll('.registration.block').forEach(decorate);