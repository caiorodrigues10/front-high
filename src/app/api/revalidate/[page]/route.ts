import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  context: { params: { page: string } },
) {
  const path = request.nextUrl.searchParams.get(context.params.page) || '/'

  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
