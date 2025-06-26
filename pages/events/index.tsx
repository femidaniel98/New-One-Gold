import Button from "@/components/global/Button";
import TextInput from "@/components/global/TextInput";
import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";

type Props = {};

const EventPage = (props: Props) => {
  return (
    <DefaultLayout title="Find an Event">
      <div className="min-h-[calc(100vh-100px)] bg-gray-100 py-20 flex items-center">
        <div className="max-w-[900px] w-full mx-auto space-y-16">
          <div className="space-y-5 text-center max-w-[700px] mx-auto">
            <h1 className="text-4xl font-black text-primary leading-normal">
              Exclusive Event Access with Your Unique Event Code!
            </h1>
            <p className="text-lg">
              Gain exclusive access to exciting events by entering your unique
              event code, and get ready for an unforgettable experience filled
              with entertainment, networking, and inspiration.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-5 ">
            <div className="relative flex items-center w-full py-5 rounded-full focus-within:shadow-md bg-white overflow-hidden transition-all duration-300 ease-in-out px-4">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer h-full w-full text-lg outline-none  text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Enter your event code..."
              />
            </div>
            <button className="bg-primary text-white px-10 py-5 rounded-full flex-1 self-start hover:bg-green-700 transition-all duration-300 ease-in-out whitespace-nowrap h-full">
              Find Event
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EventPage;
