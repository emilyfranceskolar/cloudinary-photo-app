"use client";

import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="px-4 py-2 hover:bg-white hover:text-black hover:rounded round-lg">
        <CldUploadButton
          onSuccess={(result: UploadResult) => {
            setImageId(result.info.public_id);
          }}
          uploadPreset="ukdut1qt"
        />
      </div>
      {imageId && (
        <div className="rounded-lg border border-border overflow-hidden shadow-md">
          <CldImage
            width="500"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        </div>
      )}
    </main>
  );
}
