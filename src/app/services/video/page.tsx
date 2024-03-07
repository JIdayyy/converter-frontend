"use client";

import VideoConverterCard from "@/components/converters/video/VideoConverter";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import TerminalUI from "@/components/Terminal";

const scrollToBottomOfContainer = () => {
  const terminalContainer = document.querySelector(".react-terminal");
  console.log(terminalContainer?.scrollHeight, terminalContainer?.scrollTop);
  terminalContainer?.scrollTo(0, terminalContainer.scrollHeight);
};

export default function Page() {
  const [terminalLineData, setTerminalLineData] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      port: 3004,
      secure: process.env.NODE_ENV === "production",
    });

    socket.on("conversion-event", (message: string) => {
      setTerminalLineData((state) => [...state, message]);
      scrollToBottomOfContainer();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="w-full py-20 min-h-screen flex flex-col space-y-4  justify-center align-middle items-center">
      <VideoConverterCard />

      <TerminalUI lines={terminalLineData} />
    </main>
  );
}
