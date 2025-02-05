export default function decorate(block) {
  // Step 1: Get the columns inside the block
  const cols = [...block.firstElementChild.children];
  
  // Step 2: Add a class to the block indicating the number of columns
  block.classList.add(`columns-${cols.length}-cols`);
  
  // Step 3: Iterate through each row in the block
  [...block.children].forEach((row) => {
    // Step 4: Iterate through each column in the row
    [...row.children].forEach((col) => {
      // Step 5: Find the picture element in the column
      const pic = col.querySelector('picture');
      if (pic) {
        // Step 6: Find the closest div containing the picture
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // Step 7: Add a class to the div if it only contains the picture
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}