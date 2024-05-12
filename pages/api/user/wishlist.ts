import { createRouter } from "next-connect";

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";

import auth from "../../../middleware/auth";
const router = createRouter<NextApiRequest, NextApiResponse>().use(auth);

router.put(async (req, res) => {
  try {
    db.connectDb();
    const { product_id, style } = req.body;
    const user = await User.findById(req.user);
    const exist = user.wishlist.find(
      (x) => x.product == product_id && x.style == style
    );
    if (exist) {
      return res
        .status(400)
        .json({ message: "Product already exists in your wishlist." });
    }
    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });
    db.disconnectDb();
    res
      .status(200)
      .json({ message: "Product added to your wishlist successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
