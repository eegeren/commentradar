import { Report } from './types'

export function generatePdfContent(report: Report): string {
  // TODO: Implement with a PDF library like @react-pdf/renderer or puppeteer
  // For MVP, we return a formatted text representation
  const lines = [
    `ReviewRadar Report`,
    `==================`,
    ``,
    `Product: ${report.product_name}`,
    `ASIN: ${report.asin}`,
    `Generated: ${new Date(report.created_at).toLocaleDateString()}`,
    `Total Reviews Analyzed: ${report.total_reviews}`,
    ``,
    `SENTIMENT ANALYSIS`,
    `------------------`,
    `Overall Score: ${report.sentiment_score}/100`,
    `Positive: ${report.positive_percentage}%`,
    `Negative: ${report.negative_percentage}%`,
    ``,
    `TOP COMPLAINTS`,
    `--------------`,
    ...report.top_complaints.flatMap((c, i) => [
      `${i + 1}. ${c.title} (${c.frequency} mentions)`,
      `   ${c.description}`,
      `   Quote: "${c.example_quote}"`,
      ``
    ]),
    `ACTION ITEMS`,
    `------------`,
    ...report.action_items.flatMap((a, i) => [
      `${i + 1}. [${a.priority.toUpperCase()}] ${a.title}`,
      `   ${a.description}`,
      ``
    ])
  ]

  return lines.join('\n')
}

export function downloadReport(report: Report): void {
  const content = generatePdfContent(report)
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reviewradar-${report.asin}-${Date.now()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
