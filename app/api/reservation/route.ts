export async function POST(req: Request) {
  const data = await req.json();

  await fetch(process.env.GOOGLE_SHEET_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return Response.json({ success: true });
}