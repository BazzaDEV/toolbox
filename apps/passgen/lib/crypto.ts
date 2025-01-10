export type PasswordOptions = {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeAmbiguous?: boolean
}

export const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz'
export const NUMBER_CHARS = '0123456789'
export const SYMBOL_CHARS = '!@#$%^&*()-_=+[]{}|;:,.?~'
export const AMBIGUOUS_CHARS = 'O0l1I'

export function generatePassword(options: PasswordOptions): string {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguous,
  } = options

  let characterSet = ''
  if (includeUppercase) characterSet += UPPERCASE_CHARS
  if (includeLowercase) characterSet += LOWERCASE_CHARS
  if (includeNumbers) characterSet += NUMBER_CHARS
  if (includeSymbols) characterSet += SYMBOL_CHARS

  if (excludeAmbiguous) {
    characterSet = characterSet
      .split('')
      .filter((char) => !AMBIGUOUS_CHARS.includes(char))
      .join('')
  }

  if (characterSet.length === 0) {
    throw new Error('No character types selected')
  }

  const password: string[] = []
  // eslint-disable-next-line
  const cryptoObj = window.crypto || (window as any).msCrypto // For IE11

  for (let i = 0; i < length; i++) {
    const randomValue = cryptoObj.getRandomValues(new Uint32Array(1))[0]
    const index = randomValue! % characterSet.length
    password.push(characterSet.charAt(index))
  }

  return password.join('')
}
