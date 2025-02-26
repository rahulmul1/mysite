export default function decorateBanner(block) {
  const titleDiv = block.children[0];
  if (titleDiv) {
    titleDiv.classList.add('banner-title');
  }

  const imageDiv = block.children[1];
  if (imageDiv) {
    imageDiv.classList.add('banner-image');
  }
}
