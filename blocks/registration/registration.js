export default function decorate(block) {
  const children = [...block.children];

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

  const responseContainer = document.createElement('div');
  responseContainer.classList.add('response-container');
  form.appendChild(responseContainer);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        responseContainer.textContent = `Form submitted successfully: ${JSON.stringify(result, null, 2)}`;
        responseContainer.style.color = 'green';
      } else {
        responseContainer.textContent = `Form submission failed: ${response.statusText}`;
        responseContainer.style.color = 'red';
      }
    } catch (error) {
      responseContainer.textContent = `Form submission error: ${error}`;
      responseContainer.style.color = 'red';
    }
  });

  block.innerHTML = '';
  block.appendChild(form);
}
