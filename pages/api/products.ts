import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import products from "../../utils/data/products";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // fake loading time
  setTimeout(() => {
    res.status(200).json(products);
  }, 800);
};

// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "../../utils/db";
// import { ProductModel, ProductDocument } from "../../models/product";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const db = await connectToDatabase();

//   switch (req.method) {
//     case "POST":
//       return handlePostRequest(req, res);
//     case "GET":
//       return handleGetRequest(req, res);
//     case "PUT":
//       return handlePutRequest(req, res);
//     case "DELETE":
//       return handleDeleteRequest(req, res);
//     default:
//       res.status(405).json({ message: "Method Not Allowed" });
//       break;
//   }
// }

// async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { name, price, description } = req.body;
//   // Validation and error handling if needed
//   const product: ProductDocument = new ProductModel({
//     name,
//     price,
//     description,
//   });
//   await product.save();
//   res.status(201).json(product);
// }

// async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
//   const products: ProductDocument[] = await ProductModel.find();
//   res.status(200).json(products);
// }

// async function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { id, name, price, description } = req.body;
//   // Validation and error handling if needed
//   const updatedProduct: ProductDocument | null =
//     await ProductModel.findByIdAndUpdate(
//       id,
//       { name, price, description },
//       { new: true }
//     );
//   res.status(200).json(updatedProduct);
// }

// async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.body;
//   // Validation and error handling if needed
//   await ProductModel.findByIdAndDelete(id);
//   res.status(200).json({ message: "Product deleted successfully." });
// }
