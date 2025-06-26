import axios from "axios";
import Button from "@/components/global/Button";
import AccountLayout from "@/layouts/AccountLayout";
import { RootState } from "@/store";
import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/reducers/user";

type Props = {};

const AccountSettingsPage = (props: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const settingsForm = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
    },
    validate: {
      firstName: (value) =>
        value.trim() === "" ? "First Name is required" : null,
      lastName: (value) =>
        value.trim() === "" ? "Last Name is required" : null,
      phoneNumber: (value) =>
        value.trim() === "" ? "Phone Number is required" : null,
      email: (value) =>
        value.trim() === ""
          ? "Email Address is required"
          : /^\S+@\S+$/.test(value)
          ? null
          : "Invalid email",
      address: (value) => (value.trim() === "" ? "Address is required" : null),
    },
  });

  const updateUserDetails = async (data: any) => {
    setLoading(true);

    try {
      // Assuming you have the user ID and token available
      const userId = user._id; // Updated from user.id to user._id
      const userToken = user.token;

      // Send updated user details using Axios with the bearer token
      const res = await axios.put(`/api/user/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const result = res.data;

      if (!result.success) {
        const errorMessage: string = result.message || "";
        message.error(errorMessage || "An error occurred. Please try again.");
        return;
      }

      // Assuming the server response includes the updated user details
      const updatedUser = result.data;

      // You may dispatch an action to update the user in the Redux store if needed
      dispatch(updateUser(updatedUser));

      message.success("Profile information updated successfully");
    } catch (error: any) {
      console.error("API error:", error);
      message.error(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountLayout title="Account Layout">
      <div className="col-span-9 px-6 pt-5 pb-7">
        <h4 className="text-lg font-medium capitalize mb-4">
          Profile information
        </h4>
        <div className="space-y-4">
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={settingsForm.onSubmit(updateUserDetails)}
          >
            <TextInput
              mt="sm"
              size="md"
              label="First Name"
              placeholder=""
              {...settingsForm.getInputProps("firstName")}
            />
            <TextInput
              mt="sm"
              size="md"
              label="Last Name"
              placeholder=""
              {...settingsForm.getInputProps("lastName")}
            />
            <TextInput
              mt="sm"
              size="md"
              label="Phone Number"
              placeholder=""
              {...settingsForm.getInputProps("phoneNumber")}
            />
            <TextInput
              mt="sm"
              size="md"
              label="Email Address"
              placeholder=""
              disabled
              {...settingsForm.getInputProps("email")}
            />
            <Textarea
              label="Address"
              description="Your Home Address"
              {...settingsForm.getInputProps("address")}
              className="col-span-2"
            />
            <Button
              type="submit"
              text="Save Changes"
              loading={loading}
              className="mt-5 w-fit"
            />
          </form>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AccountSettingsPage;
