export function determineCampaign(): string {
  const today = new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(new Date());

  switch (today) {
    case 'Monday':
      return '';
    case 'Tuesday':
      return 'Tonight';
    case 'Wednesday':
      return '';
    case 'Thursday':
      return '';
    case 'Friday':
      return '';
    case 'Saturday':
      return '';
    case 'Sunday':
      return '';
  }
}