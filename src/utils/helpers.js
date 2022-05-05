/**
 * @description Simpler average calculation
 * @param items
 * @returns {number}
 */
export const average = (items) => Math.round(items.reduce((acc, { rating }) => acc + Number(rating), 0) / items.length)