export function formatDate(dateString) {
  return new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateString));
}

export function formatPercentage(value) {
  return `${value}%`;
}
