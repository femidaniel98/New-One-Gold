import AccountLayout from "@/layouts/AccountLayout";
import React from "react";

type Props = {};

const AccountOrdersPage = (props: Props) => {
  return (
    <AccountLayout title="My Orders">
      <div className="w-full">
        <p>You have no orders at the moment</p>
      </div>
    </AccountLayout>
  );
};

export default AccountOrdersPage;
