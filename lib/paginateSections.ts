/* eslint-disable @typescript-eslint/no-explicit-any */
export function paginateSections(sections: any[], maxItemsPerPage: number) {
  const pages: any[][] = [];
  let currentPage: any[] = [];
  let currentItemCount = 0;

  sections.forEach((section) => {
    if (section.items.length === 0) return;

    const items = [...section.items]; // Create a mutable copy of items for the current section

    while (items.length > 0) {
      // Calculate how many items of the current section can fit on the current page
      const remainingSpaceOnPage = maxItemsPerPage - currentItemCount;

      if (remainingSpaceOnPage <= 0) {
        // If no space left on current page, move to the next page
        pages.push(currentPage);
        currentPage = [];
        currentItemCount = 0;
        continue; // Re-evaluate space for the current section's items on the new page
      }

      const itemsToSplice = Math.min(items.length, remainingSpaceOnPage);

      if (itemsToSplice > 0) {
        // Add a chunk of items from the current section to the current page
        currentPage.push({ ...section, items: items.splice(0, itemsToSplice) });
        currentItemCount += itemsToSplice;
      }

      // If the current section's items are exhausted or no more space on current page
      if (items.length === 0 || currentItemCount >= maxItemsPerPage) {
        // If current section is done and there's space left on the page, continue to next section
        // If current page is full, push it and reset
        if (currentItemCount >= maxItemsPerPage) {
          pages.push(currentPage);
          currentPage = [];
          currentItemCount = 0;
        }
      }
    }
  });

  // Push any remaining items on the last page
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}
