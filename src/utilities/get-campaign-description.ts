export function getCampaignDescription(): string {
  const day = new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(new Date());

  switch (day) {
    case 'Tuesday':
      return `Tonight we're playing Carry the Knowledge, a D&D 5e campaign set in Viridium's Greatest City, Gildenberg!`;
    case 'Wednesday':
      return `Tonight we're playing A Clash of Two Fates, a D&D 5e campaign set in Viridium's brutal outlander continent, Siccrum.`;
    case 'Sunday':
      return `Tonight we're playing The Sea of Sorrows, a D&D 5e campaign set in a mythical sea where danger lurks over the horizon...`;
    default:
      return `You caught me on the rare occasion where I'm not streaming D&D lol`;
  }
}
