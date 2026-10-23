export const ARCHIVE_PAGE_SIZE = 6;
export const wrapIndex = (index: number, count: number) => count > 0 ? ((index % count) + count) % count : 0;
export function carouselWindow(count: number, index: number) {
 if (!count) return [];
 const offsets = count === 1 ? [0] : count < 5 ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
 return offsets.map(offset => ({ offset, index: wrapIndex(index + offset, count) }));
}
