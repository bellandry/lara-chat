// dateFormatter.js
export function formatDate(date) {
  const now = new Date();
  const inputDate = new Date(date);

  const diffInTime = now - inputDate;
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30); // Approximatif, car tous les mois n'ont pas exactement 30 jours

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  if (diffInDays === 0) {
    return `Aujourd'hui à ${hours}h${minutes}`;
  } else if (diffInDays === 1) {
    return `Hier à ${hours}h${minutes}`;
  } else if (diffInDays < 7) {
    return `Il y a ${diffInDays} jours`;
  } else if (diffInWeeks < 4) { // Moins d'un mois
    return `Il y a ${diffInWeeks} semaines`;
  } else {
    return `Il y a ${diffInMonths} mois`;
  }
}
