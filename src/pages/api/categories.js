import { Category } from "@/modals/Category";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parent, properties } = req.body;
    console.log("properties", properties);
    await Category.create({
      name,
      parent: parent || undefined,
      properties,
    });
    const result = await Category.find().populate("parent");
    res.json({ success: true, result });
  }
  if (method === "PUT") {
    const { name, parent, _id, properties } = req.body;
    await Category.updateOne(
      { _id },
      {
        name,
        parent: parent || undefined,
        properties,
      },
    );
    const result = await Category.find().populate("parent");
    res.json({ success: true, result });
  }

  if (method === "DELETE") {
    const id = req.query?.id;
    await Category.deleteOne({ _id: id });
    const result = await Category.find().populate("parent");
    res.json({ success: true, result });
  }
}
