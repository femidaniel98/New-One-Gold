import VendorCard from "@/components/elements/vendors/VendorCard";
import TextInput from "@/components/global/TextInput";
import ProductItem from "@/components/partials/products/ProductItem";
import DefaultLayout from "@/layouts/DefaultLayout";
import { ProductTypeList } from "@/types";
import React from "react";
import { MdSearch } from "react-icons/md";
import useSwr from "swr";

type Props = {};

const ExploreFabrics = (props: Props) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSwr("/api/products", fetcher);
  return (
    <DefaultLayout>
      <div className="bg-gray-100 py-20 px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="py-20 ">
            <h1 className="text-center font-bold text-4xl">Featured Fabrics</h1>
          </div>

          <div>
            <div className="md:w-[370px]">
              <TextInput
                showLabel={false}
                icon={<MdSearch />}
                placeholder="Find a product"
                isLight
              />
            </div>
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
                {data.map((item: ProductTypeList) => (
                  <ProductItem key={item.id} {...item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExploreFabrics;
