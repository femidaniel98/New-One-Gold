import Button from "@/components/global/Button";
import TextInput from "@/components/global/TextInput";
import DefaultLayout from "@/layouts/DefaultLayout";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

type Props = {};

const EventManagerRegistrationPage = (props: Props) => {
  const [text, setText] = useState("");
  return (
    <DefaultLayout title="Event Manager Registration">
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 flex-1">
          <h1 className="mb-10 font-bold text-3xl text-white">
            Become an Event Manager
          </h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="flex flex-col md:flex-row gap-6">
                  <TextInput
                    labelText="First Name"
                    showLabel={true}
                    icon={<FaUser />}
                    placeholder="John"
                    inputType="text"
                  />
                  <TextInput
                    labelText="Last Name"
                    showLabel={true}
                    icon={<FaUser />}
                    placeholder=" Doe"
                    inputType="text"
                  />
                </div>

                <TextInput
                  labelText="Email Address"
                  showLabel={true}
                  icon={<MdAlternateEmail />}
                  placeholder="name@company.com"
                  value={text}
                  // onChange={setText}
                  inputType="email"
                />
                <TextInput
                  labelText="Password"
                  showLabel={true}
                  placeholder="Enter password"
                  inputType="password"
                />
                <TextInput
                  labelText="Confirm Password"
                  showLabel={true}
                  placeholder="Enter password"
                  inputType="password"
                />

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <Button type="submit" text="Create Account" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default EventManagerRegistrationPage;
