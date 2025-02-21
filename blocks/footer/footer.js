import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  console.log('Starting to decorate footer');

  // load footer as fragment
  const footerMeta = getMetadata('footer');
  console.log('Footer metadata:', footerMeta);

  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  console.log('Footer path:', footerPath);

  const fragment = await loadFragment(footerPath);
  console.log('Loaded fragment:', fragment);

  // decorate footer DOM
  block.textContent = '';
  while (fragment.firstElementChild) {
    const child = fragment.firstElementChild;
    console.log('Processing child:', child);

    if (block.children.length === 0) {
      child.classList.add('footer-nav-section');
      const navWrapper = child.querySelector('div');
      if (navWrapper) {
        navWrapper.classList.add('footer-nav-wrapper');
        console.log('Added class "footer-nav-wrapper" to div element');
      }

      // Add useful classes
      const ulElement = child.querySelector('ul');
      if (ulElement) {
        ulElement.classList.add('footer-nav');
        console.log('Added class "footer-nav" to ul element');
      }

      const pElement = child.querySelector('p');
      if (pElement) {
        const parent = pElement.parentNode;
        while (pElement.firstChild) {
          parent.insertBefore(pElement.firstChild, pElement);
        }
        parent.removeChild(pElement);
        console.log('Removed p element but kept its content');
      }

      const socialPElement = child.querySelector('p');
      if (socialPElement) {
        socialPElement.classList.add('footer-social');
        console.log('Added class "footer-social" to p element');

        // Create a div for social icons
        const socialIconsDiv = document.createElement('div');
        socialIconsDiv.classList.add('social-icons');

        // Move social icons into the new div
        const icons = socialPElement.querySelectorAll('.icon');
        icons.forEach((icon) => {
          socialIconsDiv.appendChild(icon);
        });

        // Append the new div to the social paragraph
        socialPElement.appendChild(socialIconsDiv);
        console.log('Moved social icons into a new div');
      }

      // Remove button class from logo
      const logoLink = child.querySelector('.button');
      if (logoLink) {
        logoLink.classList.remove('button');
        logoLink.classList.add('footer-logo');
        console.log('Updated logo link classes');
      }
    } else if (block.children.length === 1) {
      child.classList.add('footer-copywrite-section');
    }

    block.append(child);
    console.log('Appended child to block');
  }

  console.log('Finished decorating footer');
}