export function determineCampaign(): any {
  const today = new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(new Date());

  switch (today) {
    case 'Monday':
      return '';
    case 'Tuesday':
      return 'Carry the Knowledge';
    case 'Wednesday':
      return 'A Clash of Two Fates';
    case 'Thursday':
      return '';
    case 'Friday':
      return '';
    case 'Saturday':
      return '';
    case 'Sunday':
      return 'The Sea of Sorrows';
  }
}