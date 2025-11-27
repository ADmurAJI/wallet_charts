type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassDictionary
  | ClassValue[]

type ClassDictionary = Record<string, boolean | undefined | null>

const toClassName = (value: ClassValue): string => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim()
  }

  if (Array.isArray(value)) {
    return value.map(toClassName).filter(Boolean).join(' ')
  }

  return Object.entries(value)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([key]) => key.trim())
    .join(' ')
}

export const cn = (...inputs: ClassValue[]): string => {
  return inputs.map(toClassName).filter(Boolean).join(' ')
}
