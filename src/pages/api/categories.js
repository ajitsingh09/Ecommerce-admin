import { Category } from "@/modals/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parent } = req.body;
    await Category.create({
      name,
      parent: parent || undefined,
    });
    const result = await Category.find().populate("parent");
    res.json({ success: true, result });
  }
  if (method === "PUT") {
    const { name, parent, _id } = req.body;
    await Category.updateOne(
      { _id },
      {
        name,
        parent: parent || undefined,
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
