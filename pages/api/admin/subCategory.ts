import { createRouter } from "next-connect";
import slugify from "slugify";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import Category from "@/models/Category";
import auth from "@/middleware/auth";
import SubCategory from "@/models/SubCategory";
import admin from "@/middleware/admin";
const router = createRouter().use(auth).use(admin);
router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    await new SubCategory({ name, parent, slug: slugify(name) }).save();

    db.disconnectDb();
    res.json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
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
    await SubCategory.deleteOne({ _id: id });
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been deleted successfully",
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, name, parent } = req.body;
    db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name),
    });
    db.disconnectDb();
    return res.json({
      message: "SubCategory has been updated successfully",
      subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { category } = req.query;
    console.log(category);
    if (!category) {
      return res.json([]);
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    console.log(results);
    db.disconnectDb();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
