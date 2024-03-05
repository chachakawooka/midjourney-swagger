import { getApiDocs } from "@/lib/swagger";

export async function GET(_request: Request) {
  const spec = await getApiDocs();
  return new Response(JSON.stringify(spec), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
