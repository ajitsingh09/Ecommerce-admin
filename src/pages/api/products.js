// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/modals/Product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, description, price } = req.body;
    const productDetail = await Product.create({
      name,
      description,
      price,
    });
    res.json(productDetail);
  }
}
