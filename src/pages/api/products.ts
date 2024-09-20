import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { name } = req.query; // Get 'name' from the query parameter

    try {
      if (name && typeof name === 'string') {
        // Fetch a specific product by name
        const product = await prisma.product.findFirst({
          where: { name },
        });

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
      } else {
        // If no name is provided, return the list of all products
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: `Error fetching products: ${error}` });
    }

  } else if (req.method === 'POST') {
    const { name, promptDesc, logoUrl } = req.body;

    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          promptDesc,
          logoUrl,
        },
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: `Error creating product: ${error}` });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
