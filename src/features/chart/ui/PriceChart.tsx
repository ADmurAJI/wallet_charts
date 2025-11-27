import type { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import Chart from 'react-apexcharts'

import type { PricePoint } from '@shared/types/chart'

import styles from './PriceChart.module.css'

type PriceChartProps = {
  data: PricePoint[]
  currentPrice: number
  changePercent: number
}

const getCssVar = (token: string, fallback: string) => {
  if (typeof window === 'undefined') {
    return fallback
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(token)
  return value?.trim() || fallback
}

export const PriceChart = ({ data, currentPrice, changePercent }: PriceChartProps) => {
  const series = useMemo(
    () => [
      {
        name: 'Price',
        data: data.map((point) => ({
          x: point.timestamp,
          y: Number(point.price.toFixed(2)),
        })),
      },
    ],
    [data],
  )

  const positiveColor = useMemo(() => getCssVar('--chart-line', '#f8c572'), [])
  const dangerColor = useMemo(() => getCssVar('--color-danger', '#ff6b6b'), [])
  const textColor = useMemo(() => getCssVar('--text-primary', '#f5f6ff'), [])
  const tooltipBg = useMemo(() => getCssVar('--bg-tertiary', '#0f1324'), [])
  const borderMuted = useMemo(() => getCssVar('--border-muted', 'rgba(255,255,255,0.08)'), [])

  const lineColor = changePercent >= 0 ? positiveColor : dangerColor

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'line',
        background: 'transparent',
        foreColor: textColor,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: false },
      },
      annotations: currentPrice
        ? {
            yaxis: [
              {
                y: currentPrice,
                borderColor: lineColor,
                label: {
                  borderColor: 'transparent',
                  style: {
                    background: tooltipBg,
                    color: textColor,
                  },
                  text: `$${currentPrice.toFixed(2)}`,
                },
              },
            ],
          }
        : undefined,
      grid: {
        show: true,
        strokeDashArray: 6,
        borderColor: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: [lineColor],
      },
      dataLabels: { enabled: false },
      tooltip: {
        theme: 'dark',
        x: { format: 'HH:mm' },
        marker: { show: false },
        y: {
          formatter: (value: number) => `$${value.toFixed(2)}`,
        },
        style: {
          fontSize: '12px',
          fontFamily: 'var(--font-sans)',
        },
        fillSeriesColor: false,
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const price = series[seriesIndex][dataPointIndex]
          return `<div style="background:${tooltipBg};padding:8px 12px;border-radius:12px;border:1px solid ${borderMuted};">
  <span style="font-size:12px;color:${textColor};">$${price.toFixed(2)}</span>
</div>`
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 100],
          gradientToColors: [lineColor],
          colorStops: [
            { offset: 0, opacity: 0.35, color: lineColor },
            { offset: 100, opacity: 0, color: lineColor },
          ],
        },
      },
      xaxis: {
        type: 'datetime',
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        show: false,
      },
    }),
    [borderMuted, currentPrice, lineColor, textColor, tooltipBg],
  )

  return (
    <div className={styles.root}>
      <Chart options={options} series={series} type="line" height="100%" width="100%" />
    </div>
  )
}
