import VendorCard from "@/components/elements/vendors/VendorCard";
import TextInput from "@/components/global/TextInput";
import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";
import { MdSearch } from "react-icons/md";

type Props = {};

const VendorsPage = (props: Props) => {
  return (
    <DefaultLayout>
      <div className="bg-gray-100 py-20 px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="py-20 ">
            <h1 className="text-center font-bold text-4xl">Top Vendors</h1>
          </div>

          <div>
            <div className="md:w-[370px]">
              <TextInput
                showLabel={false}
                icon={<MdSearch />}
                placeholder="Find a vendor"
                isLight
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
              <VendorCard />
              <VendorCard />
              <VendorCard />
              <VendorCard />
              <VendorCard />
              <VendorCard />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VendorsPage;
