import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const session = await getServerSession(req, res, authOptions);
    const { user } = session;

    let DbUser = await User.findById(user.id);
    const newOrder = await new Order({
      user: DbUser._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
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
