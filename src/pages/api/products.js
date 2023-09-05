// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/modals/product";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    console.log("data fetching....");
    res.json(await Product.find());
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
