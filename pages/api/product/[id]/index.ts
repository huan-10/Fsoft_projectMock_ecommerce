import { createRouter } from "next-connect";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";
const router = createRouter<NextApiRequest, NextApiResponse>();

// Get product ID and style/size: It retrieves the id, style, and size parameters from the request query.
// If style or size is not provided in the query, it defaults to 0.
// Find product by ID: It uses Product.findById(id).lean() to find a product document in the database that matches the given ID. The .lean() method ensures that a plain JavaScript object is returned instead of a full Mongoose document.
// Extract product details: It extracts various details from the retrieved product document, including discount, price before discount, price (considering discount), and other product information like name, description, images, etc.
router.get(async (req, res) => {
  try {
    db.connectDb();
    const id = req.query.id;
    const style = req.query.style || 0;
    const size = req.query.size || 0;
    const product = await Product.findById(id).lean();
    let discount = product.subProducts[style].discount;
    let priceBefore = product.subProducts[style].sizes[size].price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;
    db.disconnectDb();
    return res.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      quantity: product.subProducts[style].sizes[size].qty,
    });
  } catch (error) {
    console.log("error", error);
  }
});
router.delete(async (req, res) => {
  console.log("req:", req);
  try {
    db.connectDb();
    const { id } = req.query;

    // Validate product ID (optional for security)
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    db.disconnectDb();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" }); // Handle errors gracefully
  }
});

export default router.handler({
  onError: (err, req, event) => {
    console.error(err.stack);
  },
});
