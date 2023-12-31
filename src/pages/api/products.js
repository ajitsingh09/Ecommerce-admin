// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, description, price, images, category, properties } = req.body;
    await Product.create({
      name,
      description,
      price,
      images,
      category,
      properties,
    });
    res.json(true);
  }

  if (method === "PUT") {
    const { name, description, price, _id, images, category, properties } =
      req.body;
    await Product.updateOne(
      { _id },
      {
        name,
        description,
        price,
        images,
        category,
        properties,
      },
    );
    res.json(true);
  }
  if (method === "DELETE") {
    const id = req.query?.id;
    if (id) {
      await Product.deleteOne({ _id: id });
      let data = await Product.find();
      res.json({ success: true, data: data });
    } else {
      res.json({ success: false });
    }
  }
}
