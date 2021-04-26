// * Generate activation token
module.exports = (length = 8) => {
  const token = []
  const tokenLength = length
  const createSingleDigit = () => Math.floor(Math.random() * 10)

  for (let i = 0; i < tokenLength; i += 1) {
    const digit = createSingleDigit()
    token.push(digit)
  }

  return token.join('')
}
