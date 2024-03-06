"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VideoConverterCard from "@/components/converters/video/VideoConverter";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bonto-grid";

export default function Home() {
  return (
    <main>
      <div className="h-[40rem] w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-4xl max-w-2xl text-4xl lg:text-7xl font-bold text-center text-white relative z-20">
          Free Online Video Converter 📽️
        </h1>
        <div className="w-[40rem] h-40 relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        <Link href={"/services/video"}>
          <Button variant={"default"}>Convert Now </Button>
        </Link>
      </div>
    </main>
  );
}
