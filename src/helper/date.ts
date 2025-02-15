export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)

  return date.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
