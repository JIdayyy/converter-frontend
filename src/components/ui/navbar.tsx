"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SignOut from "@/components/ui/signout-button";
import { useSession } from "next-auth/react";

let allTabs = [
  {
    id: "home",
    name: "Home",
    path: "/",
  },
  {
    id: "video",
    name: "Video",
    path: "/services/video",
  },
  {
    id: "audio",
    name: "Audio",
    path: "/services/audio",
  },
];

export const Navbar = () => {
  const session = useSession();
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(
    typeof window !== "undefined"
      ? allTabs.findIndex((tab) => tab.path === window?.location.pathname)
      : null
  );
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      setActiveTabIndex(
        allTabs.findIndex((tab) => tab.path === window?.location.pathname)
      );
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div
      className={
        "w-full flex h-fit px-2 md:px-24 justify-between items-center align-middle top-0 relative border-b border-b-gray-700 bg-background"
      }
    >
      <div className="flex-row space-x-2  flex h-12">
        <span
          className="absolute bottom-0 translate-y-[50%]  z-40 flex overflow-hidden h-[5px] bg-white  transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full bg-gray-200/30" />
        </span>
        {allTabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <Link
              href={tab.path}
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              className={`${
                isActive ? `font-bold` : `hover:text-neutral-300 font-light`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center text-white`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
      {session.status !== "authenticated" ? (
        <Link href="/auth/signin">Sign In</Link>
      ) : (
        <SignOut />
      )}
    </div>
  );
};
