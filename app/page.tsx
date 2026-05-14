"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full min-h-[calc(100vh-10rem)] border-2 rounded-lg p-8">
      <Image
        src="/homephoto.avif"
        alt="image of computer"
        fill
        priority
        className="object-cover"
      />
      <div className="flex justify-center p-8">
        <h1 className="absolute text-4xl font-bold text">
          Upload pictures now
        </h1>
      </div>
    </main>
  );
}
