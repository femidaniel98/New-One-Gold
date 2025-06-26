import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import products from "../../../utils/data/products";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const vendor = {
    shopPicture: "/images/slide-1.png",
    shopName: "Bright Stores",
    storeDescription: `Experience the vibrant world of Nigerian native clothing at our
              online store. Discover authentic styles that showcase the rich
              cultural heritage of Nigeria. Stand out at any occasion with our
              high-quality fabrics, vibrant colors, and intricate patterns. With
              exceptional service and worldwide shipping, embrace the uniqueness
              of Nigerian fashion and elevate your style today.`,
    ownersName: "John Doe",
    emailAddress: "JKjqk@example.com",
    phoneNumber: "0812345678",
    address: "2, Abuja, Nigeria",
  };

  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "success",
      data: { vendor, products },
    });
  }, 800);
};
