import { createRouter } from "next-connect";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import Category from "@/models/Category";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
const router = createRouter().use(auth).use(admin);
router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name } = req.body;
    db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }
    await new Category({ name, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});
router.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    db.connectDb();
    await Category.deleteOne({ _id: id });
    db.disconnectDb();
    return res.json({
      message: "Category has been deleted successfuly",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, name } = req.body;
    db.connectDb();
    await Category.findByIdAndUpdate(id, { name });
    db.disconnectDb();
    return res.json({
      message: "Category has been updated successfuly",
      categories: await Category.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
