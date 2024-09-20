import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Layer } from "@/app/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { templateId } = req.query; // Get 'templateId' from the query parameter

    try {
      if (templateId && typeof templateId === 'string') {
        // Fetch a specific template by templateId
        const template = await prisma.template.findUnique({
          where: { templateId },
          include: { layers: true }, // Include layers if any
        });

        if (!template) {
          return res.status(404).json({ error: 'Template not found' });
        }

        res.status(200).json(template);
      } else {
        // If no templateId is provided, return the list of all templates
        const templates = await prisma.template.findMany({
          include: { layers: true }, // Include layers for all templates
        });

        res.status(200).json(templates);
      }
    } catch (error) {
      res.status(500).json({ error: `Error fetching templates: ${error}` });
    }

  } else if (req.method === 'POST') {
    const { templateId, name, description, layers } = req.body;

    try {
      const template = await prisma.template.create({
        data: {
          templateId,
          name,
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

      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ error: `Error creating template: ${error}` });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
