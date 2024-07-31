/**
 * Format a number with commas as thousand separators.
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number with commas.
 */
export function formatBalance(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const capitalizeUsername = (username) => {
  return username
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
