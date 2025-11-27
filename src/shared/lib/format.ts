type CurrencyOptions = {
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const formatCurrency = (
  value: number,
  {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: CurrencyOptions = {},
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  })

  return formatter.format(value)
}

type PercentOptions = {
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  signDisplay?: Intl.NumberFormatOptions['signDisplay']
}

export const formatPercent = (
  value: number,
  { locale = 'en-US', minimumFractionDigits = 2, maximumFractionDigits = 2, signDisplay = 'auto' }: PercentOptions = {},
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
  })

  return formatter.format(value)
}

type TimeOptions = {
  locale?: string
  withSeconds?: boolean
  hour12?: boolean
}

export const formatTime = (
  timestamp: number | Date,
  { locale = 'en-US', withSeconds = false, hour12 = false }: TimeOptions = {},
): string => {
  const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: withSeconds ? '2-digit' : undefined,
    hour12,
  })

  return formatter.format(date)
}
