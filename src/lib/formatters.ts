export const formattedDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
