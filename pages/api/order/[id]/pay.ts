import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";

const router = createRouter<NextApiRequest, NextApiResponse>().use(auth);
router.put(async (req, res) => {
  console.log("hello from api");
  await db.connectDb();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const newOrder = await order.save();
    await db.disconnectDb();
    res.json({ message: "Order is paid.", order: newOrder });
  } else {
    await db.disconnectDb();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
