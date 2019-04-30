let formatTime = value => {
  let date = new Date(value)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}/${month}/${day}`
}
export { formatTime }
