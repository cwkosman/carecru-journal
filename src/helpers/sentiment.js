export function calculateSentimentScore(entryHappiness, entryBody) {
  const words = entryBody.split(' ').length;
  return entryHappiness * words;
}
