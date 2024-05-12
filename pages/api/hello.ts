// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db, { connectDb } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.connectDb();
  db.disconnectDb();
  res.status(200).json({ name: "John Doe" });
}
