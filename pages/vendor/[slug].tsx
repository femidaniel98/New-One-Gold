import ProductItem from "@/components/partials/products/ProductItem";
import VendorHero from "@/components/partials/vendors/VendorHero";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProductType, ProductTypeList, Vendor } from "@/types";
import { getBaseURL, server } from "@/utils/server";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

type ProductPageProps = {
  products: ProductType[];
  vendor: Vendor;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;
  const { data } = await axios.get(`${server}/vendors/${slug}`);
  const { vendor, products } = data.data;

  return {
    props: {
      products,
      vendor,
    },
  };
};

const VendorPage = ({ vendor, products }: ProductPageProps) => {
  const categories = [
    {
      name: "All",
    },
    {
      name: "Ankara",
    },
    {
      name: "Aso-oke",
    },
    {
      name: "Adire",
    },
    {
      name: "Kente",
    },
    {
      name: "Buba and Wrapper",
    },
  ];
  const [activeCategory, setActiveCategory] = React.useState("all");

  return (
    <DefaultLayout title="Vendor Detail Page">
      <div className="bg-gray-100 py-20 space-y-16">
        <VendorHero />
        <section className="grid grid-cols-1 md:grid-cols-12 max-w-[1100px] mx-auto gap-10">
          <aside className="md:col-span-4 h-fit sticky top-32 bg-white rounded-xl shadow-sm self-start">
            <div className="text-center bg-primary px-5 py-3 rounded-t-xl text-white font-bold">
              <p>Categories</p>
            </div>
            <div className="pt-3 pb-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`px-5 py-3 text-sm cursor-pointer ${
                    category.name.toLowerCase() === activeCategory.toLowerCase()
                      ? "border-l-4 border-primary"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category.name.toLowerCase())}
                >
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
          </aside>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2  gap-10">
            {products.map((item: ProductTypeList) => (
              <ProductItem
                id={item.id}
                name={item.name}
                price={item.price}
                color={item.color}
                currentPrice={item.currentPrice}
                key={item.id}
                images={item.images}
              />
            ))}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default VendorPage;
