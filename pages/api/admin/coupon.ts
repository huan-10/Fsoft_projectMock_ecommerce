import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";

import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import admin from "@/middleware/admin";
const router = createRouter().use(auth).use(admin);
router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { coupon, discount, startDate, endDate } = req.body;
    db.connectDb();
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res
        .status(400)
        .json({ message: "Coupon already exist, Try a different coupon" });
    }
    await new Coupon({ coupon, discount, startDate, endDate }).save();

    db.disconnectDb();
    res.json({
      message: `Coupon ${coupon} has been created successfully.`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
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
    await Coupon.deleteOne({ _id: id });
    db.disconnectDb();
    return res.json({
      message: "Coupon has been deleted successfuly",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, coupon, discount, startDate, endDate } = req.body;
    db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      coupon,
      discount,
      startDate,
      endDate,
    });
    db.disconnectDb();
    return res.json({
      message: "Coupon has been updated successfuly",
      coupons: await Coupon.find({}).sort({ createdAt: -1 }),
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
