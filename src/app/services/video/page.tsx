"use client";

import VideoConverterCard from "@/components/converters/video/VideoConverter";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

const scrollToBottomOfContainer = () => {
  const terminalContainer = document.querySelector(".react-terminal");
  console.log(terminalContainer?.scrollHeight, terminalContainer?.scrollTop);
  terminalContainer?.scrollTo(0, terminalContainer.scrollHeight);
};

export default function Page() {
  const [terminalLineData, setTerminalLineData] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

    socket.on("conversion-event", (message: string) => {
      setTerminalLineData((state) => [...state, message]);
      scrollToBottomOfContainer();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className="w-full min-h-screen flex  justify-center align-middle items-center">
      <VideoConverterCard />

      <div className={"w-[600px] text-sm"}>
        <Terminal
          height={"400px"}
          name="Convertion output"
          colorMode={ColorMode.Dark}
          onInput={(terminalInput) =>
            console.log(`New terminal input received: '${terminalInput}'`)
          }
        >
          {terminalLineData.map((line, index) => (
            <TerminalOutput key={index}>{line}</TerminalOutput>
          ))}
        </Terminal>
      </div>
    </main>
  );
}
