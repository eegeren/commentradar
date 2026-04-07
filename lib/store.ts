import { Report } from './types'

// Module-level Maps reset on every hot reload in Next.js dev mode.
// Attaching to `global` persists the Map across reloads within the same
// Node.js process, so reports survive HMR. Replace with a real database
// before going to production.
declare global {
  // eslint-disable-next-line no-var
  var reportStore: Map<string, Report> | undefined
}

const store: Map<string, Report> = global.reportStore ?? (global.reportStore = new Map())

export function saveReport(report: Report): void {
  store.set(report.id, report)
}

export function getReport(id: string): Report | undefined {
  return store.get(id)
}

export function getAllReports(): Report[] {
  return Array.from(store.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}
