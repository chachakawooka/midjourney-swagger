/**
 * @swagger
 * /api/upscale:
 *   get:
 *     description: Upscale Image in Midjourney
 *     operationId: Upscale
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: hash
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: index
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ '1', '2', '3','4']
 *       - name: content
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Upscale URI
 */
import { Midjourney } from "midjourney";
export const maxDuration = 600;

const serverId: string = process.env.SERVER_ID!;
const channelId: string = process.env.CHANNEL_ID!;
const salaiToken: string = process.env.SALAI_TOKEN!;

type UpascaleResponse = {
  image?: string;
};

type index = 1 | 2 | 3 | 4;

export async function GET(_request: Request) {
  const { searchParams } = new URL(_request.url);
  const id = searchParams.get("id") as string;
  const hash = searchParams.get("hash") as string;
  const index = searchParams.get("index") as unknown as index;
  const content = searchParams.get("content") as string;

  const midjourney = await new Midjourney({
    ServerId: serverId,
    ChannelId: channelId,
    SalaiToken: salaiToken,
    Debug: true,
    Ws: false,
  });

  const upscale = await midjourney.Upscale({
    msgId: id,
    flags: 0,
    hash,
    index,
    content,
  });

  return new Response(JSON.stringify(upscale?.uri), {
    status: 200,
  });
}
