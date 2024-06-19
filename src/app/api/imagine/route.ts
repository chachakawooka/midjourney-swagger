/**
 * @swagger
 * /api/imagine:
 *   get:
 *     description: Create Image in Midjourney
 *     operationId: Imagine
 *     parameters:
 *       - name: prompt
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: flags
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagine Object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: The full image prompt
 *                 id:
 *                   type: string
 *                   description: the id of the image
 *                 image:
 *                   type: string
 *                   description: The image uri
 *                 hash:
 *                   type: string
 *                   description: The hash of the image
 */
import { Midjourney } from "midjourney";
export const maxDuration = 300;

const serverId: string = process.env.SERVER_ID!;
const channelId: string = process.env.CHANNEL_ID!;
const salaiToken: string = process.env.SALAI_TOKEN!;

type ImagineResponse = {
  content: string;
  id?: string;
  image?: string;
  hash?: string;
};

export async function GET(_request: Request) {
  const { searchParams } = new URL(_request.url);
  const prompt = searchParams.get("prompt");
  const flags = searchParams.get("flags");

  const midjourney = await new Midjourney({
    ServerId: serverId,
    ChannelId: channelId,
    SalaiToken: salaiToken,
    Debug: true,
    Ws: false,
  });

  const fullPrompt = `${prompt} ${flags} --style raw --v 6`;
  const imagine = await midjourney.Imagine(fullPrompt);

  const imagineResponse: ImagineResponse = imagine
    ? {
        content: imagine.content,
        id: imagine.id,
        image: imagine.uri,
        hash: imagine.hash,
      }
    : {
        content: "Error",
      };

  return new Response(JSON.stringify(imagineResponse), {
    status: 200,
  });
}
