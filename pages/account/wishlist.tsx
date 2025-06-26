import ProductItem from "@/components/partials/products/ProductItem";
import AccountLayout from "@/layouts/AccountLayout";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const WishlistPage = (props: Props) => {
  const { favProducts } = useSelector((state: RootState) => state.user);
  console.log(favProducts);
  return (
    <AccountLayout title="My Wishlist">
      <div className="w-full">
        <div className="px-3 md:px-5  py-2">
          <h1 className="text-xl font-bold">My Wishlist</h1>
        </div>
        {favProducts.length === 0 && (
          <p>You have no products in your wishlist</p>
        )}
        {favProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favProducts.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default WishlistPage;
