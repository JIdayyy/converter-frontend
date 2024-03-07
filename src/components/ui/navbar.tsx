"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(
    allTabs.findIndex((tab) => tab.path === window.location.pathname)
  );
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
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
        "w-full flex justify-start items-start h-fit fixed top-0 border-b border-b-gray-700 bg-background"
      }
    >
      <div className="flex-row px-24 relative space-x-2 max-w-7xl flex h-12">
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
                isActive ? `` : `hover:text-neutral-300`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center font-light text-white`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
