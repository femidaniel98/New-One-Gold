import DefaultLayout from "@/layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import image from "/public/images/slide-3.png";
import Image from "next/image";
import { HiCalendar } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import Button from "@/components/global/Button";
import EventDetailsTab from "@/components/elements/events/EventDetailsTab";
import EventCategoriesTab from "@/components/elements/events/EventCategoriesTab";

type Props = {};

const EventPage = (props: Props) => {
  const backgroundStyles = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('${"/images/slide-1.png"}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [activeTab, setActiveTab] = useState("categories");

  useEffect(() => {
    const initialRect = (
      document.getElementById("stickyHeader") as HTMLElement
    ).getBoundingClientRect();
    const handleScroll = () => {
      const stickyElement = document.getElementById("stickyHeader");
      const buttonElement = document.getElementById("event-details-button");

      // console.log(initialRect.top);
      // console.log("current rect:", stickyElement?.getBoundingClientRect().top);
      if (stickyElement) {
        const currentRect = stickyElement.getBoundingClientRect();
        if (currentRect.top <= 100) {
          buttonElement?.classList.add("opacity-0", "pointer-events-none");
          // Do something when the element becomes sticky
        } else {
          buttonElement?.classList.remove("opacity-0", "pointer-events-none");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   setShowButton(!isSticky);
  // }, [isSticky]);

  return (
    <DefaultLayout title="Event Detail Page">
      <div>
        <div className="">
          <div
            className="h-[calc(100vh-181px)] flex-1 bg-primary flex items-center justify-center"
            style={{ ...backgroundStyles }}
          >
            <div className="space-y-3 text-white flex flex-col items-center justify-center">
              <div className="w-[90px] h-[90px] rounded-full p-0.5 shadow-xl ">
                <figure className="w-full h-full rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                  <Image src={image} alt="" className="h-full w-auto" />
                </figure>
              </div>
              <p className="text-3xl font-bold">John and Jane&apos;s Wedding</p>
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <p>Saturday, December 2024</p>
              </div>
              <div className="flex items-center gap-x-2">
                <MdLocationPin />
                <p>Star Bright Event Center, Brooklyn</p>
              </div>

              <div className="w-full pt-4">
                <Button className={`w-full py-4 `}>See Event Details</Button>
              </div>
            </div>
          </div>
          <div
            id="stickyHeader"
            className="h-[80px] bg-gray-100 sticky z-20 top-[100px] px-5 md:px-10"
          >
            <div className=" gap-10 flex justify-between  items-center max-w-[1200px] mx-auto h-full">
              <div className="inline-flex flex-1 self-stretch gap-5">
                <div
                  className={`cursor-pointer h-full flex items-center justify-center transition-all duration-300 ease-in-out border-b-4 ${
                    activeTab === "categories"
                      ? "text-primary  border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab("categories")}
                >
                  <p>Fabric Categories</p>
                </div>
                <div
                  className={`cursor-pointer h-full flex items-center justify-center transition-all duration-300 ease-in-out border-b-4 ${
                    activeTab === "event"
                      ? "text-primary  border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab("event")}
                >
                  <p>Event Details</p>
                </div>
              </div>
              <div className="">
                <Button
                  className="w-full py-4 transition-all duration-300 ease-in-out"
                  id="event-details-button"
                >
                  See Event Details
                </Button>
              </div>
            </div>
          </div>
          <div className="px-5">
            {activeTab === "event" && <EventDetailsTab />}
            {activeTab === "categories" && <EventCategoriesTab />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EventPage;
