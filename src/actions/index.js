export function saveEntry(entryHappiness, entryBody){
  return {
      type: 'SUBMIT_ENTRY',
      payload: {
        entryHappiness,
        entryBody
      }
  }
}
