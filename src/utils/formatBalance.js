export function formatBalance(balance) {
  return balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatBalanceShort(balance) {
  if (balance >= 1000000) {
    return `${(balance / 1000000).toFixed(1)}M`;
  } else if (balance >= 1000) {
    return `${(balance / 1000).toFixed(1)}K`;
  } else {
    return balance?.toString();
  }
}
