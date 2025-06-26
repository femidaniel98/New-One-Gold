import AccountSidebar from "@/components/partials/dashboard/AccountSidebar";
import AccountLayout from "@/layouts/AccountLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { RootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const AccountPage = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <AccountLayout title="My Account">
      <div className="min-h-[400px] h-full flex flex-col gap-10 py-5">
        <div className="shadow rounded bg-white px-4 pt-6 pb-8 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              Personal Profile
            </h3>
            <Link href="/account/settings" className="text-primary">
              Edit
            </Link>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">
              {" "}
              <span className="text-green-600">Full Name:</span>{" "}
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-gray-800">
              <span className="text-green-600">Email:</span> {user?.email}
            </p>
            <p className="text-gray-800">
              {" "}
              <span className="text-green-600">Phone Number:</span>{" "}
              {user.phoneNumber}
            </p>
            <p className="text-gray-800">
              {" "}
              <span className="text-green-600">Address:</span> {user.address}
            </p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AccountPage;
