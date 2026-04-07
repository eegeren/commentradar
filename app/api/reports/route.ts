export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { getAllReports } from '@/lib/store'

export async function GET() {
  const reports = getAllReports()
  return NextResponse.json(reports)
}
