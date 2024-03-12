"use client";

import VideoConverterCard from "@/components/converters/video/VideoConverter";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import TerminalUI from "@/components/Terminal";

const scrollToBottomOfContainer = () => {
  const terminalContainer = document.querySelector(".react-terminal");
  terminalContainer?.scrollTo(0, terminalContainer.scrollHeight);
};

export default function Page() {
  const [terminalLineData, setTerminalLineData] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      port: 3004,
      secure: process.env.NODE_ENV === "production",
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the server", socket.id);
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
