import { GetServerSideProps } from "next";

import { useState } from "react";
import { server } from "../../utils/server";

// types
import { ProductType } from "@/types";
import DefaultLayout from "@/layouts/DefaultLayout";
import ProductsFeatured from "@/components/partials/home/ProductsFeatured";
import ProdcurSingleDescription from "@/components/partials/products/ProductSingleDescription";
import Reviews from "@/components/partials/products/ProductSingleReviewsList";
import ProductSingleGallery from "@/components/partials/products/ProductSingleGallery";
import ProductsContent from "@/components/partials/products/ProductsContent";
import Breadcrumb from "@/components/elements/Breadcrumb";
import ProductSingleContent from "@/components/partials/products/ProductSingleContent";

type ProductPageType = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pid = query.pid;
  const res = await fetch(`${server}/product/${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

const Product = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState("description");

  const breadcrumbItems = [
    {
      title: "Vendor Name",
      link: "/vendor/test",
    },
    {
      title: "Product Name",
    },
  ];

  return (
    <DefaultLayout title={"Blue Ankara"}>
      <Breadcrumb items={breadcrumbItems} />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <ProductSingleGallery images={product.images} />
            {/* <ProductsContent /> */}
            <ProductSingleContent product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button>
            </div>

            <ProdcurSingleDescription show={showBlock === "description"} />
            <Reviews product={product} show={showBlock === "reviews"} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
    </DefaultLayout>
  );
};

export default Product;
