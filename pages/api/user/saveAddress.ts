import { createRouter } from "next-connect";

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";

import User from "@/models/User";
import auth from "@/middleware/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const router = createRouter<NextApiRequest, NextApiResponse>().use(auth);

router.post(async (req, res) => {
  console.log("req:", req);
  try {
    db.connectDb();
    const { address } = req.body;

    // const session = await getServerSession(req, res, authOptions);
    // console.log("session:", session);
    const user = User.findById(req.user);
    await user.updateOne({
      $push: {
        addresses: address,
      },
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const user = await User.findById(req.user);
    await user.updateOne(
      {
        $pull: { address: { _id: id } },
      },
      { new: true }
    );
    db.disconnectDb();
    res.json({ addresses: user.address.filter((a) => a._id != id) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
