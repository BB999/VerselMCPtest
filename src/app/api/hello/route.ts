export async function GET() {
  return Response.json({ message: 'Hello from Vercel!' })
}

export async function POST() {
  return Response.json({ message: 'POST Hello from Vercel!' })
}