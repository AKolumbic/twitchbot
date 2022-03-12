export function executeEasterEgg(message: string) {
  if (message.toLowerCase().includes('hi')) {
    return `Hey ${process.env.EASTER_EGG_USER}, thanks for watching. This is a robot btw, not Andrew, he has been....replaced.`
  }
}
