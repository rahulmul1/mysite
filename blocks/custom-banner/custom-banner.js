export default function decorateBanner(block) {
  // Add the 'banner-title' class to the first div inside the block
  const titleDiv = block.children[0];
  if (titleDiv) {
    titleDiv.classList.add('banner-title');
  }

  // Add the 'banner-image' class to the second div inside the block
  const imageDiv = block.children[1];
  if (imageDiv) {
    imageDiv.classList.add('banner-image');
  }
}
