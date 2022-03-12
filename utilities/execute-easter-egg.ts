export function executeEasterEgg(easterEggUser: string, message: string) {
  if (message.toLowerCase().includes('hi')) {
    return `Hey ${easterEggUser}, thanks for watching. This is a robot btw, not Andrew, he has been....replaced.`
  }
}
