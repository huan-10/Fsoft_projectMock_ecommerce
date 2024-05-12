import { createRouter } from "next-connect";

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import auth from "../../../middleware/auth";
const router = createRouter<NextApiRequest, NextApiResponse>().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { cart } = req.body;
    const session = await getServerSession(req, res, authOptions);
    const { user } = session;
    // console.log({ cart });
    let products = [];
    if (!user) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    let dbUser = await User.findById(user.id);
    if (!dbUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    let existing_cart = await Cart.findOne({ user: dbUser._id });
    console.log("existing_cart:", existing_cart);

    if (existing_cart) {
      await Cart.findById(existing_cart._id).deleteOne();
    }
    console.log("sssss");
    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await Product.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price - price / Number(subProduct.discount)).toFixed(2)
          : price.toFixed(2);

      products.push(tempProduct);
    }
    console.log("sasasas");
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].qty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: dbUser._id,
    }).save();
    db.disconnectDb();

    return res.status(200).json({ products });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
