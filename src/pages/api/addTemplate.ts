import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Layer } from "@/app/interfaces"; // Assuming you have set up Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { templateId, description, layers } = req.body;

    try {
      const template = await prisma.template.create({
        data: {
          templateId,
          description,
          layers: {
            create: layers.map((layer: Layer) => ({
              layerId: layer.id,
              type: layer.type,
              description: layer.description,
            })),
          },
        },
      });

      res.status(200).json(template);
    } catch (error) {
      res.status(500).json({ error: `Error creating template: ${error}` });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
