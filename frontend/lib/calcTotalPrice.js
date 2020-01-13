export default function calcTotalPrice(favorites) {
  return favorites.reduce((tally, favorite) => {
    if (!favorite.charity) return tally;
    return tally + favorite.amount;
  }, 0);
}
